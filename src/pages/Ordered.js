import {
  Box,
  Text,
  Button,
  Input,
  InputLeftElement,
  InputGroup,
  InputRightElement,
  InputLeftAddon,
  Textarea,
  showToast,
  useToast,
  Tooltip,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { OrderCard } from "../components/OrderCard";

import { Link, useLocation } from "react-router-dom";
import { Layout } from "../components/Layout";
import { WorkCard } from "../components/WorkCard";
import { useAuth } from "../contexts/AuthContext";
import { FaPlus, FaLink, FaLock } from "react-icons/fa";
import { db } from "../utils/init-firebase";
import { useState, useEffect } from "react";
import { Data } from "../contexts/Data";
import {
  setDoc,
  doc,
  query,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
export default function Ordered() {
  const { orderData } = Data();
  const { currentUser } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState();
  const [setU, setSetu] = useState(false);
  const [Class, setClass] = useState();
  const [price, setPrice] = useState();
  const [date, setDate] = useState();
  const [additionalInfo, setAdditionalInfo] = useState();
  const [currentDone, setCurrentDone] = useState();
  const toast = useToast();
  var customcounter = currentDone?.Counter;
  useEffect(() => {
    const q3 = query(doc(db, "num", "counter"));
    const unsub3 = onSnapshot(q3, (doc) => {
      setCurrentDone(doc.data());
    });
    return unsub3;
  }, []);
  const showToast = () => {
    toast({
      title: "Амжилттай",
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "left-accent",
      position: "top-right",
    });
  };
  const sendReadyData = () => {
    const generatedId = uuidv4();
    setDoc(doc(db, "num", "numedu", "Orders", `${generatedId}`), {
      uniqueid: generatedId,
      ownerProfile: currentUser?.photoURL,
      title: title,
      price: price,
      additionalInfo: additionalInfo,
      lastestDate: date,
      class: Class,
      setU: setU,
      ownerMail: currentUser?.email,
      timestamp: serverTimestamp(),
      isDone: false,
    });
    setDoc(
      doc(db, "num", "Waiting", `${currentUser?.email}`, `${generatedId}`),
      {
        uniqueid: generatedId,
        ownerProfile: currentUser?.photoURL,
        title: title,
        price: price,
        additionalInfo: additionalInfo,
        lastestDate: date,
        class: Class,
        setU: setU,
        ownerMail: currentUser?.email,
        timestamp: serverTimestamp(),
        isDone: false,
      }
    );
    customcounter++;
    updateDoc(doc(db, "num", "counter"), {
      Counter: customcounter,
    });
    // onNewClassClose();
    onClose();
    showToast();
  };
  const orders = orderData?.map((value) => {
    console.log(value.timestamp);
    value.timestamp?.toDate();
    const year = new Date(value.timestamp?.seconds * 1000)
      .getFullYear()
      .toString();
    let month = new Date(value.timestamp?.seconds * 1000).getMonth().toString();
    const days = new Date(value.timestamp?.seconds * 1000).getDate().toString();
    month = parseInt(month) + 1;
    return (
      <OrderCard
        uniquekey={value.uniqueid}
        title={value.title}
        price={value.price}
        class={value.class}
        additionalInfo={value.additionalInfo}
        duedate={value.lastestDate}
        classname={value.class}
        ownerMail={value.ownerMail}
        Udata={value.setU}
        timestamp={year + "-" + month + "-" + days}
        processingPerson={value.processingPerson}
      />
    );
  });
  return (
    <Box h={"100vh"} bg={"BlackAlpha 100"}>
      <Layout>
        {/* <Box display="flex" flexDir={{ md: "row", base: "column" }} mt="6">
              <Button width={"100%"} variant={"outline"} mb={"3"} mr={"3"}>
                Бэлэн даалгавар үзэх/нэмэх
              </Button>
              <Box display={"flex"} w={"100%"}>
                <Button width={"100%"} color="white" bg={"pink.400"}>
                  Даалгавраа хийлгэх
                </Button>
              </Box>
            </Box> */}

        <Box display={"flex"} alignItems={"center"}>
          <Text
            fontFamily={"heading"}
            mr={"3"}
            fontWeight={"bold"}
            fontSize={"4xl"}
          >
            Даалгавраа{" "}
            <Text color={"pink.400"} display={"inline"}>
              хийлгэх
            </Text>
          </Text>

          <Button mr={5} onClick={onOpen} color={"pink.400"}>
            <FaPlus />
          </Button>
        </Box>
        <Text mt={"-2"} color={"GrayText"} fontSize={"smaller"}>
          Нийт хийлгэсэн : {customcounter}
        </Text>
        <Box>{orders}</Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Даалгаврын захиалга үүсгэх</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                isRequired
                mb={"2"}
                variant="outline"
                placeholder="Гарчиг"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <Input
                isRequired
                mb={"2"}
                variant="outline"
                placeholder="Хичээлийн нэр"
                onChange={(e) => {
                  setClass(e.target.value);
                }}
              />
              <InputGroup mb={"2"}>
                <InputRightElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  children="₮"
                />
                <Input
                  isRequired
                  type={"number"}
                  placeholder="Санал болгох үнэ"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </InputGroup>
              <InputGroup mb={"2"}>
                <InputLeftAddon
                  bg={"whiteAlpha.50"}
                  pointerEvents="none"
                  color="gray.400"
                  children="Сүүлийн хугацаа"
                />
                <Input
                  isRequired
                  type={"date"}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
              </InputGroup>
              <Textarea
                placeholder="Нэмэлт тайлбараа энд үлдээнэ үү "
                onChange={(e) => {
                  setAdditionalInfo(e.target.value);
                }}
              />
            </ModalBody>

            <ModalFooter>
              {title && price && date && additionalInfo ? (
                <Button
                  color={"white"}
                  backgroundColor={"pink.400"}
                  mr={3}
                  onClick={sendReadyData}
                >
                  Нэмэх
                </Button>
              ) : (
                <Tooltip label="Бүх талбар бүрэн байх шаардлагатай.">
                  <Button
                    _hover={{
                      bg: "pink.500",
                    }}
                    color={"white"}
                    backgroundColor={"pink.400"}
                    mr={3}
                  >
                    Нэмэх
                  </Button>
                </Tooltip>
              )}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Layout>
    </Box>
  );
}

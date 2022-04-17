import {
  Badge,
  chakra,
  Code,
  Heading,
  List,
  ListItem,
  OrderedList,
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
import { useState } from "react";
import { Data } from "../contexts/Data";
import {
  addDoc,
  setDoc,
  doc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
export default function Ordered() {
  const { orderData, readyData } = Data();
  console.log("haha");
  console.log(orderData);
  // console.log(readyData);
  const { currentUser } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState();
  const [setU, setSetu] = useState(false);
  const [Class, setClass] = useState();
  const [price, setPrice] = useState();
  const [date, setDate] = useState();
  const [additionalInfo, setAdditionalInfo] = useState();
  const toast = useToast();
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
    });
    // onNewClassClose();
    onClose();
    showToast();
  };
  const orders = orderData?.map((value) => {
    value.timestamp?.toDate();
    const year = new Date(value.timestamp?.seconds * 1000)
      .getFullYear()
      .toString();
    const month = new Date(value.timestamp?.seconds * 1000)
      .getMonth()
      .toString();
    const days = new Date(value.timestamp?.seconds * 1000).getDate().toString();
    // month++;
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
          <Button onClick={onOpen} color={"pink.400"}>
            <FaPlus />
          </Button>
        </Box>
        <Box>{orders}</Box>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Даалгаврын захиалга үүсгэх</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                mb={"2px"}
                variant="outline"
                placeholder="Гарчиг"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <Input
                mb={"3px"}
                variant="outline"
                placeholder="Хичээлийн нэр"
                onChange={(e) => {
                  setClass(e.target.value);
                }}
              />
              <InputGroup mb={"2px"}>
                <InputRightElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  children="₮"
                />
                <Input
                  type={"number"}
                  placeholder="Санал болгох үнэ"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </InputGroup>
              <InputGroup mb={"2px"}>
                <InputLeftAddon
                  bg={"whiteAlpha.50"}
                  pointerEvents="none"
                  color="gray.400"
                  children="Сүүлийн хугацаа"
                />
                <Input
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
              <Button
                color={"white"}
                backgroundColor={"pink.400"}
                mr={3}
                onClick={sendReadyData}
              >
                Нэмэх
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Layout>
    </Box>
  );
}

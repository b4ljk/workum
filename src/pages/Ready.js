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

import { Link, useLocation } from "react-router-dom";
import { Layout } from "../components/Layout";
import { WorkCard } from "../components/WorkCard";
import { useAuth } from "../contexts/AuthContext";
import { FaPlus, FaLink, FaLock } from "react-icons/fa";
import { db } from "../utils/init-firebase";
import { useState } from "react";
import { addDoc, setDoc, doc, collection } from "firebase/firestore";
export default function Ready() {
  const toast = useToast();
  const { currentUser } = useAuth();
  const [title, setTitle] = useState();
  const [Class, setClass] = useState();
  const [price, setPrice] = useState();
  const [additionalInfo, setAdditionalInfo] = useState();
  const [privateInfo, setPrivateInfo] = useState();
  const [privateLink, setPrivateLink] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(currentUser.photoURL);
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
    setDoc(
      doc(
        db,
        "num",
        "numedu",
        "readyClass",
        `${Class}`,
        `${currentUser?.email}`,
        `${title}`
      ),
      {
        title: title,
        class: Class,
        price: price,
        additionalInfo: additionalInfo,
        privateInfo: privateInfo,
        privateLink: privateLink,
        photo: currentUser.photoURL,
        ownerName: currentUser.displayName,
      }
    );
    // onNewClassClose();
    onClose();
    showToast();
  };
  return (
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
          Бэлэн{" "}
          <Text color={"pink.400"} display={"inline"}>
            даалгаврууд
          </Text>
        </Text>
        <Button onClick={onOpen} color={"pink.400"}>
          <FaPlus />
        </Button>
      </Box>
      <Box>
        <WorkCard />
        <WorkCard />
        <WorkCard />
      </Box>

      <Modal size={"5xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Бэлэн даалгавар нэмэх</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              mb={"1.5"}
              variant="outline"
              placeholder="Гарчиг жишээ нь : БИЕ ДААЛТ"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <Input
              mb={"1.5"}
              variant="outline"
              placeholder="Хичээлийн нэр"
              onChange={(e) => {
                setClass(e.target.value);
              }}
            />
            <InputGroup mb={"1.5"}>
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

            <Textarea
              mb={"1.5"}
              placeholder="Нэмэлт тайлбараа энд үлдээнэ үү "
              onChange={(e) => {
                setAdditionalInfo(e.target.value);
              }}
            />
            <InputGroup mb={"1.5"}>
              {/* <InputRightElement children={<FaLock />} /> */}
              <Textarea
                height={"20vh"}
                placeholder="Нууцлал бүхий хэсэг "
                onChange={(e) => {
                  setPrivateInfo(e.target.value);
                }}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement children={<FaLink />} />
              <Input
                mb={"3px"}
                variant="outline"
                placeholder="Зураг файлын линкыг оруулна уу"
                onChange={(e) => {
                  setPrivateLink(e.target.value);
                }}
              />
            </InputGroup>
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
  );
}

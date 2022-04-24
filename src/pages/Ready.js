import {
  Box,
  Text,
  Button,
  Input,
  InputLeftElement,
  InputGroup,
  InputRightElement,
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
import { v4 as uuidv4 } from "uuid";
import { Link, useLocation } from "react-router-dom";
import { Layout } from "../components/Layout";
import { WorkCard } from "../components/WorkCard";
import { useAuth } from "../contexts/AuthContext";
import { FaPlus, FaLink, FaLock } from "react-icons/fa";
import { db } from "../utils/init-firebase";
import { useState, useEffect } from "react";
import {
  setDoc,
  doc,
  collection,
  query,
  onSnapshot,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
export default function Ready() {
  const toast = useToast();
  const { currentUser } = useAuth();
  const [title, setTitle] = useState();
  const [Class, setClass] = useState();
  const [price, setPrice] = useState();
  const [additionalInfo, setAdditionalInfo] = useState();
  const [privateInfo, setPrivateInfo] = useState();
  const [privateLink, setPrivateLink] = useState();
  const [dansInfo, setdansInfo] = useState();
  const [ActiveButton, SetActiveButton] = useState(1);
  const [freeData, setFreeData] = useState();
  const [paidData, setPaidData] = useState();
  const [teacher, setTeacher] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    if (price <= 500) {
      setDoc(doc(db, "num", "ready", "freeclass", `${generatedId}`), {
        title: title,
        class: Class,
        price: price,
        timestamp: serverTimestamp(),
        additionalInfo: additionalInfo,
        privateInfo: privateInfo,
        privateLink: privateLink,
        photo: currentUser.photoURL,
        ownerName: currentUser.displayName,
        uniqueId: generatedId,
        teacher: teacher,
        isPaid: false,
      });
    } else {
      setDoc(doc(db, "num", "ready", "paidclass", `${generatedId}`), {
        title: title,
        class: Class,
        price: price,
        timestamp: serverTimestamp(),
        additionalInfo: additionalInfo,
        photo: currentUser.photoURL,
        ownerName: currentUser.displayName,
        uniqueId: generatedId,
        teacher: teacher,
        isPaid: true,
        setU: false,
        allowedUsers: [],
      });
      setDoc(doc(db, "num", "privateReadyClass", "Private", `${generatedId}`), {
        privateInfo: privateInfo,
        privateLink: privateLink,
        dansInfo: dansInfo,
      });
      setDoc(doc(db, "num", "readyforadmin", `foradmin`, `${generatedId}`), {
        title: title,
        class: Class,
        price: price,
        setU: false,
        timestamp: serverTimestamp(),
        additionalInfo: additionalInfo,
        privateInfo: privateInfo,
        privateLink: privateLink,
        photo: currentUser.photoURL,
        ownerName: currentUser.displayName,
        ownerMail: currentUser.email,
        uniqueId: generatedId,
        teacher: teacher,
        isPaid: true,
        privateInfo: privateInfo,
        privateLink: privateLink,
        allowedUsers: [],
        requestedUsers: [],
        dansInfo: dansInfo,
      });
    }
    // onNewClassClose();
    onClose();
    showToast();
  };
  useEffect(() => {
    const q = query(
      collection(db, "num", "ready", "freeclass"),
      orderBy("timestamp", "desc")
    );
    const q1 = query(
      collection(db, "num", "ready", "paidclass"),
      orderBy("timestamp", "desc")
    );
    const unsub = onSnapshot(q, (querySnapshot) => {
      let tmpArray = [];
      querySnapshot.forEach((doc) => {
        tmpArray.push({ ...doc.data(), id: doc.id });
      });
      setFreeData(tmpArray);
    });
    const unsub1 = onSnapshot(q1, (querySnapshot) => {
      let tmpArray = [];
      querySnapshot.forEach((doc) => {
        tmpArray.push({ ...doc.data(), id: doc.id });
      });
      setPaidData(tmpArray);
    });
    return () => unsub, unsub1;
  }, []);

  const freeWorks = freeData?.map((ready) => {
    ready.timestamp?.toDate();
    const year = new Date(ready.timestamp?.seconds * 1000)
      .getFullYear()
      .toString();
    let month = new Date(ready.timestamp?.seconds * 1000).getMonth().toString();
    const days = new Date(ready.timestamp?.seconds * 1000).getDate().toString();
    month = parseInt(month) + 1;

    return (
      <WorkCard
        key={ready.uniqueId}
        title={ready.title}
        class={ready.class}
        price={ready.price}
        additionalInfo={ready.additionalInfo}
        privateInfo={ready.privateInfo}
        privateLink={ready.privateLink}
        photo={ready.photo}
        ownerName={ready.ownerName}
        uniqueId={ready.uniqueId}
        teacher={ready.teacher}
        isPaid={ready.isPaid}
        timestamp={year + "-" + month + "-" + days}
      />
    );
  });
  const paidWork = paidData?.map((ready) => {
    ready.timestamp?.toDate();
    const year = new Date(ready.timestamp?.seconds * 1000)
      .getFullYear()
      .toString();
    let month = new Date(ready.timestamp?.seconds * 1000).getMonth().toString();
    const days = new Date(ready.timestamp?.seconds * 1000).getDate().toString();
    month = parseInt(month) + 1;
    return (
      <WorkCard
        key={ready.uniqueId}
        title={ready.title}
        class={ready.class}
        price={ready.price}
        additionalInfo={ready.additionalInfo}
        privateInfo={ready.privateInfo}
        privateLink={ready.privateLink}
        photo={ready.photo}
        ownerName={ready.ownerName}
        uniqueId={ready.uniqueId}
        teacher={ready.teacher}
        isPaid={ready.isPaid}
        timestamp={year + "-" + month + "-" + days}
      />
    );
  });
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
      <Box maxW={"xl"} display={"flex"}>
        <Button
          bg={ActiveButton === 1 ? "pink.400" : "whiteAlpha.100"}
          flex={"1"}
          mr={"2"}
          _hover={{ bg: "pink.400" }}
          onClick={() => {
            SetActiveButton(1);
          }}
        >
          Үнэгүй
        </Button>
        <Button
          bg={ActiveButton === 2 ? "pink.400" : "whiteAlpha.100"}
          _hover={{ bg: "pink.400" }}
          flex={"1"}
          onClick={() => {
            SetActiveButton(2);
          }}
        >
          Үнэтэй
        </Button>
      </Box>
      <Box>{ActiveButton === 1 ? freeWorks : paidWork}</Box>

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
            <Input
              mb={"1.5"}
              variant="outline"
              placeholder="Багшийн нэр"
              onChange={(e) => {
                setTeacher(e.target.value);
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
            <Input
              mb={"3px"}
              variant="outline"
              placeholder="Дансны дугаар аль банк гэдгээ оруулна уу  "
              onChange={(e) => {
                setdansInfo(e.target.value);
              }}
            />
            <Text>
              Тухайн өдрийн төгсгөлд худалдан авалт бүрийн мөнгө таны дансруу
              шилжинэ. Та худалдан авсан тоог тухайн даалгаврын мэдээлэл хэсгээс
              орж харж болно.
            </Text>
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

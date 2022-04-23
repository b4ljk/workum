import {
  Container,
  Heading,
  Text,
  Box,
  Spacer,
  Button,
  useToast,
  Input,
  InputGroup,
  Textarea,
  InputRightElement,
  InputLeftElement,
  Divider,
  Link,
  Avatar,
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
import { Layout } from "../components/Layout";
import { useState, useEffect } from "react";
import { FaExternalLinkAlt, FaLink, FaLock, FaUnlock } from "react-icons/fa";
import {
  BrowserRouter as Router,
  useLocation,
  useHistory,
} from "react-router-dom";
import { db } from "../utils/init-firebase";
import { useAuth } from "../contexts/AuthContext";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
  arrayUnion,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

export default function HomworkOrder() {
  const [title, setTitle] = useState();
  const { currentUser } = useAuth();
  const [moreInfo, setMoreInfo] = useState();
  const [Class, setClass] = useState();
  const [price, setPrice] = useState();
  const [privateInfo, setPrivateInfo] = useState();
  const [privateLink, setPrivateLink] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fullInfo, setFullInfo] = useState();
  const history = useHistory();
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
  const [additionalInfo, setAdditionalInfo] = useState();

  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let myquery = useQuery();
  const [Payment, Setpayment] = useState(false);
  var UniqueNum = myquery.get("uniqueid");
  var incomingType = myquery.get("type");
  // if(incomingType=="Waiting"){
  //   var dataOwnerMail=additionalInfo.ownerMail;
  //   var dataProcessorMail=additionalInfo.ownerMail;
  // }else if(incomingType=="Processing"){ }

  useEffect(() => {
    if (currentUser?.email != null) {
      const q3 = query(
        doc(db, "num", incomingType, currentUser.email, `${UniqueNum}`)
      );
      const unsub3 = onSnapshot(q3, (doc) => {
        setAdditionalInfo(doc.data());
      });
      return unsub3;
    }
  }, [currentUser?.email, incomingType]);
  useEffect(() => {
    if (incomingType == "Main") {
      const q3 = query(doc(db, "num", "numedu", "Orders", `${UniqueNum}`));
      const unsub3 = onSnapshot(q3, (doc) => {
        setAdditionalInfo(doc.data());
      });
      return unsub3;
    }
  }, [currentUser?.email]);

  useEffect(() => {
    if (additionalInfo?.setU == true) {
      const q4 = query(doc(db, "num", "numedu", "Private", `${UniqueNum}`));
      const unsub4 = onSnapshot(q4, (doc) => {
        setFullInfo(doc.data());
      });
      return unsub4;
    }
  }, [additionalInfo?.setU]);

  const sendReadyData = () => {
    updateDoc(
      doc(db, "num", "Waiting", `${additionalInfo?.ownerMail}`, `${UniqueNum}`),
      {
        processingPerson: currentUser?.email,
        processingPersonProfile: currentUser?.photoURL,
      }
    );

    setDoc(
      doc(db, "num", "Processing", `${currentUser?.email}`, `${UniqueNum}`),
      {
        uniqueid: UniqueNum,
        ownerProfile: additionalInfo?.ownerProfile,
        title: additionalInfo?.title,
        price: additionalInfo?.price,
        additionalInfo: additionalInfo?.additionalInfo,
        lastestDate: additionalInfo?.lastestDate,
        class: additionalInfo?.class,
        setU: additionalInfo?.setU,
        ownerMail: additionalInfo?.ownerMail,
        timestamp: serverTimestamp(),
        isDone: false,
        processingPerson: currentUser?.email,
        processingPersonProfile: currentUser?.photoURL,
      }
    );
    setDoc(doc(db, "num", "Processing", `foradmin`, `${UniqueNum}`), {
      uniqueid: UniqueNum,
      ownerProfile: additionalInfo?.ownerProfile,
      title: additionalInfo?.title,
      price: additionalInfo?.price,
      additionalInfo: additionalInfo?.additionalInfo,
      lastestDate: additionalInfo?.lastestDate,
      class: additionalInfo?.class,
      setU: additionalInfo?.setU,
      ownerMail: additionalInfo?.ownerMail,
      timestamp: serverTimestamp(),
      isDone: false,
      processingPerson: currentUser?.email,
      processingPersonProfile: currentUser?.photoURL,
    });
    deleteDoc(doc(db, "num", "numedu", "Orders", `${UniqueNum}`));
    history.push(`/homeworkorder?uniqueid=${UniqueNum}&type=Processing`);
    // onNewClassClose();
    showToast();
  };
  const writeDoneWork = () => {
    setDoc(doc(db, "num", "numedu", "Private", `${UniqueNum}`), {
      privateInfo: privateInfo,
      privateLink: privateLink,
    });
    updateDoc(doc(db, "num", "Processing", "foradmin", `${UniqueNum}`), {
      privateInfo: privateInfo,
      privateLink: privateLink,
    });

    updateDoc(
      doc(
        db,
        "num",
        "Processing",
        additionalInfo?.processingPerson,
        `${UniqueNum}`
      ),
      {
        isDone: true,
      }
    );
    updateDoc(
      doc(db, "num", "Waiting", additionalInfo?.ownerMail, `${UniqueNum}`),
      {
        isDone: true,
      }
    );
    updateDoc(doc(db, "num", "Processing", "foradmin", `${UniqueNum}`), {
      isDone: true,
    });
    // onNewClassClose();
    showToast();
    onClose();
  };
  let buttonShow = true;

  if (additionalInfo?.processingPerson != null) buttonShow = false;
  return (
    <Layout>
      <Container maxW="container.md" py={3}>
        <Box display={"flex"} alignItems="center">
          <Text
            fontWeight={"black"}
            fontFamily={"heading"}
            textTransform={"uppercase"}
            fontSize={"3xl"}
          >
            {additionalInfo?.title}
          </Text>
        </Box>
        <Box display={"flex"} flexDir="column">
          <Text fontWeight={"bold"}>
            Гүйцэтгэгч :{" "}
            <Text color={"pink.400"} display={"inline"}>
              {additionalInfo?.processingPerson ?? "Одоохондоо алга"}
            </Text>
          </Text>
          <Text fontWeight={"bold"}>
            Гүйцэтгэл :{" "}
            <Text color={"pink.400"} display={"inline"}>
              {additionalInfo?.processingPerson &&
                (additionalInfo?.isDone ? "Дууссан" : "Гүйцэтгэж байна.")}
            </Text>
          </Text>
          <Text fontWeight={"bold"}>
            Төлбөр: {additionalInfo?.setU ? "Төлсөн" : "Төлөөгүй"}
          </Text>
          <Text fontWeight={"bold"}>
            Эцсийн хугацаа : {additionalInfo?.lastestDate}
          </Text>
          <Text fontWeight={"bold"}>
            Хичээлийн нэр : {additionalInfo?.class}
          </Text>

          <Divider my={"3"} />
          <Text>{additionalInfo?.additionalInfo}</Text>

          <Divider my={"3"} />
          {additionalInfo?.isDone && (
            <Text
              fontFamily={"heading"}
              fontSize={"2xl"}
              textTransform={"uppercase"}
              my={"2"}
              fontWeight={"black"}
              display="inline-flex"
              alignItems={"center"}
            >
              <Box mr={"2"} display={"inline"}>
                {additionalInfo?.setU && additionalInfo?.isDone ? (
                  <FaUnlock />
                ) : (
                  <FaLock />
                )}
              </Box>
              Даалгаврын{" "}
              <Text ml={"2"} color={"pink.400"}>
                хариу
              </Text>
            </Text>
          )}
          {additionalInfo?.setU && (
            <Box>
              <Text>{fullInfo?.privateInfo}</Text>
              <Text as={"u"} _hover={{ color: "blue" }}>
                <Link href={fullInfo?.privateLink} isExternal>
                  LINK : {fullInfo?.privateLink}
                </Link>
              </Text>
            </Box>
          )}
          {/* <FaExternalLinkAlt /> */}
          {buttonShow && !(currentUser?.email == additionalInfo?.ownerMail) && (
            <Button onClick={sendReadyData}>Энэ даалгаврыг хийх</Button>
          )}
          {currentUser?.email == additionalInfo?.processingPerson && (
            <Button onClick={onOpen}>Даалгаврыг илгээх</Button>
          )}
        </Box>
      </Container>

      <Modal size={"5xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Box display={"flex"} alignItems="center">
              <FaLock size={"20"} /> <Text ml={"3"}>Хариуг илгээх</Text>
            </Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Box display={"flex"} justifyContent="space-between" my={"2"}>
              <FaLock />
            </Box> */}
            <InputGroup mb={"2"}>
              {/* <InputLeftElement children={<FaLock />} /> */}
              <Textarea
                isrequired="true"
                height={"20vh"}
                placeholder="Шаардлагатай зүйлсийг оруулна уу"
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
                placeholder="Зураг файлын линкыг оруулна уу "
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
              onClick={writeDoneWork}
            >
              ИЛГЭЭХ
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  );
}

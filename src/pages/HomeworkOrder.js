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
import { FaExternalLinkAlt, FaLink, FaLock } from "react-icons/fa";
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
  console.log(additionalInfo);
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let myquery = useQuery();
  const [Payment, Setpayment] = useState(false);
  var UniqueNum = myquery.get("uniqueid");

  useEffect(() => {
    const q3 = query(doc(db, "num", "numedu", "Orders", `${UniqueNum}`));
    const unsub3 = onSnapshot(q3, (doc) => {
      setAdditionalInfo(doc.data());
    });
    return unsub3;
  }, []);
  const sendReadyData = () => {
    updateDoc(doc(db, "num", "numedu", "Orders", `${UniqueNum}`), {
      processingPerson: currentUser?.email,
      processingPersonProfile: currentUser?.photoURL,
    });
    // onNewClassClose();
    showToast();
    history.push("/profile");
  };
  const writeDoneWork = () => {
    updateDoc(doc(db, "num", "numedu", "Orders", `${UniqueNum}`), {
      privateInfo: privateInfo,
      privateLink: privateLink,
    });
    // onNewClassClose();
    showToast();
    history.push("/profile");
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
            Эцэсийн хугацаа : {additionalInfo?.lastestDate}
          </Text>
          <Text fontWeight={"bold"}>
            Төлбөр: {additionalInfo?.setU ? "Төлсөн" : "Төлөөгүй"}
          </Text>
          <Divider my={"3"} />
          <Text>{additionalInfo?.additionalInfo}</Text>

          <Divider my={"3"} />
          <Text
            fontFamily={"heading"}
            fontSize={"2xl"}
            textTransform={"uppercase"}
            my={"2"}
            fontWeight={"black"}
          >
            Даалгаврын{" "}
            <Text display={"inline"} color={"pink.400"}>
              хариу
            </Text>
          </Text>
          {additionalInfo?.setU && (
            <Text as={"u"} _hover={{ color: "blue" }}>
              <Link href={additionalInfo?.privateLink} isExternal>
                LINK : {additionalInfo?.privateLink}
              </Link>
            </Text>
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
            <Box display={"flex"}>
              <FaLock size={"25"} /> <Text ml={"3"}>Хариуг илгээх</Text>
            </Box>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Box display={"flex"} justifyContent="space-between" my={"2"}>
              <FaLock />
            </Box> */}
            <InputGroup>
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

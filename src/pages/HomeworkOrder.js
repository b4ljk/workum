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
  Link,
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
  const [moreInfo, setMoreInfo] = useState();
  const [Class, setClass] = useState();
  const [price, setPrice] = useState();
  const [privateInfo, setPrivateInfo] = useState();
  const [privateLink, setPrivateLink] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const history = useHistory();
  const { currentUser } = useAuth();
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
  let buttonShow = true;

  if (additionalInfo?.processingPerson != null) buttonShow = false;
  return (
    <Layout>
      <Container maxW="container.md" py={3}>
        <Box display={"flex"} alignItems="center">
          <Text
            fontWeight={"black"}
            textTransform={"uppercase"}
            fontSize={"3xl"}
          >
            {additionalInfo?.title}
          </Text>
          <Spacer mr={"5"} />
          <Text>{additionalInfo?.lastestDate}</Text>
          <Spacer />
        </Box>
        <Box display={"flex"} flexDir="column">
          <Text>{additionalInfo?.additionalInfo}</Text>

          {Payment && (
            <Text as={"u"} _hover={{ color: "blue" }}>
              <Link to="https://chakra-ui.com" target="_blank">
                Link: Chakra Design system{" "}
              </Link>
            </Text>
          )}
          {/* <FaExternalLinkAlt /> */}
          {buttonShow && (
            <Button onClick={sendReadyData}>Энэ даалгаврыг хийх</Button>
          )}
          {currentUser.email == additionalInfo?.processingPerson && (
            <Button onClick={onOpen}>Даалгаврыг илгээх</Button>
          )}
        </Box>
      </Container>
      <Box>{Payment && <Box>end link baina</Box>}</Box>
      <Modal size={"5xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Бэлэн даалгавар нэмэх</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              mb={"3px"}
              variant="outline"
              placeholder="Гарчиг жишээ нь : БИЕ ДААЛТ"
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

            <Textarea
              mb={"3px"}
              placeholder="Нэмэлт тайлбараа энд үлдээнэ үү "
              onChange={(e) => {
                setMoreInfo(e.target.value);
              }}
            />
            {/* <Box display={"flex"} justifyContent="space-between" my={"2"}>
              <FaLock />
            </Box> */}
            <InputGroup>
              {/* <InputLeftElement children={<FaLock />} /> */}
              <Textarea
                isrequired="true"
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
              ИЛГЭЭХ
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  );
}

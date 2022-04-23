import {
  Container,
  Text,
  Box,
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
import { FaExternalLinkAlt, FaLink, FaLock, FaUnlock } from "react-icons/fa";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { db } from "../utils/init-firebase";
import { useAuth } from "../contexts/AuthContext";
import {
  query,
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
/////////////////////// ene huudsan deer setU adminaar hyanagdsan esehiig shalgana.----------------
export default function PaidReady() {
  const { currentUser } = useAuth();
  const [IsIn, setIsIn] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fullInfo, setFullInfo] = useState();
  const toast = useToast();
  const showToast = () => {
    toast({
      title: "Амжилттай хүсэлтийг илгээлээ",
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

  useEffect(() => {
    for (let i = 0; i < additionalInfo?.allowedUsers.length; i++) {
      if (additionalInfo?.allowedUsers[i] == currentUser?.uid) {
        setIsIn(true);
        const q4 = query(
          doc(db, "num", "privateReadyClass", "Private", `${UniqueNum}`)
        );
        const unsub4 = onSnapshot(q4, (doc) => {
          setFullInfo(doc.data());
        });
        return unsub4;
      }
    }
  }, [additionalInfo?.setU]);

  useEffect(() => {
    const q3 = query(doc(db, "num", "ready", "paidclass", `${UniqueNum}`));
    const unsub3 = onSnapshot(q3, (doc) => {
      setAdditionalInfo(doc.data());
    });
    return unsub3;
  }, []);
  const buyRequest = () => {
    updateDoc(doc(db, "num", "readyforadmin", `foradmin`, `${UniqueNum}`), {
      requestedUsers: arrayUnion(currentUser?.uid),
    });
    showToast();
  };
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
              {additionalInfo?.ownerName ?? "Нууцалсан"}
            </Text>
          </Text>
          <Text fontWeight={"bold"}>
            Гүйцэтгэл :{" "}
            <Text color={"pink.400"} display={"inline"}>
              Бэлэн
            </Text>
          </Text>
          <Text fontWeight={"bold"}>Төлбөр: {additionalInfo?.price}₮</Text>
          <Text fontWeight={"bold"}>
            Зарагдсан тоо: {additionalInfo?.allowedUsers.length}
          </Text>
          <Text fontWeight={"bold"}>
            Хичээлийн нэр : {additionalInfo?.class}
          </Text>

          <Divider my={"3"} />
          <Text>{additionalInfo?.additionalInfo}</Text>

          <Divider my={"3"} />
          {additionalInfo?.setU && (
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
                {IsIn ? <FaUnlock /> : <FaLock />}
              </Box>
              Даалгаврын{" "}
              <Text ml={"2"} color={"pink.400"}>
                хариу
              </Text>
            </Text>
          )}
          {IsIn && (
            <Box>
              <Text>{fullInfo?.privateInfo}</Text>
              <Text as={"u"} _hover={{ color: "blue" }}>
                <Link href={fullInfo?.privateLink} isExternal>
                  LINK : {fullInfo?.privateLink}
                </Link>
              </Text>
            </Box>
          )}

          {additionalInfo?.setU ? (
            <Button onClick={buyRequest}>Энэ даалгаврыг авах</Button>
          ) : (
            <Text fontSize={"3xl"} fontWeight={"black"} alignSelf={"center"}>
              Хянагдаж байна.
            </Text>
          )}
          {/* {currentUser?.email == additionalInfo?.processingPerson && (
              <Button onClick={onOpen}>Даалгаврыг илгээх</Button>
            )} */}
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
                onChange={(e) => {}}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement children={<FaLink />} />
              <Input
                mb={"3px"}
                variant="outline"
                placeholder="Зураг файлын линкыг оруулна уу "
                onChange={(e) => {}}
              />
            </InputGroup>
          </ModalBody>

          <ModalFooter>
            <Button color={"white"} backgroundColor={"pink.400"} mr={3}>
              ИЛГЭЭХ
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  );
}

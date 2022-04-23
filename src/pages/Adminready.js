import {
  Heading,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Button,
  Link,
  useDisclosure,
  Text,
  color,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import React from "react";
import { Layout } from "../components/Layout";
import { Navbar } from "../components/Navbar";
import { useState, useEffect } from "react";
import { db } from "../utils/init-firebase";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  deleteDoc,
} from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";
import { FaTrash, FaCheck, FaDollarSign } from "react-icons/fa";
import { Link as ReachLink } from "react-router-dom";

export default function AdminReady() {
  const {
    isOpen: isLinkOpen,
    onOpen: onLinkOpen,
    onClose: onLinkClose,
  } = useDisclosure();
  const {
    isOpen: isRequestOpen,
    onOpen: onRequestOpen,
    onClose: onRequestClose,
  } = useDisclosure();
  const [processingData, setprocessingData] = useState();
  const [privateInfo1, setPrivateInfo1] = useState();
  const [privateLink1, setPrivateLink1] = useState();
  const [Requests, setRequests] = useState();
  const [MyId, setMyId] = useState();

  useEffect(() => {
    const q = query(collection(db, "num", "readyforadmin", "foradmin"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let tmpArray = [];
      querySnapshot.forEach((doc) => {
        tmpArray.push({ ...doc.data(), id: doc.id });
      });
      setprocessingData(tmpArray);
    });
    return unsub;
  }, []);
  const Paid = (props) => {
    updateDoc(doc(db, "num", "ready", `paidclass`, `${props?.uniqueId}`), {
      setU: true,
    });
    // updateDoc(
    //   doc(
    //     db,
    //     "num",
    //     "Processing",
    //     `${props?.processingPerson}`,
    //     `${props?.uniqueid}`
    //   ),
    //   {
    //     setU: true,
    //   }
    // );
    updateDoc(
      doc(db, "num", "readyforadmin", "foradmin", `${props?.uniqueId}`),
      {
        setU: true,
      }
    );
  };
  const Delete = (props) => {
    deleteDoc(doc(db, "num", "ready", `paidclass`, `${props?.uniqueId}`));
    deleteDoc(
      doc(db, "num", "privateReadyClass", "Private", `${props?.uniqueId}`)
    );
    deleteDoc(
      doc(db, "num", "readyforadmin", "foradmin", `${props?.uniqueId}`)
    );
  };
  const Allowed = (props) => {
    updateDoc(doc(db, "num", "ready", `paidclass`, `${MyId}`), {
      allowedUsers: arrayUnion(props),
    });
    // updateDoc(
    //   doc(
    //     db,
    //     "num",
    //     "Processing",
    //     `${props?.processingPerson}`,
    //     `${props?.uniqueid}`
    //   ),
    //   {
    //     setU: true,
    //   }
    // );
    // updateDoc(
    //   doc(db, "num", "readyforadmin", "foradmin", `${props?.uniqueId}`),
    //   {
    //     setU: true,
    //   }
    // );
  };

  const RequestData = Requests?.map((value) => {
    var colorfordone;
    if (value.setU === true) {
      colorfordone = "green";
    }
    return (
      <Tr color={colorfordone ?? ""}>
        <Td>{value}</Td>

        <Box display={"flex"} flexDir="column">
          <Button
            mb={"1"}
            onClick={() => {
              Allowed(value);
            }}
            borderWidth={"3px"}
            borderColor="green.500"
            rounded={"none"}
            color={"green.500"}
          >
            <FaCheck />
          </Button>
          <Button
            borderWidth={"3px"}
            borderColor={"red.500"}
            rounded={"none"}
            color={"red.500"}
          >
            <FaTrash />
          </Button>
        </Box>
      </Tr>
    );
  });

  const tabledata = processingData?.map((value) => {
    var colorfordone;
    var cunt;
    if (value.setU === true) {
      colorfordone = "green";
    }
    return (
      <Tr color={colorfordone ?? ""}>
        <Td>{value.ownerMail}</Td>
        <Td>{value.price}</Td>
        <Td>{`${value.setU}`}</Td>
        <Td>
          <Button
            onClick={() => {
              onLinkOpen();
              setPrivateInfo1(value.privateInfo);
              setPrivateLink1(value.privateLink);
            }}
          >{`${value.privateInfo?.slice(0, 15)}`}</Button>
        </Td>
        <Td>
          <Button
            onClick={() => {
              onLinkOpen();
              setPrivateInfo1(value.privateInfo);
              setPrivateLink1(value.privateLink);
            }}
          >{`${value.privateLink?.slice(0, 15)}`}</Button>
        </Td>
        <Td>
          <Button
            onClick={() => {
              onRequestOpen();
              setRequests(value.requestedUsers);
              setMyId(value.uniqueId);
            }}
          >{`${value.privateLink?.slice(0, 15)}`}</Button>
        </Td>
        <Box display={"flex"} flexDir="column">
          <Button
            mb={"1"}
            onClick={() => {
              Paid(value);
            }}
            borderWidth={"3px"}
            borderColor="green.500"
            rounded={"none"}
            color={"green.500"}
          >
            <FaCheck />
          </Button>
          <Button
            borderWidth={"3px"}
            onClick={() => {
              Delete(value);
            }}
            borderColor={"red.500"}
            rounded={"none"}
            color={"red.500"}
          >
            <FaTrash />
          </Button>
        </Box>
      </Tr>
    );
  });
  return (
    <Box>
      <Modal size={"full"} isOpen={isLinkOpen} onClose={onLinkClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Мэдээлэл</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{privateInfo1}</Text>
            <Button>
              <Link href={privateLink1} isExternal>
                {privateLink1}
              </Link>
            </Button>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onLinkClose}>
              Хаах
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal size={"lg"} isOpen={isRequestOpen} onClose={onRequestClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Мэдээлэл</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table variant="striped" size="md">
                <TableCaption>Admin panel</TableCaption>
                <Thead>
                  <Tr>
                    <Th>хэн</Th>
                    <Th>ҮНэ</Th>
                  </Tr>
                </Thead>
                <Tbody>{RequestData}</Tbody>
                <Tfoot>
                  <Tr></Tr>
                </Tfoot>
              </Table>
            </TableContainer>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onRequestClose}>
              Хаах
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Navbar />
      <TableContainer>
        <Table variant="striped" size="md">
          <TableCaption>Admin panel</TableCaption>
          <Thead>
            <Tr>
              <Th>Эзэмшигч</Th>
              <Th>ҮНэ</Th>
              <Th>Баталгаажсан</Th>
              <Th>Нууц</Th>
              <Th>Нууц</Th>
              <Th>Хүсэлтүүд</Th>
            </Tr>
          </Thead>
          <Tbody>{tabledata}</Tbody>
          <Tfoot>
            <Tr></Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
}

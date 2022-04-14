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
import { FaPlus } from "react-icons/fa";
export default function Ready() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
        <Text mr={"3"} fontWeight={"black"} fontSize={"4xl"}>
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Бэлэн даалгавар нэмэх</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button
              color={"white"}
              backgroundColor={"pink.400"}
              mr={3}
              onClick={""}
            >
              Нэмэх
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  );
}

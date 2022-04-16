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

      <Modal size={"5xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Бэлэн даалгавар нэмэх</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input mb={"3px"} variant="outline" placeholder="Гарчиг" />
            <InputGroup mb={"3px"}>
              <InputRightElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
                children="₮"
              />
              <Input type={"number"} placeholder="Санал болгох үнэ" />
            </InputGroup>

            <Textarea
              mb={"3px"}
              placeholder="Нэмэлт тайлбараа энд үлдээнэ үү "
            />
            <InputGroup>
              {/* <InputRightElement children={<FaLock />} /> */}
              <Textarea height={"20vh"} placeholder="Нууцлал бүхий хэсэг " />
            </InputGroup>
            <InputGroup>
              <InputLeftElement children={<FaLink />} />
              <Input
                mb={"3px"}
                variant="outline"
                placeholder="Зураг файлын линкыг оруулна уу"
              />
            </InputGroup>
          </ModalBody>

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

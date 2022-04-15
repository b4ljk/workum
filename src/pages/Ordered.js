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
import { useLocation, Link as ReachLink } from "react-router-dom";
import { Layout } from "../components/Layout";
import { WorkCard } from "../components/WorkCard";
import { useAuth } from "../contexts/AuthContext";
import { FaPlus } from "react-icons/fa";
import { OrderCard } from "../components/OrderCard";
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
          Даалгавраа{" "}
          <Text color={"pink.400"} display={"inline"}>
            хийлгэх
          </Text>
        </Text>
        <Button onClick={onOpen} color={"pink.400"}>
          <FaPlus />
        </Button>
      </Box>
      <Box>
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Даалгаврын захиалга үүсгэх</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input mb={"2px"} variant="outline" placeholder="Гарчиг" />
            <InputGroup mb={"2px"}>
              <InputRightElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
                children="₮"
              />
              <Input type={"number"} placeholder="Санал болгох үнэ" />
            </InputGroup>
            <InputGroup mb={"2px"}>
              <InputLeftAddon
                bg={"whiteAlpha.50"}
                pointerEvents="none"
                color="gray.400"
                children="Сүүлийн хугацаа"
              />
              <Input type={"date"} />
            </InputGroup>
            <Textarea placeholder="Нэмэлт тайлбараа энд үлдээнэ үү " />
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

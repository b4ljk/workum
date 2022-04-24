import { Box, Heading, Text, Button, Link } from "@chakra-ui/react";

import { FaFacebookF } from "react-icons/fa";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Flex,
  useClipboard,
} from "@chakra-ui/react";
import { useState } from "react";
export default function PaymentButton({ utga, dun }) {
  const [value, setValue] = useState(utga);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { hasCopied, onCopy } = useClipboard(value);
  return (
    <Button onClick={onOpen} mb={"4"} w={"100%"}>
      Төлбөр хийх
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Төлбөр</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight={"bold"}>Данс: </Text>
            <Flex mb={2}>
              {" "}
              <Input
                textAlign={"center"}
                value={"ХаанБанк - 5042585802 - Бал...ям"}
                isReadOnly
                placeholder="Welcome"
              />
              <Button
                as={"a"}
                href="https://www.facebook.com/Arvntech"
                ml={"2"}
              >
                <FaFacebookF />
              </Button>
            </Flex>
            <Text fontWeight={"bold"}>Гүйлгээний утга:</Text>
            <Flex mb={2}>
              {" "}
              <Input
                textAlign={"center"}
                value={value}
                isReadOnly
                placeholder="Welcome"
              />
              <Button onClick={onCopy} ml={2}>
                {hasCopied ? "Хуулсан" : "Хуулах"}
              </Button>
            </Flex>
            <Text color="pink.400" fontWeight={"black"} fontSize={"xl"}>
              Дүн: {dun}{" "}
            </Text>
            <Text>
              Таны гүйлгээ хийгдэснээс 2-с 2 цагийн дотор баталгаажих ба
              даалгавартай холбоотой асуудал гарвал та тухайн өдрийн дотор
              бидэнд мэдэгдэснээр мөнгөө буцаан авах юм.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Хаах
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Button>
  );
}

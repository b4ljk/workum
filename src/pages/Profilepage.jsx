import {
  chakra,
  Container,
  Heading,
  Box,
  Text,
  Avatar,
  Divider,
  Button,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { Layout } from "../components/Layout";
import { Navbar } from "../components/Navbar";
import { WorkCard } from "../components/WorkCard";
import { useAuth } from "../contexts/AuthContext";

export default function Profilepage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { currentUser } = useAuth();
  console.log(currentUser);
  return (
    <Box display={"flex"} flexDir={"column"} justifyContent={"center"}>
      <Box mb={"15"}>
        <Navbar />
      </Box>
      <Box alignSelf={"center"} p="10">
        <Box display={"flex"} alignItems={"center"}>
          <Avatar mr={"3"} src={currentUser?.photoURL} />
          <Text fontWeight={"bold"} fontSize={"2xl"}>
            {currentUser?.displayName}
          </Text>
        </Box>
        <Divider my="3" />
        <Box alignItems={"center"}>
          <Button mr={"3"}>Миний захиалсан</Button>
          <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
            Миний хийсэн
          </Button>
        </Box>
        <Box>
          <WorkCard />
          <WorkCard />
          <WorkCard />
        </Box>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Input placeholder="Type here..." />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

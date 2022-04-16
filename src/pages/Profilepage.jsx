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
import { useEffect, useState } from "react";
export default function Profilepage() {
  let activecards;
  const [active, setActive] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { currentUser } = useAuth();
  console.log(currentUser);
  var buttonBg, buttonBg2;
  const handleActive2 = () => {
    setActive(true);
  };

  const handleActive = () => {
    setActive(false);
  };
  if (!active) {
    buttonBg = "gray.200";
    buttonBg2 = "transparent";
    activecards = <WorkCard />;
  } else {
    buttonBg = "transparent";
    buttonBg2 = "gray.200";
  }
  return (
    <Box display={"flex"} flexDir={"column"} justifyContent={"center"}>
      <Box mb={"15"}>
        <Navbar />
      </Box>
      <Box alignSelf={"center"} p="10" minWidth={{ md: "xl", base: "100%" }}>
        <Box display={"flex"} alignItems={"center"}>
          <Avatar mr={"3"} src={currentUser?.photoURL} />
          <Text fontWeight={"bold"} fontSize={"2xl"}>
            {currentUser?.displayName}
          </Text>
        </Box>
        <Divider my="3" />
        <Box display={"flex"} alignItems={"center"}>
          <Button flex={1} mr={"3"} onClick={handleActive} bg={buttonBg}>
            Миний захиалсан
          </Button>
          <Button flex={1} bg={buttonBg2} onClick={handleActive2}>
            Миний хийж буй
          </Button>
        </Box>
        <Box>{activecards}</Box>
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

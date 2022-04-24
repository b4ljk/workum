import { Box, Text, Avatar, Divider, Button } from "@chakra-ui/react";
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
import { Data } from "../contexts/Data";
import { OrderCard } from "../components/OrderCard";
import { ProfileOrderCard } from "../components/ProfileOrderCard";
import { ProfileClientCard } from "../components/ProfileClientCard";
export default function Profilepage() {
  let currenTaskCounter = 0;

  const { processingData, waitingData } = Data();

  let activecards;
  const [active, setActive] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { currentUser } = useAuth();

  var buttonBg, buttonBg2;
  const handleActive2 = () => {
    setActive(true);
  };

  const handleActive = () => {
    setActive(false);
  };
  if (!active) {
    buttonBg = "pink.400";
    buttonBg2 = "transparent";
    activecards = <WorkCard />;
  } else {
    buttonBg = "transparent";
    buttonBg2 = "pink.400";
  }
  const meDoing = processingData?.map((value) => {
    value.timestamp?.toDate();
    const year = new Date(value.timestamp?.seconds * 1000)
      .getFullYear()
      .toString();
    let month = new Date(value.timestamp?.seconds * 1000).getMonth().toString();
    const days = new Date(value.timestamp?.seconds * 1000).getDate().toString();
    month = parseInt(month) + 1;
    //order by time

    return (
      <ProfileClientCard
        uniquekey={value.uniqueid}
        title={value.title}
        price={value.price}
        additionalInfo={value.additionalInfo}
        duedate={value.lastestDate}
        classname={value.class}
        ownerMail={value.ownerMail}
        Udata={value.setU}
        timestamp={year + "-" + month + "-" + days}
        ownerProfile={value.ownerProfile}
        class={value.class}
      />
    );
  });
  const orders = waitingData?.map((value) => {
    value.timestamp?.toDate();
    const year = new Date(value.timestamp?.seconds * 1000)
      .getFullYear()
      .toString();
    let month = new Date(value.timestamp?.seconds * 1000).getMonth().toString();
    const days = new Date(value.timestamp?.seconds * 1000).getDate().toString();
    month = parseInt(month) + 1;
    return (
      <ProfileOrderCard
        uniquekey={value.uniqueid}
        title={value.title}
        price={value.price}
        additionalInfo={value.additionalInfo}
        duedate={value.lastestDate}
        classname={value.class}
        ownerMail={value.ownerMail}
        Udata={value.setU}
        timestamp={year + "-" + month + "-" + days}
        processingPerson={value.processingPerson}
        processingPersonProfile={value.processingPersonProfile}
        class={value.class}
      />
    );
  });

  return (
    <Box display={"flex"} flexDir={"column"} justifyContent={"center"}>
      <Box mb={"15"}>
        <Navbar />
      </Box>
      <Box
        maxW={"110%"}
        alignSelf={"center"}
        p="10"
        minWidth={{ md: "xl", base: "100%" }}
      >
        <Box display={"flex"} alignItems={"center"}>
          <Avatar mr={"3"} src={currentUser?.photoURL} />
          <Text fontWeight={"bold"} fontSize={"2xl"}>
            {(currentUser?.displayName ?? currentUser?.email).slice(0, 25)}
          </Text>
        </Box>
        <Divider my="3" />
        <Box display={"flex"} alignItems={"center"}>
          <Button
            _hover={{ bg: "pink.400" }}
            flex={1}
            mr={"3"}
            onClick={handleActive}
            bg={buttonBg}
          >
            Миний захиалсан
          </Button>
          <Button
            _hover={{ bg: "pink.400" }}
            flex={1}
            bg={buttonBg2}
            onClick={handleActive2}
          >
            Миний хийж буй
          </Button>
        </Box>
        <Box>
          {active && meDoing}
          {!active && orders}
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

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
  Link,
} from "@chakra-ui/react";
import React from "react";
import { useLocation, Link as ReachLink } from "react-router-dom";
import { Layout } from "../components/Layout";
import { WorkCard } from "../components/WorkCard";
import { useAuth } from "../contexts/AuthContext";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
export default function Homepage() {
  return (
    <Layout>
      <Text fontWeight="medium" fontSize="4xl">
        Гэрийн даалгавраа{" "}
        <Text
          display="inline"
          color="pink.400"
          fontWeight="black"
          fontSize="4xl"
        >
          хийх
        </Text>{" "}
        <Box display="inline" fontSize="4xl">
          шилдэг арга
        </Box>
      </Text>
      <Box display="flex" flexDir={{ md: "row", base: "column" }} mt="6">
        <Link as={ReachLink} width={"100%"} to="ready" mr={"3px"}>
          <Button width={"100%"} variant={"outline"} mb={"3"} mr={"3"}>
            Бэлэн даалгавар үзэх/нэмэх
          </Button>
        </Link>
        <Link as={ReachLink} width="100%" to="ordered">
          <Button width={"100%"} color="white" bg={"pink.400"}>
            Даалгавраа хийлгэх
          </Button>
        </Link>
      </Box>
      {/* <Box display={"flex"} alignItems={"center"}>
        <Text mr={"3"} fontWeight={"bold"} fontSize={"2xl"}>
          Хийлгэх даалгаврууд
        </Text>
        <Button size={"sm"}>
          <FaPlus />
        </Button>
      </Box> */}
    </Layout>
  );
}

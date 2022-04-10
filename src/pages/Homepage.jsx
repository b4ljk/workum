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
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout } from "../components/Layout";
import { WorkCard } from "../components/WorkCard";
import { useAuth } from "../contexts/AuthContext";

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
      <Box display="flex" mt="6">
        <Button variant={"outline"} mr={"3"}>
          Даалгавар зарах
        </Button>
        <Button bg={"pink.400"}>Даалгавар авах</Button>
      </Box>
      <WorkCard />
    </Layout>
  );
}

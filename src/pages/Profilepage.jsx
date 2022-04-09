import { chakra, Container, Heading, Box } from "@chakra-ui/react";
import React from "react";
import { Layout } from "../components/Layout";
import { useAuth } from "../contexts/AuthContext";

export default function Profilepage() {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return (
    <Layout>
      <Heading>Profile page</Heading>
      <Container maxW="container.lg" overflowX="auto" py={4}>
        <Box>{currentUser.displayName}</Box>
      </Container>
    </Layout>
  );
}

import { Container, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Layout } from "../components/Layout";

export default function Homeworks() {
  return (
    <Layout>
      <Heading>Түүхийн бие даалт</Heading>
      <Container maxW="container.lg" py={4}>
        <Text>Only for showing how redirects work, i.e. redict to or back</Text>
        <Text> SAMPLE IMAGE WILL BE HERE I GUESS</Text>
        <Text>Drop-box link or some shite fuck sake</Text>
      </Container>
    </Layout>
  );
}

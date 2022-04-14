import { Container, Heading, Text, Box } from "@chakra-ui/react";
import React from "react";
import { Layout } from "../components/Layout";
import { useState } from "react";
export default function Homeworks() {
  const [Payment, Setpayment] = useState(false);
  return (
    <Layout>
      <Heading>Түүхийн бие даалт</Heading>
      <Container maxW="container.lg" py={4}>
        <Text>Only for showing how redirects work, i.e. redict to or back</Text>
        <Text> SAMPLE IMAGE WILL BE HERE I GUESS</Text>
        <Text>Drop-box link or some shite fuck sake</Text>
      </Container>
      <Box>{Payment && <Box>end link baina</Box>}</Box>
    </Layout>
  );
}

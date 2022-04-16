import { Container, Heading, Text, Box, Link } from "@chakra-ui/react";
import React from "react";
import { Layout } from "../components/Layout";
import { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
export default function HomworkOrder() {
  const [Payment, Setpayment] = useState(false);
  return (
    <Layout>
      <Container maxW="container.md" py={3}>
        <Text fontWeight={"black"} textTransform={"uppercase"} fontSize={"3xl"}>
          THIS IS TITLE BABY
        </Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae
          malesuada nibh, eu bibendum ligula. Donec vitae odio malesuada augue
          ullamcorper rhoncus id interdum elit. Pellentesque vestibulum elit nec
          purus ultricies interdum. Nulla et purus imperdiet, faucibus est at,
          viverra magna. Aliquam lorem odio, volutpat at nibh vitae, rhoncus
          pellentesque ipsum. In odio libero, aliquet sit amet quam sit amet,
          vestibulum vestibulum nunc. Morbi aliquet laoreet nisl id consectetur.
          Pellentesque placerat in magna a semper. Vestibulum ante ipsum primis
          in faucibus orci luctus et ultrices posuere cubilia curae; Nam
          pulvinar orci sed dui gravida, ut dapibus ex ultrices.
        </Text>
        <Text as={"u"} _hover={{ color: "blue" }}>
          <Link href="https://chakra-ui.com" isExternal>
            Link: Chakra Design system{" "}
          </Link>
        </Text>
        {/* <FaExternalLinkAlt /> */}
      </Container>
      <Box>{Payment && <Box>end link baina</Box>}</Box>
    </Layout>
  );
}

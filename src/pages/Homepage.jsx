import {
  Box,
  Text,
  Button,
  Link,
  Center,
  useColorMode,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { useLocation, Link as ReachLink } from "react-router-dom";
import { Layout } from "../components/Layout";
import { WorkCard } from "../components/WorkCard";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { FaCheck, FaBook, FaBookMedical } from "react-icons/fa";
import SmallWithLogoLeft from "../components/Footer";
export default function Homepage() {
  const { logout, currentUser } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      height={"100vh"}
      display="flex"
      flexDir={"column"}
      justifyContent="space-between"
    >
      {colorMode === "light" ? (
        <Box
          w="100%"
          h="100vh"
          position={"absolute"}
          zIndex={"-1"}
          bgGradient="linear(to-bl, blue.100, secondary, pink.100, blue.100)"
        />
      ) : (
        <Box w="100%" h="100vh" position={"absolute"} zIndex={"-1"}></Box>
      )}
      <Layout>
        <Box
          display={"flex"}
          flexDir={"column"}
          justifyContent="center"
          height={"65vh"}
        >
          <Center>
            <Text
              textTransform={"uppercase"}
              fontFamily={"heading"}
              textAlign={"center"}
              fontWeight="black"
              fontSize={{ md: "5xl", base: "3xl", lg: "6xl" }}
            >
              гэрийн даалгавраа{" "}
              <Text display="inline" color="pink.400" fontWeight="black">
                хийх шинэ
              </Text>{" "}
              <Box display="inline">арга</Box>
            </Text>
          </Center>

          <Box display="flex" flexDir={{ md: "row", base: "column" }} mt="6">
            {currentUser ? (
              <Link as={ReachLink} width={"100%"} to="ready" mr={"3px"}>
                <Button
                  fontSize={"xl"}
                  leftIcon={<FaBook />}
                  width={"100%"}
                  bg="transparent"
                  border={"2px"}
                  mb={"3"}
                  mr={"3"}
                  borderColor="white"
                >
                  Бэлэн даалгавар авах
                </Button>
              </Link>
            ) : (
              <Tooltip label="Эхлээд нэвтрэх шаардлагатай">
                <Link
                  width={"100%"}
                  mr={"3px"}
                  as={ReachLink}
                  to="login"
                  _hover={{ textDecor: "none" }}
                >
                  <Button
                    fontSize={"xl"}
                    leftIcon={<FaBook />}
                    width={"100%"}
                    bg="transparent"
                    border={"2px"}
                    mb={"3"}
                    mr={"3"}
                    borderColor="white"
                    _hover={{
                      bg: "red.500",
                    }}
                  >
                    Бэлэн даалгавар авах
                  </Button>
                </Link>
              </Tooltip>
            )}
            {currentUser ? (
              <Link as={ReachLink} width="100%" to="ordered">
                <Button
                  leftIcon={<FaBookMedical />}
                  fontSize={"xl"}
                  _hover={{ bg: "pink.700" }}
                  width={"100%"}
                  color="white"
                  bg={"pink.400"}
                >
                  Даалгавраа хийлгэх/хийх
                </Button>
              </Link>
            ) : (
              <Tooltip label="Эхлээд нэвтрэх шаардлагатай">
                <Link
                  width={"100%"}
                  mr={"3px"}
                  as={ReachLink}
                  to="login"
                  _hover={{ textDecor: "none" }}
                >
                  <Button
                    leftIcon={<FaBookMedical />}
                    fontSize={"xl"}
                    _hover={{ bg: "red.500" }}
                    width={"100%"}
                    color="white"
                    bg={"pink.400"}
                  >
                    Даалгавраа хийлгэх/хийх
                  </Button>
                </Link>
              </Tooltip>
            )}
          </Box>
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

      <SmallWithLogoLeft />
    </Box>
  );
}

import {
  Box,
  HStack,
  IconButton,
  Spacer,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import Navlink from "./Navlink";

export function Navbar() {
  const { toggleColorMode } = useColorMode();
  // const { logout, currentUser } = useAuth()
  const { logout, currentUser } = useAuth();

  return (
    <Box
      // borderBottom="2px"
      // borderBottomColor={useColorModeValue("gray.100", "gray.700")}
      mb={4}
      py={4}
      pl="10"
    >
      <HStack
        justifyContent="flex-end"
        maxW="container.lg"
        mx="auto"
        // spacing={}
      >
        <Navlink to="/" name="Nelp" size="lg" />
        <Spacer />
        <Box display={"flex"} flexDir={{ md: "row", base: "column" }}>
          <Box>{!currentUser && <Navlink to="/login" name="Нэвтрэх" />}</Box>
          {!currentUser && <Navlink to="/register" name="Бүртгүүлэх" />}
        </Box>
        {currentUser && <Navlink to="/profile" name="Профайл" />}
        {currentUser && (
          <Navlink
            to="/logout"
            name="Гарах"
            onClick={async (e) => {
              e.preventDefault();
              await logout();
            }}
          />
        )}
        <IconButton
          variant="ghost"
          icon={useColorModeValue(<FaSun />, <FaMoon />)}
          onClick={toggleColorMode}
          aria-label="toggle-dark-mode"
        />
      </HStack>
    </Box>
  );
}

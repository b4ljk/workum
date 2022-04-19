import {
  Box,
  HStack,
  IconButton,
  Spacer,
  useColorMode,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { FaMoon, FaSun, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
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
        <Navlink to="/" name="WORKUM" />
        <Spacer />
        <Box display={"flex"} flexDir={{ md: "row", base: "column" }}>
          <Box>{!currentUser && <Navlink to="/login" name="Нэвтрэх" />}</Box>
        </Box>
        <IconButton
          variant="ghost"
          icon={useColorModeValue(
            <FaSun size={"26"} />,
            <FaMoon size={"22"} />
          )}
          onClick={toggleColorMode}
          aria-label="toggle-dark-mode"
        />
        {currentUser && (
          <Box bg={"transparent"}>
            <Navlink
              display={{ md: "block", base: "none" }}
              to="/profile"
              name={"даалгаврууд"}
            />

            <Box bg={"transparent"} display={{ md: "none", base: "block" }}>
              <Menu>
                <MenuButton fontSize={"26"} as={Button} variant={"outlined"}>
                  <FaUserCircle />
                </MenuButton>
                <MenuList>
                  <MenuItem as={Navlink} to="/profile" name="профайл" />
                  <MenuDivider />
                  <MenuItem
                    as={Navlink}
                    to="/logout"
                    name={<FaSignOutAlt size={"25"} />}
                    onClick={async (e) => {
                      e.preventDefault();
                      await logout();
                    }}
                  />
                </MenuList>
              </Menu>
            </Box>
          </Box>
        )}
        {currentUser && (
          <Navlink
            display={{ md: "block", base: "none" }}
            to="/logout"
            name={<FaSignOutAlt size={"26"} />}
            onClick={async (e) => {
              e.preventDefault();
              await logout();
            }}
          />
        )}
      </HStack>
    </Box>
  );
}

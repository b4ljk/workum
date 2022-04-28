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
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { FaMoon, FaSun, FaSignOutAlt, FaCog } from "react-icons/fa";
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
            <Box bg={"transparent"} display={{ md: "block", base: "block" }}>
              <Menu>
                <MenuButton fontSize={"26"} as={Button} variant={"outlined"}>
                  <FaCog size={"24"} />
                </MenuButton>
                <MenuList>
                  <MenuItem as={Navlink} to="/profile" name="Захиалга" />
                  <MenuDivider />
                  <MenuItem as={Navlink} to="/ordered" name="Захиалах" />
                  <MenuDivider />
                  <MenuItem as={Navlink} to="/aboutus" name="About us" />
                  <MenuDivider />
                  <MenuItem as={Navlink} to="/zaavar" name="Zaavar" />
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
      </HStack>
    </Box>
  );
}

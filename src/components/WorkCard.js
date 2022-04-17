import {
  Box,
  Text,
  Link,
  Badge,
  Grid,
  Avatar,
  Button,
  LinkBox,
  LinkOverlay,
  Divider,
  Flex,
} from "@chakra-ui/react";
import { useLocation, Link as ReachLink, useParams } from "react-router-dom";
export const WorkCard = () => {
  return (
    <LinkBox
      boxShadow="base"
      p="4"
      borderRadius="10"
      w={{ md: "xl", base: "100%" }}
      mt="5"
    >
      <LinkOverlay as={ReachLink} to="homeworks">
        <Box display="flex" flexDir={{ md: "row", base: "column" }}>
          <Box mr="5" flex="1">
            <Text fontWeight="bold" fontSize="2xl" py="2">
              Түүх бие даалт
            </Text>
            <Text>
              <Text fontWeight={"bold"} display={"inline"}>
                Хичээлийн нэр :{" "}
              </Text>
              Түүх
            </Text>
            <Text>
              <Text fontWeight={"bold"} display={"inline"}>
                Хэн багш дээр :{" "}
              </Text>
              Б.Батням
            </Text>
            <Text>
              <Text fontWeight={"bold"} display={"inline"}>
                {" "}
                Нэмэлт тайлбар :{" "}
              </Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
              euismod gravida velit, nec lobortis tortor venenatis in. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Cras ac mi ac
              tellus posuere elementum ac vitae ipsum. Donec efficitur lacinia
              leo at sodales. Nullam semper ornare velit, id mollis dolor
              vehicula at.
            </Text>
          </Box>
        </Box>
        <Box></Box>
        <Divider my="3" />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <Avatar h="10" w="10" mr="2" />
            <Text>
              Батаа{" "}
              <Text fontSize={"sm"} color={"gray.400"}>
                /Гүйцэтгэгч/
              </Text>
            </Text>
          </Box>
          <Box>
            <Text>2022.12.12</Text>
          </Box>
        </Box>
      </LinkOverlay>
    </LinkBox>
  );
};

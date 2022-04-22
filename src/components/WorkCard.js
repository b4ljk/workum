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
export const WorkCard = (props) => {
  let toWhere;
  if (props.isPaid === true) {
    toWhere = "paidready";
  } else {
    toWhere = "homeworks";
  }
  return (
    <LinkBox
      boxShadow="base"
      p="4"
      bg={"whiteAlpha.50"}
      borderRadius="10"
      w={{ md: "xl", base: "100%" }}
      mt="5"
    >
      <LinkOverlay
        as={ReachLink}
        to={toWhere + "?uniqueid=" + props.uniqueId + "&type=" + props.isPaid}
      >
        <Box display="flex" flexDir={{ md: "row", base: "column" }}>
          <Box mr="5" flex="1">
            <Text fontWeight="bold" fontSize="2xl" py="2">
              {props.title}
            </Text>
            <Text>
              <Text fontWeight={"bold"} display={"inline"}>
                Хичээлийн нэр :{" "}
              </Text>
              {props.class}
            </Text>
            <Text>
              <Text fontWeight={"bold"} display={"inline"}>
                Үнэ:{" "}
              </Text>
              {props.price} ₮
            </Text>
            <Text>
              <Text fontWeight={"bold"} display={"inline"}>
                Хэн багш дээр :{" "}
              </Text>
              {props.teacher}
            </Text>
            <Text>
              <Text fontWeight={"bold"} display={"inline"}>
                {" "}
                Нэмэлт тайлбар :{" "}
              </Text>
              {props.additionalInfo?.slice(0, 30)}
            </Text>
          </Box>
        </Box>
        <Box></Box>
        <Divider my="3" />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <Avatar h="10" w="10" mr="2" src={props.photo} />
            <Text>
              {props.ownerName ?? "Нэргүй"}
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

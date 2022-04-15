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
import { useLocation, Link as ReachLink } from "react-router-dom";
export const OrderCard = () => {
  return (
    <LinkBox
      boxShadow="base"
      p="4"
      borderRadius="10"
      w={{ md: "xl", base: "100%" }}
      mt="5"
    >
      <LinkOverlay as={ReachLink} to="homeworkorder">
        <Box display="flex" flexDir={{ md: "row", base: "column" }}>
          <Box mr="5" flex="1">
            <Text fontWeight="bold" fontSize="2xl" py="2">
              Түүх бие даалт
            </Text>
            <Text>
              <Text fontWeight={"bold"} display={"inline"}>
                Үйл явц :{" "}
              </Text>
              Хүлээгдэж буй{" "}
            </Text>
            <Text>
              {" "}
              <Text fontWeight={"bold"} display={"inline"}>
                Эцсийн хугацаа :{" "}
              </Text>{" "}
              2022/22/22{" "}
            </Text>
            <Text>
              {" "}
              <Text fontWeight={"bold"} display={"inline"}>
                Санал болгох үнэ :{" "}
              </Text>{" "}
              14000 ₮{" "}
            </Text>
            <Text color={"facebook.600"}>
              {" "}
              <Text fontWeight={"bold"} display={"inline"}>
                Нэмэлт тайлбар :{" "}
              </Text>{" "}
              Энэ даалгавар 5 аас 10 хууда...{" "}
            </Text>
          </Box>
        </Box>
        <Divider my="3" />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <Button>Мэдээлэлтэй танилцах</Button>
          </Box>
          <Box>
            <Text>2022.12.12</Text>
          </Box>
        </Box>
      </LinkOverlay>
    </LinkBox>
  );
};

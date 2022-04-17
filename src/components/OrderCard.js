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
export const OrderCard = (props) => {
  const { orderid } = useParams();
  let isAvailable = true;
  if (props.processingPerson != null) isAvailable = false;
  return (
    isAvailable && (
      <LinkBox
        boxShadow="base"
        p="4"
        borderRadius="10"
        w={{ md: "xl", base: "100%" }}
        mt="5"
      >
        <LinkOverlay
          as={ReachLink}
          to={"homeworkorder?uniqueid=" + props.uniquekey}
        >
          <Box display="flex" flexDir={{ md: "row", base: "column" }}>
            <Box mr="5" flex="1">
              <Text fontWeight="bold" fontSize="2xl" py="2">
                {props.title}
              </Text>
              <Text>
                <Text fontWeight={"bold"} display={"inline"}>
                  Үйл явц :{" "}
                </Text>
                Хүлээгдэж буй{" "}
              </Text>
              <Text>
                <Text fontWeight={"bold"} display={"inline"}>
                  Хичээлийн нэр :{" "}
                </Text>
                {props.class}
              </Text>
              <Text>
                {" "}
                <Text fontWeight={"bold"} display={"inline"}>
                  Эцсийн хугацаа :{" "}
                </Text>{" "}
                {props.duedate}{" "}
              </Text>
              <Text>
                {" "}
                <Text fontWeight={"bold"} display={"inline"}>
                  Санал болгох үнэ :{" "}
                </Text>{" "}
                {props.price} ₮{" "}
              </Text>
              <Text>
                {" "}
                <Text fontWeight={"bold"} display={"inline"}>
                  Нэмэлт тайлбар :{" "}
                </Text>{" "}
                {props.additionalInfo?.slice(0, 20)}...{" "}
              </Text>
            </Box>
          </Box>
          <Divider my="3" />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center">
              <Button>Мэдээлэлтэй танилцах</Button>
            </Box>
            <Box>
              <Text>{props.timestamp}</Text>
            </Box>
          </Box>
        </LinkOverlay>
      </LinkBox>
    )
  );
};

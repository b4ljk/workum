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

export const WorkCard = () => {
  return (
    <LinkBox
      boxShadow="base"
      p="4"
      borderRadius="10"
      w={{ md: "xl", base: "100%" }}
      mt="5"
      bg="white"
    >
      <Box display="flex" flexDir={{ md: "row", base: "column" }}>
        <Box mr="5" flex="1">
          <Text fontWeight="bold" fontSize="2xl" py="2">
            Хэрхэн бизнес эхлэх вэ?
          </Text>
          <Text>Санал болгох үнэ : 5000</Text>
          <Text>Эцэсийн хугацаа : 2022/22/22 </Text>
        </Box>
        <Box py="2">
          <Text>Багшийн нэр : Батням</Text>
          <Text> Хичээлийн нэр : Доржготов </Text>
          <Box display={"flex"} justifyContent="center">
            <Button w={"60%"} mt="2">
              Авах
            </Button>
          </Box>
        </Box>
      </Box>
      <Divider my="3" />
      <Box display="flex" justifyContent="space-between" alignItems="flex-end">
        <Box display="flex" alignItems="center">
          <Avatar h="10" w="10" mr="2" />
          <Text>Батаа</Text>
        </Box>
        <Box>
          <Text>2022.12.12</Text>
        </Box>
      </Box>
    </LinkBox>
  );
};

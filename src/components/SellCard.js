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

export const SellCard = () => {
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
            Түүх бие даалт
          </Text>
          <Text>Үйл явц : Дууссан</Text>
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
    </LinkBox>
  );
};

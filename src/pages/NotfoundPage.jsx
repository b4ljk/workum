import { Box, Heading, Text, Button, Link } from "@chakra-ui/react";
import SmallWithLogoLeft from "../components/Footer";
import { Navbar } from "../components/Navbar";

export default function NotfoundPage() {
  return (
    <Box
      h={"100vh"}
      display={"flex"}
      flexDir="column"
      justifyContent={"space-between"}
    >
      <Box textAlign="center" py={1} px={6}>
        <Navbar />
        <Box h={"20vh"}></Box>
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          bgGradient="linear(to-r, teal.400, teal.600)"
          backgroundClip="text"
        >
          404
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          Ийм хуудас олдсонгүй
        </Text>
        <Text color={"gray.500"} mb={6}>
          Андуурал гарааааааааааааюуууудаааааа ?? үгүй бол бидэнд мэдэгдээрэй 👌
        </Text>

        <Link href="/">
          <Button
            colorScheme="teal"
            bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
            color="white"
            variant="solid"
          >
            нүүр хуудасруу буцах
          </Button>
        </Link>
      </Box>
      <SmallWithLogoLeft />
    </Box>
  );
}

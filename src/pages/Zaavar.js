import { Box, Heading, Text, Button, Link } from "@chakra-ui/react";
import SmallWithLogoLeft from "../components/Footer";
import { Navbar } from "../components/Navbar";

export default function Zaavar() {
  return (
    <Box
      h={"100vh"}
      display={"flex"}
      flexDir="column"
      justifyContent={"space-between"}
    >
      <Box w={"100%"}>
        <Navbar />

        <Box maxW={"100%"} margin={"auto"} w={"container.lg"} px={8} py={1}>
          <Heading>
            DO HOME
            <Heading color={"pink.400"} display={"inline"}>
              WORK
            </Heading>{" "}
            AT N
            <Heading color={"pink.400"} display={"inline"}>
              UM
            </Heading>{" "}
            FOR{" "}
            <Heading color={"pink.400"} display={"inline"}>
              ME
            </Heading>{" "}
          </Heading>
          <Text color={"gray.500"} fontSize="18px" mt={-3} mb={2}>
            workum.me
          </Text>
          <Text mb={6}>
            <Text color={"pink.400"} display={"inline"}>
              Даалгавраа хийлгэх{" "}
            </Text>{" "}
            оюутан даалгавар хийлгэх хэсгээр орж нэмэх товч дээр дарж хийлгэх
            даалгаврын мэдээллийг оруулна. Ингэснээр өөр оюутан энэ даалгаврыг
            гүйцэтгэх боломжтой болох юм. Та төлбөрөө төлснөөр даалгаврын
            мэдээллийг харах эрх нээгдэнэ. Таны даалгаврыг өөр оюутан
            гүйцэтгэхээр авсан бол тухайн мэдээллийг та Захиалга /profile/
            хэсгээс хараарай.
          </Text>
          <Text mb={6}>
            <Text display={"inline"} color={"pink.400"}>
              Оюутны даалгаврыг гүйцэтгэх
            </Text>{" "}
            оюутан даалгавар хийлгэх/хийх гэсэн хэсгээр орж хийх даалгаврынхаа
            мэдээлэлтэй танилцах гэсэн дээр дарж орон тэр даалгаврын дэлгэрэнгүй
            мэдээллийг авах ба энэ даалгаврыг хийх товчин дээр дарснаар тухайн
            даалгаврыг зөвхөн та гүйцэтгэх боломжтой болох юм. Даалгаврыг
            гүйцэтгэж дуусаад явуулах ба та дансны дугаараа оруулахаа мартуузай.
            Та даалгаврынхаа мэдээллийг Захиалга /profile/ хэсгээс хараарай.
          </Text>
          <Text mb={6}>
            <Text display={"inline"} color="gray.500">
              {" "}
            </Text>{" "}
          </Text>

          <Link href="/">
            <Button variant="outline">нүүр хуудасруу буцах</Button>
          </Link>
        </Box>
      </Box>
      <SmallWithLogoLeft />
    </Box>
  );
}

import { Box, Heading, Text, Button, Link } from "@chakra-ui/react";
import SmallWithLogoLeft from "../components/Footer";
import { Navbar } from "../components/Navbar";

export default function AboutUs() {
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
          <Text>
            This website will not work from now on because some people hate it
            so much they say it's illegal and immoral.
          </Text>
          <Text color={"red"} mb={6}>
            rip dis site :)))
          </Text>
          <Text mb={6}>
            Энэхүү сайтын гол зорилго нь оюутнууд хоорондоо даалгавраа
            аюулгүйгээр солилцож нэгэндээ бага ч гэсэн дэм болоход нь туслах
            билээ. Зарим оюутанд мөнгө хэрэгтэй байдаг бол зарим оюутанд
            ойлголхгүй байгаа даалгавар эсхүл угаасаа чадахгүй хичээл дээр нь
            тус хэрэг болдог. Тийм учраас нэгэн оюутнаас нөгөө нэг оюутандаа{" "}
            <Text display={"inline"} color="gray.500">
              {" "}
              ❤️
            </Text>{" "}
            шингээн бүтээв.
          </Text>
          <Text mb={6}>
            Зарим хүмүүс буруу зүйлыг хөхиүлэн{" "}
            <Text display={"inline"} color="gray.500">
              {" "}
              :))
            </Text>{" "}
            дэмжсэн гэж магадгүй л дээ гэхдээ угаасаа надтай надгүй даалгавраа
            солилцдог учраас үүнийг зогсоох бараг л боломжгүй боловуу.
          </Text>
          <Text mb={6}>
            Гол нь даалгавраа ойлгоод аваарай 4.0 сураарай. Амжилт.{" "}
            <Text display={"inline"} color="gray.500">
              {" "}
              Өнцөг бүгэс.
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

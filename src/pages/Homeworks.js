import { Container, Text, Box, Divider, Link } from "@chakra-ui/react";
import React from "react";
import { Layout } from "../components/Layout";
import { useState, useEffect } from "react";
import { FaUnlock } from "react-icons/fa";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { db } from "../utils/init-firebase";
import { useAuth } from "../contexts/AuthContext";
import { query, onSnapshot, doc } from "firebase/firestore";

export default function Homeworks() {
  const { currentUser } = useAuth();

  const [additionalInfo, setAdditionalInfo] = useState();
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let myquery = useQuery();
  const [Payment, Setpayment] = useState(false);
  var UniqueNum = myquery.get("uniqueid");
  var incomingType = myquery.get("type");

  useEffect(() => {
    const q4 = query(doc(db, "num", "ready", "freeclass", `${UniqueNum}`));
    const unsub4 = onSnapshot(q4, (doc) => {
      setAdditionalInfo(doc.data());
    });
    return unsub4;
  }, [currentUser?.email]);

  let buttonShow = true;

  if (additionalInfo?.processingPerson != null) buttonShow = false;
  return (
    <Layout>
      <Container maxW="container.md" py={3}>
        <Box display={"flex"} alignItems="center">
          <Text
            fontWeight={"black"}
            fontFamily={"heading"}
            textTransform={"uppercase"}
            fontSize={"3xl"}
          >
            {additionalInfo?.title}
          </Text>
        </Box>
        <Box display={"flex"} flexDir="column">
          <Text fontWeight={"bold"}>
            Гүйцэтгэгч :{" "}
            <Text color={"pink.400"} display={"inline"}>
              {additionalInfo?.ownerName ?? "Одоохондоо алга"}
            </Text>
          </Text>
          <Text fontWeight={"bold"}>
            Гүйцэтгэл :{" "}
            <Text color={"pink.400"} display={"inline"}>
              Бэлэн
            </Text>
          </Text>
          <Text fontWeight={"bold"}>
            Төлбөр: {additionalInfo?.isPaid ? "Төлбөртэй" : "Үнэгүй"}
          </Text>

          <Text fontWeight={"bold"}>
            Хичээлийн нэр : {additionalInfo?.class}
          </Text>

          <Divider my={"3"} />
          <Text>{additionalInfo?.additionalInfo}</Text>

          <Divider my={"3"} />
          {
            <Text
              fontFamily={"heading"}
              fontSize={"2xl"}
              textTransform={"uppercase"}
              my={"2"}
              fontWeight={"black"}
              display="inline-flex"
              alignItems={"center"}
            >
              <Box mr={"2"} display={"inline"}>
                {<FaUnlock />}
              </Box>
              Даалгаврын{" "}
              <Text ml={"2"} color={"pink.400"}>
                хариу
              </Text>
            </Text>
          }
          {additionalInfo?.isPaid || (
            <Box>
              <Text>{additionalInfo?.privateInfo}</Text>
              <Text as={"u"} _hover={{ color: "blue" }}>
                <Link href={additionalInfo?.privateLink} isExternal>
                  LINK : {additionalInfo?.privateLink}
                </Link>
              </Text>
            </Box>
          )}
          {/* <FaExternalLinkAlt /> */}
          {/* {buttonShow && !(currentUser?.email == additionalInfo?.ownerMail) && (
            <Button onClick={sendReadyData}>Энэ даалгаврыг хийх</Button>
          )} */}
          {/* {currentUser?.email == additionalInfo?.processingPerson && (
            <Button onClick={onOpen}>Даалгаврыг илгээх</Button>
          )} */}
        </Box>
      </Container>
    </Layout>
  );
}

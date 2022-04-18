import {
  Container,
  Heading,
  Text,
  Box,
  Spacer,
  Button,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { Layout } from "../components/Layout";
import { useState, useEffect } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  useHistory,
} from "react-router-dom";
import { db } from "../utils/init-firebase";
import { useAuth } from "../contexts/AuthContext";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
  arrayUnion,
  setDoc,
} from "firebase/firestore";

export default function HomworkOrder() {
  const history = useHistory();
  const { currentUser } = useAuth();
  const toast = useToast();
  const showToast = () => {
    toast({
      title: "Амжилттай",
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "left-accent",
      position: "top-right",
    });
  };
  const [additionalInfo, setAdditionalInfo] = useState();
  console.log(additionalInfo);
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let myquery = useQuery();
  const [Payment, Setpayment] = useState(false);
  var UniqueNum = myquery.get("uniqueid");

  useEffect(() => {
    const q3 = query(doc(db, "num", "numedu", "Orders", `${UniqueNum}`));
    const unsub3 = onSnapshot(q3, (doc) => {
      setAdditionalInfo(doc.data());
    });
    return unsub3;
  }, []);
  const sendReadyData = () => {
    updateDoc(doc(db, "num", "numedu", "Orders", `${UniqueNum}`), {
      processingPerson: currentUser?.email,
      processingPersonProfile: currentUser?.photoURL,
    });
    // onNewClassClose();
    showToast();
    history.push("/profile");
  };
  let buttonShow = true;

  if (additionalInfo?.processingPerson != null) buttonShow = false;
  return (
    <Layout>
      <Container maxW="container.md" py={3}>
        <Box display={"flex"} alignItems="center">
          <Text
            fontWeight={"black"}
            textTransform={"uppercase"}
            fontSize={"3xl"}
          >
            {additionalInfo?.title}
          </Text>
          <Spacer mr={"5"} />
          <Text>{additionalInfo?.lastestDate}</Text>
          <Spacer />
        </Box>
        <Text>{additionalInfo?.additionalInfo}</Text>

        <Text as={"u"} _hover={{ color: "blue" }}>
          <Link href="https://chakra-ui.com" target="_blank">
            Link: Chakra Design system{" "}
          </Link>
        </Text>
        {/* <FaExternalLinkAlt /> */}
        {buttonShow && (
          <Button onClick={sendReadyData}>Энэ даалгаврыг хийх</Button>
        )}
      </Container>
      <Box>{Payment && <Box>end link baina</Box>}</Box>
    </Layout>
  );
}

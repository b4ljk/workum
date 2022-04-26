import { useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage, db } from "../utils/init-firebase";
import {
  Box,
  Button,
  chakra,
  Container,
  Link,
  Stack,
  Input,
  Text,
  useColorModeValue,
  VisuallyHidden,
  Progress,
  useToast,
  Divider,
} from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import { FaFileUpload, FaCloudUploadAlt } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { Tooltip } from "@chakra-ui/react";
export default function FilesUploader({ UniqueNum, additionalInfo }) {
  const toast = useToast();
  const showToast = () => {
    toast({
      title: "Амжилттай илгээгдлээ",
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "left-accent",
      position: "bottom",
    });
  };
  const errorToast = () => {
    toast({
      title: "Алдаа файлын хэмжээ хэтэрхий том байна",
      status: "error",
      duration: 3000,
      isClosable: true,
      variant: "left-accent",
      position: "bottom",
    });
  };
  const [progress, setProgress] = useState(0);
  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  const uploadFiles = (file) => {
    //
    if (!file) return;
    const sotrageRef = ref(
      storage,
      `${additionalInfo?.ownerMail}/${file.name}`
    );
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => {
        console.log(error);
        errorToast();
        setProgress(0);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          showToast();
          console.log("File available at", downloadURL);
          updateDoc(doc(db, "num", "numedu", "Private", `${UniqueNum}`), {
            url: downloadURL,
          });
          updateDoc(doc(db, "num", "Processing", "foradmin", `${UniqueNum}`), {
            url: downloadURL,
          });
          updateDoc(
            doc(
              db,
              "num",
              "Processing",
              additionalInfo?.processingPerson,
              `${UniqueNum}`
            ),
            {
              isDone: true,
            }
          );
          updateDoc(
            doc(
              db,
              "num",
              "Waiting",
              additionalInfo?.ownerMail,
              `${UniqueNum}`
            ),
            {
              isDone: true,
            }
          );
          updateDoc(doc(db, "num", "Processing", "foradmin", `${UniqueNum}`), {
            isDone: true,
          });
        });
      }
    );
  };

  return (
    <div className="App">
      <form id="idiot" onSubmit={formHandler}>
        <Box display={"flex"} flexDir={{ md: "row", base: "column" }}>
          <Input mr={"1"} mb="1" flex={"1"} type="file" />
          <Tooltip label="3MB хүртэл хэмжээтэй зөвхөн нэг файл оруулна уу!">
            <Button type="submit">
              Оруулсан файл-г илгээх
              <Box ml={"2"}>
                <FaCloudUploadAlt size={"20"} />
              </Box>
            </Button>
          </Tooltip>
        </Box>
        <Progress
          borderRadius={"3"}
          colorScheme="pink"
          hasStripe
          size={"xs"}
          value={progress}
        />
        <Divider variant={"red"} my={"2"} />
      </form>
    </div>
  );
}

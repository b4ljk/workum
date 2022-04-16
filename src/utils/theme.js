import { extendTheme } from "@chakra-ui/react";
import "@fontsource/fanwood-text";
import "@fontsource/roboto";
import "@fontsource/rubik";
const CustomTheme = extendTheme({
  fonts: {
    heading: "Rubik",
    body: "roboto",
  },
});

export default CustomTheme;

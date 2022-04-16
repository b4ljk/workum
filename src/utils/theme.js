import { extendTheme } from "@chakra-ui/react";
import "@fontsource/fanwood-text";
import "@fontsource/rubik/300.css";
import "@fontsource/rubik/400.css";
import "@fontsource/rubik/500.css";
import "@fontsource/rubik/600.css";
import "@fontsource/rubik/700.css";
import "@fontsource/rubik/800.css";

import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";
const CustomTheme = extendTheme({
  colors: {
    secondary: "#94dee2",
  },
  fonts: {
    heading: "Rubik",
    body: "roboto",
  },
});

export default CustomTheme;

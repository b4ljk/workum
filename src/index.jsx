import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import CustomTheme from "./utils/theme";
// import "@fontsource/Roboto/300.css";
// import "@fontsource/Roboto/400.css";
// import "@fontsource/Roboto/500.css";
// import "@fontsource/Roboto/600.css";
// import "@fontsource/Roboto/700.css";
// import "@fontsource/Roboto/800.css";
// import "@fontsource/Roboto/900.css";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={CustomTheme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

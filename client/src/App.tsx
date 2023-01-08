import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Display } from "./signalK/Display";
import theme from "./theme";

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Display />
    </ChakraProvider>
  );
};

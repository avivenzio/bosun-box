import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { DataPanel } from "./signalK/DataPanel";
import theme from "./theme";

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <DataPanel />
    </ChakraProvider>
  );
};

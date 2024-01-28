import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React, { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme/theme";

export const UIProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => <ChakraProvider theme={theme}>{children}</ChakraProvider>;

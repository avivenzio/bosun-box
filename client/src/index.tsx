import { ColorModeScript } from "@chakra-ui/react";
import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import theme from "./theme/theme";

const container = document.getElementById("app-root")!;
const root = createRoot(container);
root.render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </>
);

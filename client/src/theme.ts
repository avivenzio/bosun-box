// theme.ts

// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { statTheme } from "./components/stat";

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

// 3. extend the theme
const theme = extendTheme({
  config,
  components: { Stat: statTheme },
  fonts: {
    heading: "'Roboto Mono', monospace",
    body: "'Roboto Mono', monospace",
  },
});

export default theme;

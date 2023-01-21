import { statAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(statAnatomy.keys);

export const statTheme = defineMultiStyleConfig({
  sizes: {
    // define the styles for this size variant
    xl: definePartsStyle({
      label: { fontSize: "3xl" },
      helpText: { fontSize: "3xl" },
      number: { fontSize: "6xl" },
    }),
    full: definePartsStyle({
      label: { fontSize: "7xl" },
      helpText: { fontSize: "7xl" },
      number: { fontSize: "12rem" },
    }),
  },
});

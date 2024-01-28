import React from "react";
import { Box, Switch, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isChecked = colorMode === "dark";
  return (
    <Box display="flex" gap="2" alignItems="center">
      <SunIcon boxSize={5} />
      <Switch
        size="lg"
        isChecked={isChecked}
        onChange={() => toggleColorMode()}
      />
      <MoonIcon boxSize={5} />
    </Box>
  );
};

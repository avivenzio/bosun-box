import React from "react";
import { Box, Switch, FormControl, FormLabel } from "@chakra-ui/react";
import { appWindow } from "@tauri-apps/api/window";

// not really a desired feature but want an easy escape hatch
// to go back to desktop
export const FullscreenToggle = () => {
  const [isFullscreen, setIsFullScreen] = React.useState();

  React.useEffect(() => {
    const getFullScreen = async () => {
      const fullscreen = await appWindow.isFullscreen();
      setIsFullScreen(fullscreen);
    };
    getFullScreen();
  }, [setIsFullScreen]);

  const handleToggle = async () => {
    await appWindow.setFullscreen(!isFullscreen);
    const fullscreen = await appWindow.isFullscreen();
    setIsFullScreen(fullscreen);
  };

  return (
    <Box>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="fullscreen-toggle" mb="0">
          Fullscreen
        </FormLabel>
        <Switch
          id="fullscreen-toggle"
          size="lg"
          isChecked={isFullscreen}
          onChange={handleToggle}
        />
      </FormControl>
    </Box>
  );
};

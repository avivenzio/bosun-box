import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import React from "react";
import { BrightnessSlider } from "./BrightnessSlider";
import { ShutdownButton } from "./ShutdownButton";
import { ColorModeToggle } from "./ColorModeToggle";

export const SettingsDrawerContainer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box borderStyle="solid" borderWidth="1px" padding="8px" borderRadius="lg">
      <IconButton
        aria-label="menu"
        size="lg"
        icon={<SettingsIcon />}
        onClick={onOpen}
      />
      <SettingsDrawer isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

const SettingsDrawer = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer isOpen={isOpen} placement="bottom" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton size="lg" />
        <DrawerHeader>Settings</DrawerHeader>

        <DrawerBody>
          <BrightnessSlider />
        </DrawerBody>

        <DrawerFooter display="flex" justifyContent="space-between">
          <ColorModeToggle />
          <ShutdownButton />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

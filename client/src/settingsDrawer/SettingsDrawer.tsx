import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, MoonIcon } from "@chakra-ui/icons";
import React from "react";
import { BrightnessSlider } from "./BrightnessSlider";

export const SettingsDrawerContainer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <IconButton
        aria-label="menu"
        size="lg"
        icon={<HamburgerIcon />}
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

        <DrawerFooter>
          <Button
            leftIcon={<MoonIcon />}
            colorScheme="red"
            size="lg"
            variant="solid"
          >
            Shutdown
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

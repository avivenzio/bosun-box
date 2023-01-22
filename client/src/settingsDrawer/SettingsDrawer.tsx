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
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, MoonIcon } from "@chakra-ui/icons";
import React from "react";
import { BrightnessSlider } from "./BrightnessSlider";
import { useShutdown } from "../hooks/useShutdown";

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
  const { mutate } = useShutdown();

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
            onClick={() => mutate()}
          >
            Shutdown
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

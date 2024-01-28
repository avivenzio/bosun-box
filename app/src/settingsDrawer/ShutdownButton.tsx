import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { MoonIcon } from "@chakra-ui/icons";
import React from "react";
import { useShutdown } from "../hooks/useShutdown";

export const ShutdownButton = () => {
  const { mutate, isLoading } = useShutdown();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button
        leftIcon={<MoonIcon />}
        colorScheme="red"
        size="lg"
        variant="solid"
        onClick={onOpen}
      >
        Shutdown
      </Button>

      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
        closeOnOverlayClick={false}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Shutdown?
            </AlertDialogHeader>

            <AlertDialogBody display="flex" justifyContent="center">
              {isLoading ? <Spinner size="xl" /> : null}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                size="lg"
                disabled={isLoading}
                ref={cancelRef}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                size="lg"
                disabled={isLoading}
                leftIcon={<MoonIcon />}
                colorScheme="red"
                onClick={() => mutate()}
                ml={3}
              >
                Shutdown
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

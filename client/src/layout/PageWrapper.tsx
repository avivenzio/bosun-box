import { Box, BoxProps } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { SettingsDrawerContainer } from "../settingsDrawer/SettingsDrawer";

export const PageWrapper = ({
  children,
  ...boxprops
}: {
  children: ReactNode | ReactNode[];
} & BoxProps) => {
  return (
    <Box display="flex" padding="10px" flexDirection="column" {...boxprops}>
      {children}
    </Box>
  );
};

export const PageWrapperWithSettingsDrawer = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  return (
    <PageWrapper gap={1}>
      <Box>{children}</Box>
      <Box>
        <SettingsDrawerContainer />
      </Box>
    </PageWrapper>
  );
};

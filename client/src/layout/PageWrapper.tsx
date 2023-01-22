import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { SettingsDrawerContainer } from "../settingsDrawer/SettingsDrawer";

export const PageWrapper = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  return (
    <Box display="flex" padding="10px" flexDirection="column">
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
    <PageWrapper>
      <Box>{children}</Box>
      <Box>
        <SettingsDrawerContainer />
      </Box>
    </PageWrapper>
  );
};

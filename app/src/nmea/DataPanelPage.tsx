import React from "react";
import { PageWrapperWithSettingsDrawer } from "../layout/PageWrapper";
import { DataPanel } from "./DataPanel";

export const DataPanelPage = () => {
  return (
    <PageWrapperWithSettingsDrawer>
      <DataPanel />
    </PageWrapperWithSettingsDrawer>
  );
};

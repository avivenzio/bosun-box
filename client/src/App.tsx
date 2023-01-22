import React from "react";
import { QueryProvider } from "./providers/QueryProvider";
import { UIProvider } from "./providers/UIProvider";
import { DataPanelPage } from "./signalK/DataPanelPage";

export const App = () => {
  return (
    <UIProvider>
      <QueryProvider>
        <DataPanelPage />
      </QueryProvider>
    </UIProvider>
  );
};

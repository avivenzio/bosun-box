import React from "react";
import { DataPanel } from "./signalK/DataPanel";
import { QueryProvider } from "./providers/QueryProvider";
import { UIProvider } from "./providers/UIProvider";

export const App = () => {
  return (
    <UIProvider>
      <QueryProvider>
        <DataPanel />
      </QueryProvider>
    </UIProvider>
  );
};

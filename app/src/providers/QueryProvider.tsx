import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export const QueryProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

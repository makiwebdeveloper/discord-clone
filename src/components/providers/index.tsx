"use client";

import { SessionProvider } from "next-auth/react";
import ModalsProvider from "./modals-provider";

interface Props {
  children: React.ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <ModalsProvider />
      {children}
    </SessionProvider>
  );
}

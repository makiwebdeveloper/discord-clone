"use client";

import { useEffect, useState } from "react";
import CreateServerModal from "@/components/modals/create-server-modal";

export default function ModalsProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServerModal />
    </>
  );
}
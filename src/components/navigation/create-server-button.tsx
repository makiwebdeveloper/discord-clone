"use client";

import { useModal } from "@/hooks/use-modal-store";
import { PlusIcon } from "lucide-react";

export default function CreateServerButton() {
  const { onOpen } = useModal();

  return (
    <button
      onClick={() => onOpen("createServer")}
      className="w-12 h-12 sm:w-14 sm:h-14 mx-auto bg-zinc-800 rounded-3xl center transition-all duration-500 hover:bg-green-600 hover:rounded-2xl group cursor-pointer"
    >
      <PlusIcon className="text-green-600 transition duration-500 group-hover:text-white" />
    </button>
  );
}

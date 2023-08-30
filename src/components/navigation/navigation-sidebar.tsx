"use client";

import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import CreateServerButton from "./create-server-button";
import NavigationItem from "./navigation-item";

export default function Servers() {
  return (
    <ScrollArea className="w-24 pb-3">
      <div className="space-y-3">
        <div className="w-14 h-14 mx-auto bg-blue-600 rounded-2xl center">
          <Image
            src="/images/discord-icon.png"
            alt="discord icon"
            width={30}
            height={30}
          />
        </div>
        <Separator className="h-[3px] rounded-full w-2/4 mx-auto bg-zinc-600" />
        <CreateServerButton />
        {new Array(5).fill(0).map((item, index) => (
          <NavigationItem key={index} />
        ))}
      </div>
    </ScrollArea>
  );
}

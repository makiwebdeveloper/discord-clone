"use client";

import { cn } from "@/lib/utils";
import { Server } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Props {
  server: Server;
}

export default function NavigationItem({ server }: Props) {
  const params = useParams();

  const isSelectedServer = params?.serverId === server.id;

  return (
    <div className="relative flex justify-center w-full transition-all group">
      <div
        className={cn(
          "absolute w-[0] group-hover:w-1 h-4 transition-all bg-white rounded-r-full left-0 top-[50%] translate-y-[-50%]",
          isSelectedServer && "w-1 h-8"
        )}
      />
      {server.image ? (
        <Link
          href={`/servers/${server.id}`}
          className="relative w-12 h-12 sm:w-14 sm:h-14 transition-all duration-300"
        >
          <Image
            src={server.image}
            alt="server image"
            fill
            className={cn(
              "object-cover rounded-3xl transition-all duration-300 hover:rounded-2xl cursor-pointer",
              isSelectedServer && "rounded-2xl"
            )}
          />
        </Link>
      ) : (
        <div
          className={cn(
            "w-12 h-12 sm:w-14 sm:h-14 center truncate bg-zinc-800 rounded-3xl transition-all duration-300 hover:rounded-2xl cursor-pointer",
            params?.serverId && "rounded-2xl"
          )}
        >
          <p className="w-10 truncate text-xs">{server.name}</p>
        </div>
      )}
    </div>
  );
}

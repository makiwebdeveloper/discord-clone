"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavigationMeItem() {
  const pathname = usePathname();

  const isSelectedPath = pathname === "/";

  return (
    <div className="relative flex justify-center w-full transition-all group">
      <div
        className={cn(
          "absolute w-[0] group-hover:w-1 h-4 transition-all bg-white rounded-r-full left-0 top-[50%] translate-y-[-50%]",
          isSelectedPath && "w-1 h-8"
        )}
      />

      <Link
        href="/"
        className={cn(
          "w-12 h-12 sm:w-14 sm:h-14 mx-auto center bg-zinc-800 rounded-3xl transition-all duration-300 hover:rounded-2xl cursor-pointer",
          isSelectedPath && "bg-blue-500 rounded-2xl"
        )}
      >
        <Image
          src="/images/discord-icon.png"
          alt="discord icon"
          width={30}
          height={30}
        />
      </Link>
    </div>
  );
}

import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "./ui/avatar";
import { UserIcon } from "lucide-react";

interface Props {
  src?: string | null;
  className?: string;
}

export default function UserAvatar({ src, className }: Props) {
  return (
    <Avatar
      className={cn("w-8 h-8 md:w-10 md:h-10 center bg-zinc-600", className)}
    >
      {src ? <AvatarImage src={src} /> : <UserIcon className="w-6 h-6" />}
    </Avatar>
  );
}

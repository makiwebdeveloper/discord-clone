"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MemberRole } from "@prisma/client";
import { IFullServer } from "@/types/servers.interface";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface Props {
  server: IFullServer;
  role: MemberRole;
}

export default function ServerHeader({ server, role }: Props) {
  const { onOpen } = useModal();

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = role === MemberRole.MODERATOR || isAdmin;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-full font-semibold py-2 px-4 border-b-2 border-zinc-900 flex items-center justify-between">
          <span className="truncate">{server.name}</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[210px] font-semibold">
        <DropdownMenuItem
          className="text-blue-500 focus:text-blue-500"
          onClick={() => onOpen("invite", { server })}
        >
          Invite friends <UserPlus className="w-4 h-4 ml-auto" />
        </DropdownMenuItem>
        {isAdmin && (
          <DropdownMenuItem>
            Manage members <Users className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem>
            Create channel <PlusCircle className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem onClick={() => onOpen("editServer", { server })}>
            Settings <Settings className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        {isAdmin && (
          <DropdownMenuItem className="text-red-500 focus:text-red-500">
            Delete server <Trash className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem className="text-red-500 focus:text-red-500">
            Leave server <LogOut className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

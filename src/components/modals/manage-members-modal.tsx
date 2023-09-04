"use client";

import qs from "query-string";
import axios from "axios";
import { useModal } from "@/hooks/use-modal-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserAvatar from "@/components/user-avatar";
import {
  Check,
  Gavel,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MemberRole } from "@prisma/client";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const roleIcons = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="w-4 h-4 text-blue-500" />,
  ADMIN: <ShieldAlert className="w-4 h-4 text-red-500" />,
};

export default function ManageMembersModal() {
  const { isOpen, onClose, type, data, onOpen } = useModal();
  const { toast } = useToast();
  const router = useRouter();

  const isModalOpen = isOpen && type === "manageMembers";
  if (!isModalOpen) {
    return null;
  }

  const { server } = data;

  async function kickHandler(memberId: string) {
    try {
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        },
      });

      const res = await axios.delete(url);

      toast({
        title: "Success",
        description: "Successfully kicked member",
        variant: "success",
      });

      router.refresh();
      onOpen("manageMembers", { server: res.data.server });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to kick member",
        variant: "destructive",
      });
    }
  }

  async function changeRole(memberId: string, role: MemberRole) {
    try {
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          role,
          serverId: server?.id,
        },
      });

      const res = await axios.patch(url);

      toast({
        title: "Success",
        description: "Successfully changed role",
        variant: "success",
      });

      router.refresh();
      onOpen("manageMembers", { server: res.data.server });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to change role",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="modal-title">Manage members</DialogTitle>
          <DialogDescription className="modal-description">
            Kick or manage role members of this server
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[420px]">
          <div className="space-y-5">
            {server?.members.map((member) => (
              <div key={member.id} className="flex items-center">
                <div key={member.id} className="flex items-start gap-2">
                  <UserAvatar src={member.user.image} />
                  <div className="flex flex-col justify-between">
                    <p className="text-sm flex items-center gap-2 truncate">
                      {member.user.name} {roleIcons[member.role]}
                    </p>
                    <p className="text-zinc-400 text-xs truncate">
                      {`@${member.user.username}`}
                    </p>
                  </div>
                </div>
                <div className="ml-auto">
                  {member.role !== MemberRole.ADMIN && (
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className="w-4 h-4 text-zinc-400" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="left">
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>
                            <ShieldQuestion className="w-4 h-4 mr-2" /> Role
                          </DropdownMenuSubTrigger>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem
                              className="flex items-center justify-between gap-2"
                              onClick={() =>
                                changeRole(member.id, MemberRole.GUEST)
                              }
                            >
                              <span className="flex items-center">
                                <Shield className="w-4 h-4 mr-2" /> Guest
                              </span>
                              {member.role === MemberRole.GUEST && (
                                <Check className="w-4 h-4" />
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="flex items-center justify-between gap-2"
                              onClick={() =>
                                changeRole(member.id, MemberRole.MODERATOR)
                              }
                            >
                              <span className="flex items-center">
                                <ShieldCheck className="w-4 h-4 mr-2" />{" "}
                                Moderator
                              </span>
                              {member.role === MemberRole.MODERATOR && (
                                <Check className="w-4 h-4" />
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => kickHandler(member.id)}
                        >
                          <Gavel className="w-4 h-4 mr-2" /> Kick
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

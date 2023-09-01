"use client";

import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal-store";
import { useOrigin } from "@/hooks/use-origin";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

export default function InviteForm() {
  const origin = useOrigin();
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const { data, onOpen } = useModal();

  const inviteLink = `${origin}/invite/${data.server?.inviteCode}`;

  function copyLink() {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
  }

  const { mutate: generateNewInviteCode, isLoading } = useMutation({
    mutationFn: async () => {
      const res = await axios.patch(
        `/api/servers/${data.server?.id}/invite-code`
      );
      return res.data;
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to regenerate invite code",
        variant: "destructive",
      });
    },
    onSuccess: (res) => {
      onOpen("invite", {
        server: res.server,
      });
      toast({
        title: "Success",
        description: "Successfully regenerated invite code",
        variant: "success",
      });
    },
  });

  return (
    <div>
      <div className="space-y-1">
        <p className="uppercase text-xs font-bold text-zinc-400">INVITE CODE</p>
        <div className="flex gap-2">
          <Input
            disabled={isLoading}
            className="bg-zinc-700"
            value={inviteLink}
            onChange={() => {}}
          />
          <Button disabled={isLoading} onClick={copyLink}>
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
      <Button
        disabled={isLoading}
        variant="link"
        className="p-0 mt-5 flex gap-2 text-zinc-400"
        size="sm"
        onClick={() => generateNewInviteCode()}
      >
        Regenerate invite code <RefreshCw className="w-4 h-4" />
      </Button>
    </div>
  );
}

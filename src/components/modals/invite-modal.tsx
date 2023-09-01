"use client";

import { useModal } from "@/hooks/use-modal-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import InviteForm from "@/components/forms/invite-form";

export default function InviteModal() {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "invite";

  return (
    <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="modal-title">Invite your friends</DialogTitle>
          <DialogDescription className="modal-description">
            Copy and share the link so that the user can access this server
          </DialogDescription>
        </DialogHeader>
        <InviteForm />
      </DialogContent>
    </Dialog>
  );
}

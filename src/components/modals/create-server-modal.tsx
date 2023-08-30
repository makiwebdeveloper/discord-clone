"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import CreateServerForm from "../forms/create-server-form";

export default function CreateServerModal() {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "createServer";

  return (
    <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="modal-title">Create your server</DialogTitle>
          <DialogDescription className="modal-description">
            Your server is where you hang out with your friends. Create a server
            and start chatting
          </DialogDescription>
        </DialogHeader>
        <CreateServerForm />
      </DialogContent>
    </Dialog>
  );
}

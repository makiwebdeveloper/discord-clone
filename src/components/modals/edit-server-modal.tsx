"use client";

import { useModal } from "@/hooks/use-modal-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import EditServerForm from "@/components/forms/edit-server-form";

export default function EditServerModal() {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "editServer";

  return (
    <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="modal-title">Edit your server</DialogTitle>
          <DialogDescription className="modal-description">
            You can change your image and server name
          </DialogDescription>
        </DialogHeader>
        <EditServerForm />
      </DialogContent>
    </Dialog>
  );
}

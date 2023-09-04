"use client";

import { useModal } from "@/hooks/use-modal-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function DeleteServerModal() {
  const { isOpen, onClose, data, type } = useModal();
  const { toast } = useToast();
  const router = useRouter();

  const isModalOpen = isOpen && type === "deleteServer";
  if (!isModalOpen) {
    return null;
  }

  const { server } = data;

  async function deleteServer() {
    try {
      await axios.delete(`/api/servers/${server?.id}`);

      toast({
        title: "Success",
        description: "Successfully deleted server",
        variant: "success",
      });

      router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to delete server",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="modal-title">Delete this server</DialogTitle>
          <DialogDescription className="modal-description">
            Are you sure you want to do this? <br />
            <span className="text-blue-500 font-semibold">
              {server?.name}
            </span>{" "}
            will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-between items-center">
          <Button
            variant="secondary"
            className="hover:text-zinc-400"
            onClick={() => onClose()}
          >
            Cancel
          </Button>
          <Button variant="outline" onClick={deleteServer}>
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

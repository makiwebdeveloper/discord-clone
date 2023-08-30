"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useModal } from "@/hooks/use-modal-store";
import {
  CreateServerValidatorType,
  createServerValidator,
} from "@/lib/validators/servers";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FileUploader from "@/components/file-uploader";

export default function CreateServerForm() {
  const router = useRouter();
  const { toast } = useToast();
  const { onClose } = useModal();

  const form = useForm<CreateServerValidatorType>({
    resolver: zodResolver(createServerValidator),
    defaultValues: {
      name: "",
      image: "",
    },
  });

  async function onSubmit(values: CreateServerValidatorType) {
    try {
      await axios.post("/api/servers", values);
      toast({
        title: "Success",
        description: "Server created successfully",
        variant: "success",
      });
      router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Failed to create server",
        variant: "destructive",
      });
    }
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-5 px-6">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="">
                <FormControl>
                  <FileUploader
                    endpoint="serverImage"
                    value={field.value}
                    onChange={field.onChange}
                    className="mx-auto"
                  />
                </FormControl>
                <FormMessage className="" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="uppercase text-xs font-bold text-zinc-400">
                  Server name
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-zinc-700"
                    placeholder="Enter server name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full">Create server</Button>
        </div>
      </form>
    </Form>
  );
}

"use client";

import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterValidatorType,
  registerValidator,
} from "@/lib/validators/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GoogleButton from "../google-button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function RegisterForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<RegisterValidatorType>({
    resolver: zodResolver(registerValidator),
    defaultValues: {
      username: "",
      password: "",
      name: "",
    },
  });

  async function onSubmit(data: RegisterValidatorType) {
    try {
      await axios.post("/api/auth/register", data);
      router.push("/login");
    } catch (err) {
      const error = err as AxiosError;
      if (error.response?.status === 400) {
        toast({
          title: "User with this username already exists",
          description: "Enter another username",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Auth error",
          description: "Something went wrong! Try again",
          variant: "destructive",
        });
      }
    }

    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Username <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>
                Password <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="accent" className="w-full mt-5">
          Sign up
        </Button>
        <div className="relative my-5">
          <div className="h-[1px] w-full bg-zinc-500" />
          <p className="text-zinc-400 bg-background px-2 absolute left-[50%] translate-x-[-50%] translate-y-[-60%]">
            or
          </p>
        </div>
        <GoogleButton className="w-full" />
      </form>
    </Form>
  );
}

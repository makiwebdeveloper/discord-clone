"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginValidatorType, loginValidator } from "@/lib/validators/auth";
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
import GoogleButton from "./google-button";

export default function LoginForm() {
  const form = useForm<LoginValidatorType>({
    resolver: zodResolver(loginValidator),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginValidatorType) {}

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
          name="password"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>
                Password <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="accent" className="w-full mt-5">
          Log in
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

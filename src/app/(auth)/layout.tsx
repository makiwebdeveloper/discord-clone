import { getAuthSession } from "@/lib/nextauth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Auth | Discord",
  description: "",
};

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  if (session) {
    redirect("/");
  }

  return <>{children}</>;
}

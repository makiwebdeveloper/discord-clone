import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth | Discord",
  description: "",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="bg-auth h-screen bg-cover center">{children}</main>;
}

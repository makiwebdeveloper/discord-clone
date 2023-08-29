import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { Open_Sans } from "next/font/google";
import type { Metadata } from "next";
import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Discord",
  description:
    "Discord is the easiest way to talk over voice, video, and text.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(openSans.className)}>
        <Providers>
          <main className="bg-background-image h-screen bg-cover center">
            {children}
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}

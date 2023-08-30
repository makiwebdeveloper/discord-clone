import { getAuthSession } from "@/lib/nextauth";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

async function handleAuth() {
  const session = await getAuthSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  return { userId: session.user.id };
}

export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

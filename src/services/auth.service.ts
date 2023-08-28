import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { User } from "@prisma/client";

export async function getCurrentUser(): Promise<User | null> {
  const session = await getAuthSession();

  if (!session) return null;

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  return user;
}

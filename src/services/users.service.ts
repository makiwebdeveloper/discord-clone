import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";

export async function getCurrentUser() {
  const session = await getAuthSession();

  if (!session?.user) {
    return null;
  }

  return db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });
}

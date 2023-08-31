import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";

export async function getCurrentMember(serverId: string) {
  const session = await getAuthSession();

  if (!session?.user) {
    return null;
  }

  return db.member.findFirst({
    where: {
      userId: session.user.id,
      serverId,
    },
  });
}

import { db } from "@/lib/db";

export async function findServerById(serverId: string) {
  return db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      members: true,
    },
  });
}

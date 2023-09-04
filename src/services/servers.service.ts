import { db } from "@/lib/db";
import { IFullServer } from "@/types/servers.interface";
import { Server } from "@prisma/client";

export async function getServerById(serverId: string) {
  return db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      members: true,
    },
  });
}

export async function getFullServerById(
  serverId: string
): Promise<IFullServer | null> {
  return db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      owner: true,
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          user: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });
}

export async function getServersByUserId(userId: string): Promise<Server[]> {
  return db.server.findMany({
    where: {
      members: {
        some: {
          userId,
        },
      },
    },
  });
}

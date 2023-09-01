import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { getCurrentMember } from "@/services/members.service";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!params.serverId) {
      return NextResponse.json(
        { message: "Server ID Missing" },
        { status: 400 }
      );
    }

    const currentMember = await getCurrentMember(params.serverId);

    if (!currentMember) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (currentMember.role === MemberRole.GUEST) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const server = await db.server.update({
      where: {
        id: params.serverId,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });

    return NextResponse.json({ server }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}

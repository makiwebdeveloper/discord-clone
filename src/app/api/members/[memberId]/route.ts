import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { getCurrentMember } from "@/services/members.service";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { memberId: string } }
) {
  try {
    const session = await getAuthSession();

    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!serverId) {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }

    const currentMember = await getCurrentMember(serverId);

    if (currentMember?.role !== MemberRole.ADMIN) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        ownerId: session.user.id,
      },
      data: {
        members: {
          deleteMany: {
            id: params.memberId,
            userId: {
              not: session.user.id,
            },
          },
        },
      },
      include: {
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

    return NextResponse.json({ server }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { memberId: string } }
) {
  try {
    const session = await getAuthSession();

    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role") as MemberRole;
    const serverId = searchParams.get("serverId");

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!role || !serverId) {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        ownerId: session.user.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: params.memberId,
            },
            data: {
              role,
            },
          },
        },
      },
      include: {
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

    return NextResponse.json({ server }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}

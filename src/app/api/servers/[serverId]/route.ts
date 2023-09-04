import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { editServerValidator } from "@/lib/validators/servers";
import { getCurrentMember } from "@/services/members.service";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

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

    const body = await req.json();
    const { name, image } = editServerValidator.parse(body);

    await db.server.update({
      where: {
        id: params.serverId,
      },
      data: {
        name,
        image,
      },
    });

    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const currentMember = await getCurrentMember(params.serverId);

    if (!currentMember) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (currentMember.role !== MemberRole.ADMIN) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await db.server.delete({
      where: {
        id: params.serverId,
      },
    });

    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}

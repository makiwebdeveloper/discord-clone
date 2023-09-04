import { db } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { createServerValidator } from "@/lib/validators/servers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { MemberRole } from "@prisma/client";
import { getServersByUserId } from "@/services/servers.service";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, image } = createServerValidator.parse(body);

    await db.server.create({
      data: {
        name,
        image,
        inviteCode: uuidv4(),
        ownerId: session.user.id,
        channels: {
          create: [{ name: "general" }],
        },
        members: {
          create: [{ userId: session.user.id, role: MemberRole.ADMIN }],
        },
      },
    });

    return NextResponse.json("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    } else {
      return NextResponse.json({ message: "Internal error" }, { status: 500 });
    }
  }
}

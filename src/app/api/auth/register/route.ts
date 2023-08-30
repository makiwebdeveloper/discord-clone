import { z } from "zod";
import { NextResponse } from "next/server";
import { registerValidator } from "@/lib/validators/auth";
import { hash } from "argon2";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, name, password } = registerValidator.parse(body);

    const existUser = await db.user.findUnique({
      where: {
        username,
      },
    });

    if (existUser) {
      return NextResponse.json(
        {
          message: "User with this username already exists",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password);

    const user = await db.user.create({
      data: {
        username,
        name: name || username,
        hashedPassword,
      },
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    } else {
      return NextResponse.json({ message: "Internal error" }, { status: 500 });
    }
  }
}

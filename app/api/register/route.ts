import { createJWT, hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { serialize } from "cookie";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(body, "body");
  const user = await db.user.create({
    data: {
      email: body?.email,
      password: await hashPassword(body?.password),
      firstName: body?.firstName,
      lastName: body?.lastName,
    },
  });
  console.log(user, "user");
  const jwt = await createJWT(user);
  console.log(jwt, "jwt");

  return NextResponse.json(
    { data: "hello world" },
    {
      status: 201,
      headers: {
        "Set-Cookie": serialize(process.env.COOKIE_NAME as string, jwt, {
          httpOnly: true,
          path: "/",
          maxAge: 7 * 24 * 60 * 60,
        }),
      },
    }
  );
}

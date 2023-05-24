import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { comparePasswords, createJWT, hashPassword } from "@/lib/auth";
import { serialize } from "cookie";

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body, "body");

  const user = await db.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    console.log("user ni milla");

    return NextResponse.json({}, { status: 401 });
  }
  console.log(user, "user");

  const isUser = await comparePasswords(body.password, user?.password || "");
  if (!isUser) {
    console.log("password galat ha");
    console.log(await hashPassword("password"));

    return NextResponse.json({}, { status: 401 });
  }

  const jwt = await createJWT(user);
  console.log(jwt, "jwt");

  return NextResponse.json(
    {},
    {
      status: 200,
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

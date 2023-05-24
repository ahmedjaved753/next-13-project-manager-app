import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { validateJWT } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();
  const user = await validateJWT(
    cookies().get(process.env.COOKIE_NAME as string)?.value
  );
  await db.project.create({
    data: {
      name: body.name,
      ownerId: user.id,
    },
  });
  return NextResponse.json({}, { status: 200 });
}

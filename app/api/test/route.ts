import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body, "body");

  return NextResponse.json({ data: body }, { status: 200 });
}

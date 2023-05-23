import { NextResponse } from "next/server";

export function POST() {
  console.log("aaja");

  return NextResponse.json({ data: "hi data" }, { status: 200 });
}

export function GET() {
  return NextResponse.json({ data: "hi data get" }, { status: 200 });
}

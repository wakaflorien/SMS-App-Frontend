import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const response = await fetch(
    `${process.env.HOST}/messages`
  );
  const result = await response.json();
  return NextResponse.json({ ...result }, { status: response.status });
}

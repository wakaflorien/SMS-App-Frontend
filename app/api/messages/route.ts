import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const schoolId = request.headers.get("schoolId");
  const response = await fetch(
    `${process.env.HOST}/messages`
  );
  const result = await response.json();
  console.log(result);
  return NextResponse.json({ ...result }, { status: response.status });
}

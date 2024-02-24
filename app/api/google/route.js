import { googleSignInAndSignup } from "@/utils/mongo/users";
import { NextResponse } from "next/server";

export async function POST(NextRequest){
  try {
    const { uid,email,lastname,firstname } = await NextRequest.json();
    const userResult = await googleSignInAndSignup(email,lastname,firstname,uid);
    return NextResponse.json({user:userResult})
  } catch (error) {
    console.log(error);
    return NextResponse.json(error,{status:500});
  }
}
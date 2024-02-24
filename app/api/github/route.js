import { githubSignInAndSignup } from "@/utils/mongo/users";
import { NextResponse } from "next/server";

export async function POST(NextRequest){
  try {
    const { uid,email,lastname,firstname } = await NextRequest.json();
    const UserResult = await githubSignInAndSignup(email,lastname,firstname,uid);
    return NextResponse.json({user:UserResult,token})
  } catch (error) {
    console.log(error);
    return NextResponse.json(error,{status:500});
  }
}
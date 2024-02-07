import { createUserWithEmailAndPassword } from "firebase/auth";
import { createUser } from "@/utils/mongo/users";
import { NextResponse } from "next/server";
import { auth } from "../firebase";


export async function POST(NextRequest) {
    const { email, password,lastname,firstname } = await NextRequest.json();
    try {
      const authResult = await createUserWithEmailAndPassword(auth, email, password);

      const result = await createUser(authResult.user.email, password,lastname,firstname, authResult.user.uid);
      const { password: _, ...user } = result;
      return NextResponse.json({...user,token:authResult.user.accessToken},{status:201});
    } catch (error) {
      console.error(error);
      let errorMessage = "Internal Server Error";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Email address is already in use";
      }
      return NextResponse.json({error: errorMessage},{status:500});
    }
}

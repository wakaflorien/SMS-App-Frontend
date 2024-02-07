import { signInWithEmailAndPassword } from "firebase/auth";
import { signIn } from "@/utils/mongo/users";
import { NextResponse } from "next/server";
import { auth } from "../firebase";


export async function POST(NextRequest) {
    const { email, password } = await NextRequest.json();
    try {
      const authResult = await signInWithEmailAndPassword(auth, email, password);

      const result = await signIn(authResult.user.email, password);
      const { password: _, ...user } = result;
      return NextResponse.json({...user,token:authResult.user.accessToken},{status:200});
    } catch (error) {
      console.error(error);

    let errorMessage = "Internal Server Error";
    if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
      errorMessage = "Invalid email or password";
    }
      return NextResponse.json({error: errorMessage},{status:500});
    }
}

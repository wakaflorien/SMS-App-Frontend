"use client";
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Image from "next/image";
import googleLogo from "@/public/google.png";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { auth } from "@/app/api/firebase";
import axios from "axios";

export function GoogleSignInButton() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (!result) {
        return console.log("NO RESULT");
      }
      const token = result.user.accessToken;
      const name = result.user.displayName.split(" ");
      const data = {
        email: result.user.email,
        uid: result.user.uid,
        firstname: name[0],
        lastname: name[1],
      };
      const res = await axios.post("/api/google", data);
      console.log("USER", res.data.user);
    } catch (error) {
      console.log("GOOGLE ERROR", error);
    }
  };

  useEffect(() => {
    const redirectUser = () => {
      router.push("/dashboard");
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        redirectUser();
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <button
      onClick={handleGoogleSignIn}
      className="w-full flex items-center font-normal justify-center h-14 px-6 mt-4 text-lg  transition-colors duration-300 bg-white border border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
    >
      <Image src={googleLogo} alt="Google Logo" width={20} height={20} />
      <span className="ml-4">Continue with Google</span>
    </button>
  );
}

export function CredentialsSignInButton() {
  const handleClick = () => {
    signIn();
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
    >
      <span className="ml-4">Continue with Email</span>
    </button>
  );
}

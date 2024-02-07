"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/app/api/firebase";
import axios from "axios";

export const CredentialsForm = () => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log("data", data, data.get("email"), data.get("password"));

    try {
      const response = await axios.post("/api/login", {
        email: data.get("email"),
        password: data.get("password"),
      });
      console.log("user", response.data);
      //   if (user) {
      //     router.push("/dashboard");
      //   }
    } catch (error) {
      console.log("Error: ", error);
      setError("Your Email or Password is wrong!");
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
    <form
      className="w-full mt-8 text-xl text-black font-semibold flex flex-col"
      onSubmit={handleSubmit}
    >
      {error && (
        <span className="p-4 mb-2 text-lg font-semibold text-white bg-red-500 rounded-md">
          {error}
        </span>
      )}
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="w-full px-4 py-4 mb-4 font-normal border border-gray-300 rounded-md"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="w-full px-4 py-4 mb-4 font-normal border border-gray-300 rounded-md"
      />

      <button
        type="submit"
        className="w-full h-12 px-6 mt-4 text-lg text-white transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700"
      >
        Log in
      </button>
    </form>
  );
};

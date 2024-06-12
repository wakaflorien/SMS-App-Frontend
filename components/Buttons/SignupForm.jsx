"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { signup } from "@/utils/https/auth";
import LoadingSpinner from "../LoadingSpinner";
import Cookies from "js-cookie";

export const SignupForm = () => {
  const [formError, setFormError] = useState({
    full_name: "",
    email: "",
    password: "",
    phone_number: "",
  });

  const { mutate, data, isPending, error, isSuccess } = useMutation({
    mutationKey: "signup",
    mutationFn: signup,
  });

  const router = useRouter();

  const useSignup = (e) => {
    e.preventDefault();
    const userData = new FormData(e.currentTarget);
    // Form validation
    if (!userData.get("fullname")) {
      setFormError({ ...error, full_name: "Full Name is required" });
      return;
    }
    if (!userData.get("phone")) {
      setFormError({ ...error, phone_number: "Phone is required" });
      return;
    }
    if (!userData.get("email")) {
      setFormError({ ...error, email: "Email is required" });
      return;
    }

    if (!userData.get("password")) {
      setFormError({ ...error, password: "Password is required" });
      return;
    }

    mutate({
      email: userData.get("email"),
      password: userData.get("password"),
      phone_number: userData.get("phone"),
      full_name: userData.get("fullname"),
    });
    if (isSuccess) {
      e.target.reset();
    }
  };

  if (isSuccess && data) {
    Cookies.set("token", data.data.token);
    router.push("/dashboard");
  }

  return (
    <form
      className="w-full mt-8 text-xl text-black font-semibold flex flex-col space-y-4"
      onSubmit={useSignup}
    >
      {error && (
        <span className="p-4 mb-2 text-lg font-semibold text-white bg-red-400 rounded-md">
          {error.response.data.error
            ? error.response.data.error
            : error.message}
        </span>
      )}
      <label htmlFor={"fullname"} className={"text-base font-normal"}>
        Full Name
      </label>
      <input
        type="text"
        name="fullname"
        placeholder="Kaleb Curry"
        required
        className="w-full px-4 py-4 mb-4 border text-xs font-normal border-gray-300 rounded-md"
      />
      {/* {formError.full_name && (
        <span className="text-red-500">{formError.full_name}</span>
      )} */}
      <label htmlFor={"phone"} className={"text-base font-normal"}>
        Phone
      </label>
      <input
        type="text"
        name="phone"
        placeholder="0787930291"
        required
        className="w-full px-4 py-4 mb-4 border text-xs font-normal border-gray-300 rounded-md"
      />
      <label htmlFor={"email"} className={"text-base font-normal"}>
        Email
      </label>
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="w-full px-4 py-4 mb-4 border text-xs font-normal border-gray-300 rounded-md"
      />

      <label htmlFor={"email"} className={"text-base font-normal"}>
        Password
      </label>
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="w-full px-4 py-4 mb-4 border text-xs font-normal border-gray-300 rounded-md"
      />

      <button
        type="submit"
        disabled={isPending}
        className="h-12 px-6 mt-4 text-lg text-white transition-colors duration-150 bg-primary rounded-lg hover:bg-blue-800"
      >
        <span className="mr-4">Register</span>
        {isPending && <LoadingSpinner color="white" fontSize={23} />}
      </button>
    </form>
  );
};

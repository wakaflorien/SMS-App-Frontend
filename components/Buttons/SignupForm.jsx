"use client";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { signupWithEmailAndPassword } from "@/utils/https/auth";
import LoadingSpinner from "../LoadingSpinner";

export const SignupForm = () => {
  const { mutate, data, isPending, error } = useMutation({
    mutationKey: "signup",
    mutationFn: signupWithEmailAndPassword,
  });

  const router = useRouter();

  const useSignup = (e) => {
    e.preventDefault();
    const userData = new FormData(e.currentTarget);
    mutate({
      email: userData.get("email"),
      password: userData.get("password"),
      lastname: userData.get("lname"),
      firstname: userData.get("fname"),
    });
    if (data) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("uid", data.uid);
      localStorage.setItem("id", data._id);
      router.push("/dashboard");
    }
  };

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
      <label htmlFor={"fname"} className={"text-base font-normal"}>
        First Name
      </label>
      <input
        type="text"
        name="fname"
        placeholder="Doe"
        required
        className="w-full px-4 py-4 mb-4 border text-xs font-normal border-gray-300 rounded-md"
      />
      <label htmlFor={"lname"} className={"text-base font-normal"}>
        Last Name
      </label>
      <input
        type="text"
        name="lname"
        placeholder="Jane"
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

"use client";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { loginWithEmailAndPassword } from "@/utils/https/auth";
import LoadingSpinner from "../LoadingSpinner";

export const CredentialsForm = () => {
  const router = useRouter();

  const { isPending, error, data, mutate, isSuccess } = useMutation({
    mutationFn: loginWithEmailAndPassword,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    mutate({
      email: data.get("email"),
      password: data.get("password"),
    });
    if (isSuccess) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("uid", data.uid);
      localStorage.setItem("id", data._id);
      router.push("/dashboard");
    }
  };

  console.log("data", data);

  return (
    <form
      className="w-full mt-8 text-xl text-black font-semibold flex flex-col"
      onSubmit={handleSubmit}
    >
      {error && (
        <span className="p-4 mb-2 text-lg font-semibold text-white bg-red-400 rounded-md">
          {error.response.data.error
            ? error.response.data.error
            : error.message}
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
        disabled={isPending}
        className="w-full h-12 px-6 mt-4 text-lg text-white transition-colors duration-150 !bg-primary rounded-lg focus:shadow-outline hover:bg-blue-700"
      >
        <span className="mr-4">Log in</span>
        {isPending && <LoadingSpinner color="white" fontSize={23} />}
      </button>
    </form>
  );
};

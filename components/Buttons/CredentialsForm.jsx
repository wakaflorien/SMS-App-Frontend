import {signIn} from "next-auth/react";
import {useState} from "react";
import {useRouter} from "next/navigation";

export const CredentialsForm = () => {
    const router = useRouter();
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        console.log("data", data, data.get("email"), data.get("password"))

        const signInResponse = await signIn("credentials", {
            email: data.get("email"),
            password: data.get("password"),
            redirect: false,
        });

        if (signInResponse && !signInResponse.error) {
            //Redirect to homepage (/timeline)
            router.push("/dashboard");
        } else {
            console.log("Error: ", signInResponse);
            setError("Your Email or Password is wrong!");
        }
    };
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
    )
}
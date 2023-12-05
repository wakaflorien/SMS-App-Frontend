import {useState} from "react";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";

export const SignupForm = () => {
    const {data: session} = useSession()

    const router = useRouter();
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        console.log("data", data, data.get("email"), data.get("password"))
    };
    if (session) {
        return router.push("/dashboard")
    }
    return (
        <form
            className="w-full mt-8 text-xl text-black font-semibold flex flex-col space-y-4"
            onSubmit={handleSubmit}
        >
            {error && (
                <span className="p-4 mb-2 text-lg font-semibold text-white bg-red-500 rounded-md">
          {error}
        </span>
            )}
            <label htmlFor={"email"} className={"text-base font-normal"}>First Name</label>
            <input
                type="text"
                name="fname"
                placeholder="Doe"
                required
                className="w-full px-4 py-4 mb-4 border text-xs font-normal border-gray-300 rounded-md"
            />
            <label htmlFor={"email"} className={"text-base font-normal"}>Last Name</label>
            <input
                type="text"
                name="lname"
                placeholder="Jane"
                required
                className="w-full px-4 py-4 mb-4 border text-xs font-normal border-gray-300 rounded-md"
            />
            <label htmlFor={"email"} className={"text-base font-normal"}>Email</label>
            <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full px-4 py-4 mb-4 border text-xs font-normal border-gray-300 rounded-md"
            />

            <label htmlFor={"email"} className={"text-base font-normal"}>Password</label>
            <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="w-full px-4 py-4 mb-4 border text-xs font-normal border-gray-300 rounded-md"
            />

            <button
                type="submit"
                className="w-full h-12 px-6 mt-4 text-lg text-white transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700"
            >
                Register
            </button>
        </form>
    )
}
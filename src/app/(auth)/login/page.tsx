import Link from "next/link";
import LoginForm from "@/components/forms/login-form";

export default function Login() {
  return (
    <div className="bg-background p-6 sm:p-8 rounded-md w-[350px] sm:w-[500px]">
      <h1 className="text-center text-2xl font-semibold">Welcome back</h1>
      <p className="text-center text-zinc-400">We are glad to see you again</p>
      <LoginForm />
      <p className="text-zinc-400 text-sm mt-2">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="text-blue-500 hover:border-b hover:border-blue-500"
        >
          Create
        </Link>
      </p>
    </div>
  );
}

import Link from "next/link";
import RegisterForm from "@/components/forms/register-form";

export default function Register() {
  return (
    <div className="bg-background p-6 sm:p-8 rounded-md w-[350px] sm:w-[500px]">
      <h1 className="text-center text-2xl font-semibold">Create an account</h1>
      <p className="text-center text-zinc-400">
        Create an account to use this application
      </p>
      <RegisterForm />
      <p className="text-zinc-400 text-sm mt-2">
        Have an account?{" "}
        <Link
          href="/login"
          className="text-blue-500 hover:border-b hover:border-blue-500"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}

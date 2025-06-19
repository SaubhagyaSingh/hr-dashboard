"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [inputErrors, setInputErrors] = useState({ email: "", password: "" });

  const validate = () => {
    let valid = true;
    const errors = { email: "", password: "" };

    if (!email) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Invalid email format";
      valid = false;
    }

    if (!password) {
      errors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setInputErrors(errors);
    return valid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!validate()) return;

    const res = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/home",
      redirect: false,
    });

    if (res?.ok) {
      window.location.href = res.url || "/";
    } else {
      setFormError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-pink-900 dark:to-gray-800 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-md sm:max-w-lg bg-white dark:bg-gray-950 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 transition-all duration-300">
        <div className="flex justify-center mb-6">
          <Image
            src="/logo.png"
            alt="CORE logo"
            width={100}
            height={100}
            className="rounded-xl shadow-sm"
            priority
          />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-800 dark:text-white mb-1">
          Log In
        </h2>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-6">
          CORE HR: Your Way to Keep Things Organized
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              placeholder="admin@hr.com"
              className={`mt-1 w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 transition duration-200 ${
                inputErrors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-700 focus:ring-blue-500"
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {inputErrors.email && (
              <p className="text-sm text-red-500 mt-1">{inputErrors.email}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className={`mt-1 w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white focus:outline-none focus:ring-2 transition duration-200 ${
                inputErrors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-700 focus:ring-blue-500"
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {inputErrors.password && (
              <p className="text-sm text-red-500 mt-1">{inputErrors.password}</p>
            )}
          </div>

          {formError && (
            <p className="text-sm text-center text-red-600 font-medium">{formError}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 text-white font-semibold py-2 rounded-lg transition"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Demo login → <span className="font-medium">admin@hr.com</span> /{" "}
          <span className="font-medium">admin123</span>
        </p>
      </div>
    </div>
  );
}

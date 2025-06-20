"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [inputErrors, setInputErrors] = useState({ email: "", password: "" });

  // Redirect already logged in users to /home
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/home");
    }
  }, [status]);

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
      window.location.href = res.url || "/home";
    } else {
      setFormError("Invalid email or password");
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Checking session...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 transition-colors duration-300"
      style={{
        background: "var(--primary-bg-gradient)",
        color: "var(--foreground)",
      }}
    >
      <div
        className="w-full max-w-md sm:max-w-lg rounded-2xl shadow-xl border p-6 sm:p-8 transition-all duration-300"
        style={{
          backgroundColor: "var(--background)",
          borderColor: "var(--primary-button-border)",
        }}
      >
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

        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-1">Log In</h2>
        <p className="text-sm text-center mb-6 text-gray-700 dark:text-gray-400">
          CORE HR: Your Way to Keep Things Organized
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              autoComplete="off"
              placeholder="test@gmail.com"
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

          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              autoComplete="off"
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

          {/* Form Error */}
          {formError && (
            <p className="text-sm text-center text-red-600 font-medium">{formError}</p>
          )}

          <button
            type="submit"
            className="w-full py-2 rounded-lg font-semibold transition"
            style={{
              backgroundColor: "var(--primary-button-bg)",
              color: "var(--primary-button-text)",
              border: "2px solid var(--primary-button-border)",
            }}
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-700 dark:text-gray-400">
          Demo login → <span className="font-medium">test@gmail.com</span> /{" "}
          <span className="font-medium">test123</span>
        </p>
      </div>
    </div>
  );
}

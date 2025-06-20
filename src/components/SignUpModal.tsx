"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill in all fields.");
      return;
    }

    console.log("SignUp data:", formData);

    // TODO: Add backend signup logic here

    onClose();
    router.push("/login");
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="w-full max-w-md transform overflow-hidden rounded-2xl shadow-xl transition-all duration-300 border"
                style={{
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                  borderColor: "var(--primary-button-border)",
                }}
              >
                <div className="p-6">
                  <Dialog.Title className="text-lg font-semibold mb-4">
                    Sign Up
                  </Dialog.Title>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />

                    <button
                      type="submit"
                      className="w-full py-2 rounded-md font-medium transition"
                      style={{
                        backgroundColor: "var(--primary-button-bg)",
                        color: "var(--primary-button-text)",
                        border: "2px solid var(--primary-button-border)",
                      }}
                    >
                      Create Account
                    </button>
                  </form>

                  <button
                    onClick={onClose}
                    className="mt-4 text-sm hover:underline transition"
                    style={{ color: "var(--foreground)" }}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

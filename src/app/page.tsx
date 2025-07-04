"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import ImageCarousel from "@/components/ImageCarousel";
import { useState, useEffect } from "react";
import SignUpModal from "@/components/SignUpModal";
import { useTheme } from "next-themes";

const images = [
  "/assets/banner/img1.png",
  "/assets/banner/img2.png",
  "/assets/banner/img3.png",
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const currentTheme = theme === "system" ? systemTheme : theme;

  if (!mounted) return null;

  return (
    <div
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
      className="min-h-screen transition-colors duration-300"
    >
      <Navbar />

      <main className="w-full px-4 md:px-6 py-36 flex flex-col md:flex-row items-center justify-center gap-12">
        <div className="w-full md:w-1/2">
          <ImageCarousel images={images} />
        </div>

        <div className="w-full md:w-1/2 max-w-xl space-y-6 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-peach">
            Welcome to Core HR Platform
          </h1>
          <p className="text-gray-warm text-base leading-relaxed">
            Streamline your company’s human resource management with intuitive dashboards, employee tracking,
            and actionable analytics designed to make your operations smoother, more efficient, and more
            insightful.
          </p>

          <div className="flex sm:flex-row items-center sm:justify-start gap-4 p-4 m-4">
          <button
  onClick={() => setIsModalOpen(true)}
  className="px-5 py-2 rounded-md border-2 font-medium transition-all duration-300"
  style={{
    backgroundColor: "var(--primary-button)",
    color: "var(--foreground)",
    borderColor: "var(--foreground)",
  }}
>
  Sign Up
</button>

<div   className="px-5 py-2 rounded-md border-2 font-medium transition-all duration-300" style={{
    backgroundColor: "var(--primary-button)",
    color: "var(--foreground)",
    borderColor: "var(--foreground)",
  }}>

<Link
  href="/login"
>
  Login
</Link>
</div>

          </div>
        </div>
      </main>

      <SignUpModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

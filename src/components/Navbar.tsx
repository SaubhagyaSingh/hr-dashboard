"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Moon, Sun } from "lucide-react";
import logo from "/public/logo.png";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import LogoutButton from "./Logout";
import { useSession } from "next-auth/react"; // 🔁 Import here

const navItems = [
  { label: "Home", href: "/home" },
  { label: "Bookmarks", href: "/bookmark" },
  { label: "Analytics", href: "/analytics" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { systemTheme, theme, setTheme } = useTheme();
  const { status } = useSession(); // 🔁 Grab session status

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        boxShadow:
          currentTheme === "dark"
            ? "0 2px 10px rgba(255, 255, 255, 0.1)"
            : "0 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Left: Logo + Links */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Image
              src={logo}
              alt="Logo"
              width={32}
              height={32}
              className="rounded-xl"
            />
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight sm:text-base"
            >
              CORE HR
            </Link>
          </div>

          <div className="flex gap-6 text-sm font-medium">
            {navItems.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`transition-colors ${
                  pathname === href
                    ? "text-accent-rose"
                    : "text-gray-warm hover:text-peach"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Logout + Theme Toggle */}
        <div className="flex items-center gap-4">
          {status === "authenticated" && <LogoutButton />} {/* ✅ Conditional */}
          <button
            onClick={() =>
              setTheme(currentTheme === "dark" ? "light" : "dark")
            }
            className="hover:text-accent-rose transition"
            style={{ color: "var(--foreground)" }}
            title="Toggle Theme"
          >
            {currentTheme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

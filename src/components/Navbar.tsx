"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Moon, Sun } from "lucide-react";
import logo from "/public/logo.png";
import { useTheme } from "@/context/ThemeContext";

const navItems = [
  { label: "Home", href: "/home" },
  { label: "Bookmarks", href: "/bookmark" },
  { label: "Analytics", href: "/analytics" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
<nav className="fixed top-0 left-0 w-full bg-primary-dark text-peach shadow-md dark:shadow-card-dark/40 z-50">
<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Left: Logo and Nav Links */}
        <div className="flex items-center gap-10">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image src={logo} alt="Logo" width={32} height={32} className="rounded-xl" />
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight sm:text-base"
            >
              CORE HR
            </Link>
          </div>

          {/* Nav Links */}
         {/* Nav Links */}
<div className="flex space-x-4 text-sm font-medium">
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

        {/* Right: Theme Toggle Icon */}
        <div>
          <button
            onClick={toggleTheme}
            className="text-peach hover:text-accent-rose transition"
            title="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

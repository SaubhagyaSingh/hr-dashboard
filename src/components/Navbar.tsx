"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "/public/logo.png"; 

const navItems = [
  { label: "Home", href: "/home" },
  { label: "Bookmarks", href: "/bookmark" }, 
  { label: "Analytics", href: "/analytics" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full bg-primary-dark text-peach shadow-md dark:shadow-card-dark/40">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src={logo} alt="Logo" width={32} height={32} className="rounded-xl" />
          <Link href="/" className="text-xl font-semibold tracking-tight">
            CORE HR
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 text-sm font-medium">
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
    </nav>
  );
}

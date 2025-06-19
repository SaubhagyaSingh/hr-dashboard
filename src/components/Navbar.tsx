"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Bookmark", href: "/bookmark" },
  { label: "Employee", href: "/employee" },
  { label: "Analytics", href: "/analytics" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full bg-primary-dark text-peach shadow-md dark:shadow-card-dark/40">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold tracking-tight">
          mysite
        </Link>

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

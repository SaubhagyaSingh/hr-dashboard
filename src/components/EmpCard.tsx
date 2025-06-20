"use client";

import { useState } from "react";
import { Star, Bookmark } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEmployeeContext } from "@/context/EmployeeContext";

type Props = {
  id: string;
  name: string;
  email: string;
  age: number;
  department: string;
  rating: number;
  avatar: string;
  bookmark: boolean;
};

export default function EmpCard({
  id,
  name,
  email,
  age,
  department,
  rating,
  avatar,
  bookmark,
}: Props) {
  const { toggleBookmark } = useEmployeeContext();
  const router = useRouter();

  const handleBookmarkToggle = () => {
    toggleBookmark(id);
  };

  const handleView = () => {
    router.push(`/employee/${id}`);
  };

  return (
    <div className="bg-white dark:bg-neutral-900 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-neutral-700 rounded-xl shadow-md hover:shadow-lg transition p-5 w-full max-w-sm">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 relative rounded-md overflow-hidden border shadow-sm dark:border-gray-600">
          <Image
            src={avatar}
            alt={name}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{email}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {age} yrs · {department}
          </p>
        </div>

        <button
          onClick={handleBookmarkToggle}
          className="text-accent-rose hover:text-peach transition"
          title={bookmark ? "Remove Bookmark" : "Bookmark"}
        >
          <Bookmark
            className={`w-6 h-6 ${
              bookmark
                ? "fill-current text-black dark:text-white"
                : "text-gray-400 dark:text-gray-500"
            }`}
          />
        </button>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mt-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
            }`}
            fill={i < rating ? "#facc15" : "none"}
          />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex justify-between gap-2">
        <button
          onClick={handleView}
          className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          View
        </button>
        <button className="text-sm px-3 py-1 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition">
          Promote
        </button>
      </div>
    </div>
  );
}

"use client";

import { EmpCardInfo } from "@/types/generaltypes";
import { Star } from "lucide-react";
import Image from "next/image";



const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? "text-yellow-500" : "text-gray-300 dark:text-gray-600"}
        fill={i < rating ? "#facc15" : "none"}
      />
    ))}
  </div>
);

export default function EmployeeInfoCard({
  name,
  bio,
  address,
  phone,
  avgRating,
  avatar,
}: EmpCardInfo) {
  return (
    <div className="mt-24 min-h-[620px] bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 shadow-lg rounded-2xl p-16 col-span-1 flex flex-col items-center text-center border border-gray-200 dark:border-zinc-700 transition-colors duration-300">
      {/* 🖼️ Avatar */}
      <div className="w-24 h-24 mb-4 relative rounded-2xl overflow-hidden border-2 border-gray-300 dark:border-zinc-600 shadow-md">
        <Image
          src={avatar}
          alt={name}
          fill
          className="object-cover"
          sizes="96px"
        />
      </div>

      {/* 🧑 Name + Bio */}
      <h1 className="text-xl font-bold mb-1">{name}</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{bio}</p>

      {/* 📍 Address */}
      <div className="mb-2">
        <h2 className="font-semibold">📍 Address</h2>
        <p className="text-sm text-gray-700 dark:text-gray-300">{address}</p>
      </div>

      {/* 📞 Phone */}
      <div className="mb-2">
        <h2 className="font-semibold">📞 Phone</h2>
        <p className="text-sm text-gray-700 dark:text-gray-300">{phone}</p>
      </div>

      {/* ⭐ Rating */}
      <div className="mt-2">
        <h2 className="font-semibold">⭐ Avg Rating</h2>
        <StarRating rating={avgRating} />
      </div>
    </div>
  );
}

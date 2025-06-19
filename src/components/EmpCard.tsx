"use client";

import Image from "next/image";
import { Star } from "lucide-react";

type EmpCardProps = {
  name: string;
  email: string;
  age: number;
  department: string;
  rating: number;
  avatar: string; // avatar image url
};

export default function EmpCard({
  name,
  email,
  age,
  department,
  rating,
  avatar,
}: EmpCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 p-5 w-full max-w-sm flex flex-col gap-4">
      {/* Image + Info */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100 shadow">
          <Image
            src={avatar}
            alt={`${name} avatar`}
            width={64}
            height={64}
            className="object-cover w-full h-full"
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
          <p className="text-sm text-gray-500">{email}</p>
        </div>
      </div>

      {/* Meta Info */}
      <div className="flex justify-between text-sm text-gray-600">
        <span>Age: {age}</span>
        <span>Dept: {department}</span>
      </div>

      {/* Performance */}
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-500">Performance</span>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-2">
        <button className="flex-1 px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition shadow">
          View
        </button>
        <button className="flex-1 px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition shadow">
          Bookmark
        </button>
        <button className="flex-1 px-3 py-1 rounded-md bg-green-600 text-white hover:bg-green-700 transition shadow">
          Promote
        </button>
      </div>
    </div>
  );
}

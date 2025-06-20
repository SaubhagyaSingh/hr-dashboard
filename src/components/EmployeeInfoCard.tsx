"use client";

import { Star } from "lucide-react";

type Props = {
  name: string;
  bio: string;
  address: string;
  phone: string;
  avgRating: number;
};

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? "text-yellow-500" : "text-gray-300"}
        fill={i < rating ? "#facc15" : "none"}
      />
    ))}
  </div>
);

export default function EmployeeInfoCard({ name, bio, address, phone, avgRating }: Props) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 col-span-1">
      <h1 className="text-2xl font-bold mb-2">{name}</h1>
      <p className="text-sm text-gray-600 mb-4">{bio}</p>
      <div className="mb-4">
        <h2 className="font-semibold">📍 Address</h2>
        <p className="text-gray-700">{address}</p>
      </div>
      <div className="mb-4">
        <h2 className="font-semibold">📞 Phone</h2>
        <p className="text-gray-700">{phone}</p>
      </div>
      <div>
        <h2 className="font-semibold">⭐ Avg Rating</h2>
        <StarRating rating={avgRating} />
      </div>
    </div>
  );
}

import { useState } from "react";
import { Star, Eye, ArrowUp, Bookmark } from "lucide-react";
import Image from "next/image";

type Props = {
  name: string;
  email: string;
  age: number;
  department: string;
  rating: number;
  avatar: string;
  bookmark: boolean;
};

export default function EmpCard({
  name,
  email,
  age,
  department,
  rating,
  avatar,
  bookmark,
}: Props) {
  const [bookmarked, setBookmarked] = useState(bookmark);

  const handleBookmarkToggle = () => {
    setBookmarked((prev) => !prev);
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-5 w-full max-w-sm">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 relative rounded-md overflow-hidden border shadow">
          <Image
            src={avatar}
            alt={name}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
          <p className="text-sm text-gray-500">{email}</p>
          <p className="text-sm text-gray-600">
            {age} yrs · {department}
          </p>
        </div>

        {/* Single Icon with Conditional Fill */}
        <button
          onClick={handleBookmarkToggle}
          className="text-accent-rose hover:text-peach transition"
          title={bookmarked ? "Remove Bookmark" : "Bookmark"}
        >
          <Bookmark
            fill={bookmarked ? "#fffff" : "none"} // Accent color fill when bookmarked
            className="w-6 h-6"
          />
        </button>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mt-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-yellow-400" : "text-gray-300"
            }`}
            fill={i < rating ? "#facc15" : "none"}
          />
        ))}
      </div>

      {/* Buttons */}
      <div className="mt-4 flex justify-between gap-2">
        <button className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          View
        </button>
        <button className="text-sm px-3 py-1 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition">
          Promote
        </button>
      </div>
    </div>
  );
}

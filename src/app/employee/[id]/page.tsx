"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Star } from "lucide-react";
import * as Tabs from "@radix-ui/react-tabs";
import Navbar from "@/components/Navbar"; 
type Performance = {
  year: number;
  rating: number;
};

type User = {
  id: string;
  name: string;
  address: string;
  phone: string;
  bio: string;
  performance: Performance[];
  projects: string[];
  feedback: string[];
};

function getRandomPerformance() {
  return Array.from({ length: 5 }, (_, i) => ({
    year: 2019 + i,
    rating: Math.floor(Math.random() * 5) + 1,
  }));
}

const mockUser = (id: string): User => ({
  id,
  name: `Employee #${id}`,
  address: "123 Main St, Cityville",
  phone: "+91-9876543210",
  bio: "Experienced team player with strong work ethic and excellent communication skills.",
  performance: getRandomPerformance(),
  projects: ["Project Alpha", "Project Beta", "Project Gamma"],
  feedback: ["Great team member!", "Needs to improve punctuality", "Excellent problem-solving skills"],
});

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

export default function EmployeeDetailPage() {
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const id = params?.id?.toString() || "1";
    setUser(mockUser(id));
  }, [params]);

  if (!user) return <div className="p-4">Loading...</div>;

  const avgRating = Math.round(user.performance.reduce((a, b) => a + b.rating, 0) / user.performance.length);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Card */}
        <div className="bg-white shadow-lg rounded-2xl p-6 col-span-1">
          <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
          <p className="text-sm text-gray-600 mb-4">{user.bio}</p>
          <div className="mb-4">
            <h2 className="font-semibold">📍 Address</h2>
            <p className="text-gray-700">{user.address}</p>
          </div>
          <div className="mb-4">
            <h2 className="font-semibold">📞 Phone</h2>
            <p className="text-gray-700">{user.phone}</p>
          </div>
          <div>
            <h2 className="font-semibold">⭐ Avg Rating</h2>
            <StarRating rating={avgRating} />
          </div>
        </div>

        {/* Right Tabs */}
        <div className="col-span-1 md:col-span-2">
          <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
            <Tabs.List className="flex gap-4 border-b mb-4">
              <Tabs.Trigger value="overview" className="pb-2 border-b-2 data-[state=active]:border-black">Overview</Tabs.Trigger>
              <Tabs.Trigger value="projects" className="pb-2 border-b-2 data-[state=active]:border-black">Projects</Tabs.Trigger>
              <Tabs.Trigger value="feedback" className="pb-2 border-b-2 data-[state=active]:border-black">Feedback</Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="overview">
              <div className="space-y-2">
                {user.performance.map((p, i) => (
                  <div key={i} className="flex justify-between bg-gray-50 p-2 rounded">
                    <span>{p.year}</span>
                    <StarRating rating={p.rating} />
                  </div>
                ))}
              </div>
            </Tabs.Content>

            <Tabs.Content value="projects">
              <ul className="list-disc pl-5">
                {user.projects.map((project, i) => (
                  <li key={i}>{project}</li>
                ))}
              </ul>
            </Tabs.Content>

            <Tabs.Content value="feedback">
              <div className="space-y-2">
                {user.feedback.map((fb, i) => (
                  <div key={i} className="bg-white shadow rounded-xl p-3">{fb}</div>
                ))}
              </div>
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    </div>
  );
}
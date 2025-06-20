"use client";

import { useParams } from "next/navigation";
import { useEmployeeContext } from "@/context/EmployeeContext";
import { Star } from "lucide-react";
import * as Tabs from "@radix-ui/react-tabs";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import EmployeeInfoCard from "@/components/EmployeeInfoCard";

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
  const { id } = useParams();
  const { employees } = useEmployeeContext();
  const user = employees.find((emp) => emp.id === id);

  const [activeTab, setActiveTab] = useState("overview");

  if (!user) return <div className="p-4">Loading employee...</div>;

  const avgRating =
    user.performance?.length > 0
      ? Math.round(user.performance.reduce((a, b) => a + b.rating, 0) / user.performance.length)
      : 0;

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Card */}
        <EmployeeInfoCard
          name={user.name}
          bio={user.bio}
          address={user.address}
          phone={user.phone}
          avgRating={avgRating}
        />
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

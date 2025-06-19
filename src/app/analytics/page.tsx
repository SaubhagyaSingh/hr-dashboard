"use client";

import { useState } from "react";
import { Pie, Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
} from "chart.js";
import * as Tabs from "@radix-ui/react-tabs";
import Navbar from "@/components/Navbar";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title
);

// Mock data
const employeeDistribution = {
  labels: ["Engineering", "Marketing", "HR", "Finance", "Sales"],
  datasets: [
    {
      label: "Employees",
      data: [40, 15, 10, 20, 15],
      backgroundColor: [
        "#4f46e5",
        "#facc15",
        "#10b981",
        "#f472b6",
        "#60a5fa",
      ],
    },
  ],
};

const bookmarkTrendData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Bookmarks",
      data: [5, 8, 12, 10, 14, 18],
      fill: false,
      borderColor: "#4f46e5",
      tension: 0.3,
    },
  ],
};

const departmentRatingData = {
  labels: ["Engineering", "Marketing", "HR", "Finance", "Sales"],
  datasets: [
    {
      label: "Avg Rating",
      data: [4.5, 3.2, 3.8, 4.1, 3.5],
      backgroundColor: "#60a5fa",
    },
  ],
};

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("bookmarks");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-center">Analytics Dashboard</h1>

        <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start">
          {/* Pie Chart */}
          <div className="w-full lg:w-1/3 bg-white p-6 shadow-lg rounded-xl">
            <h2 className="text-xl font-semibold mb-4 text-center lg:text-left">Employee Distribution</h2>
            <Pie data={employeeDistribution} />
          </div>

          {/* Tabs for Line & Bar Charts */}
          <div className="w-full lg:w-2/3 bg-white p-6 shadow-lg rounded-xl">
            <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
              <Tabs.List className="flex gap-4 justify-center lg:justify-start mb-6">
                <Tabs.Trigger
                  value="bookmarks"
                  className="px-4 py-2 border-b-2 data-[state=active]:border-blue-600"
                >
                  Bookmarks
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="ratings"
                  className="px-4 py-2 border-b-2 data-[state=active]:border-blue-600"
                >
                  Department Ratings
                </Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content value="bookmarks">
                <Line data={bookmarkTrendData} />
              </Tabs.Content>

              <Tabs.Content value="ratings">
                <Bar data={departmentRatingData} />
              </Tabs.Content>
            </Tabs.Root>
          </div>
        </div>
      </div>
    </div>
  );
}

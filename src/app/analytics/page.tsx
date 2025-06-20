"use client";

import { useState, useMemo } from "react";
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
import EmployeePieChart from "@/components/EmployeePieChart";
import BookmarkLineChart from "@/components/BookmarkLineChart";
import DepartmentBarChart from "@/components/DepartmentBarChart";
import { useEmployeeContext } from "@/context/EmployeeContext";

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

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("bookmarks");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const { employees } = useEmployeeContext();

  const departments = useMemo(() => {
    const set = new Set(employees.map((emp) => emp.department));
    return ["All", ...Array.from(set)];
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    return departmentFilter === "All"
      ? employees
      : employees.filter((emp) => emp.department === departmentFilter);
  }, [employees, departmentFilter]);

  const pieChartData = useMemo(() => {
    const departmentCounts: Record<string, number> = {};
    filteredEmployees.forEach((emp) => {
      departmentCounts[emp.department] = (departmentCounts[emp.department] || 0) + 1;
    });

    const labels = Object.keys(departmentCounts);
    const data = labels.map((label) => departmentCounts[label]);
    const colors = ["#4f46e5", "#facc15", "#10b981", "#f472b6", "#60a5fa", "#a78bfa"];

    return {
      labels,
      datasets: [
        {
          label: "Employees",
          data,
          backgroundColor: colors.slice(0, labels.length),
        },
      ],
    };
  }, [filteredEmployees]);

  const lineChartData = useMemo(() => {
    return {
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
  }, []);

  const barChartData = useMemo(() => {
    const ratingData: Record<string, number[]> = {};

    filteredEmployees.forEach((emp) => {
      if (!ratingData[emp.department]) ratingData[emp.department] = [];
      ratingData[emp.department].push(emp.rating);
    });

    const labels = Object.keys(ratingData);
    const data = labels.map(
      (dep) =>
        ratingData[dep].reduce((a, b) => a + b, 0) / ratingData[dep].length || 0
    );

    return {
      labels,
      datasets: [
        {
          label: "Avg Rating",
          data,
          backgroundColor: "#60a5fa",
        },
      ],
    };
  }, [filteredEmployees]);

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
    >
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-12 text-center">
          Analytics Dashboard
        </h1>

        <div className="mb-10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <label className="font-semibold text-base sm:text-lg">
            Filter by Department:
          </label>
          <select
            className="border rounded-md px-4 py-2 text-sm sm:text-base bg-transparent"
            style={{
              color: "var(--foreground)",
              borderColor: "var(--foreground)",
            }}
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div
            className="col-span-1 p-6 sm:p-8 md:p-10 shadow-lg rounded-xl h-[500px] sm:h-[550px]"
            style={{ backgroundColor: "var(--primary-bg-black)" }}
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
              Employee Distribution
            </h2>
            <div className="h-[380px] sm:h-[450px]">
              <EmployeePieChart data={pieChartData} />
            </div>
          </div>

          <div
            className="col-span-1 lg:col-span-2 p-6 sm:p-8 md:p-10 shadow-lg rounded-xl h-[500px] sm:h-[550px]"
            style={{ backgroundColor: "var(--primary-bg-black)" }}
          >
            <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
              <Tabs.List className="flex gap-4 justify-center mb-6">
                <Tabs.Trigger
                  value="bookmarks"
                  className="px-4 py-2 border-b-2 text-sm sm:text-base data-[state=active]:border-blue-600"
                >
                  Bookmarks
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="ratings"
                  className="px-4 py-2 border-b-2 text-sm sm:text-base data-[state=active]:border-blue-600"
                >
                  Department Ratings
                </Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content value="bookmarks">
                <div className="h-[380px] sm:h-[450px]">
                  <BookmarkLineChart data={lineChartData} />
                </div>
              </Tabs.Content>

              <Tabs.Content value="ratings">
                <div className="h-[380px] sm:h-[450px]">
                  <DepartmentBarChart data={barChartData} />
                </div>
              </Tabs.Content>
            </Tabs.Root>
          </div>
        </div>
      </div>
    </div>
  );
}

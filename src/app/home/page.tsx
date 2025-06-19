"use client";

import Navbar from "@/components/Navbar";
import EmpCard from "@/components/EmpCard";
import FilterSection from "@/components/FilterSection";
import { useState } from "react";

const employees = [
  {
    name: "Alice Carter",
    email: "alice.carter@example.com",
    age: 28,
    department: "Finance",
    rating: 4,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Ravi Singh",
    email: "ravi.singh@example.com",
    age: 33,
    department: "Engineering",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    name: "Maria Lopez",
    email: "maria.lopez@example.com",
    age: 26,
    department: "HR",
    rating: 3,
    avatar: "https://randomuser.me/api/portraits/women/55.jpg",
  },
  {
    name: "John Doe",
    email: "john.doe@example.com",
    age: 31,
    department: "Sales",
    rating: 4,
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    name: "Sarah Ahmed",
    email: "sarah.ahmed@example.com",
    age: 29,
    department: "Marketing",
    rating: 2,
    avatar: "https://randomuser.me/api/portraits/women/62.jpg",
  },
  {
    name: "Dev Patel",
    email: "dev.patel@example.com",
    age: 35,
    department: "Engineering",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
  },
];

const departments = ["Engineering", "Marketing", "HR", "Finance", "Sales"];

export default function Home() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<string[]>([]);

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(query.toLowerCase()) ||
      emp.email.toLowerCase().includes(query.toLowerCase()) ||
      emp.department.toLowerCase().includes(query.toLowerCase());

    const matchesDepartment =
      filters.length === 0 || filters.includes(emp.department);

    return matchesSearch && matchesDepartment;
  });

  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-gray-100 px-6 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
          {/* Filter Area */}
          <div className="w-full md:w-1/3 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Filter Employees</h2>
            <FilterSection
              departments={departments}
              onSearch={(val) => setQuery(val)}
              onFilterChange={(selected) => setFilters(selected)}
            />
          </div>

          {/* Employee Card Area */}
          <div className="w-full md:w-2/3 bg-slate-50 rounded-xl shadow-inner p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Employee List</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp, idx) => (
                  <EmpCard key={idx} {...emp} />
                ))
              ) : (
                <p className="text-gray-500">No employees match your filters.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

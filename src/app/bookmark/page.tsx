"use client";

import Navbar from "@/components/Navbar";
import EmpCard from "@/components/EmpCard";
import FilterSection from "@/components/FilterSection";
import { useState } from "react";
import { useEmployeeContext } from "@/context/EmployeeContext";

const departments = ["Engineering", "Marketing", "HR", "Finance", "Sales"];
const itemsPerPage = 4;

export default function BookmarkedEmployees() {
  const { employees } = useEmployeeContext();
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredEmployees = employees
  .filter((emp) => emp.bookmark)
  .filter((emp) => {
    const matchesSearch =
      emp.name.startsWith(query) ||
      emp.email.startsWith(query) ||
      emp.department.startsWith(query);

    const matchesDepartment =
      filters.length === 0 || filters.includes(emp.department);

    return matchesSearch && matchesDepartment;
  });


  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
    >
      <Navbar />

      <div className="px-6 py-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
          <div
            className="w-full md:w-1/3 rounded-xl shadow-md p-6 min-h-[360px]"
            style={{ backgroundColor: "var(--primary-bg-black)" }}
          >
            <h2 className="text-xl font-semibold mb-4">Filter Employees</h2>
            <FilterSection
              departments={departments}
              onSearch={(val) => {
                setQuery(val);
                setCurrentPage(1);
              }}
              onFilterChange={(selected) => {
                setFilters(selected);
                setCurrentPage(1);
              }}
            />
          </div>

          <div
            className="w-full md:w-2/3 rounded-xl shadow-inner p-6 border flex flex-col justify-between min-h-[360px]"
            style={{
              backgroundColor: "var(--primary-bg-black)",
              borderColor: "rgba(0, 0, 0, 0.1)",
            }}
          >
            <div>
              <h2 className="text-xl font-semibold mb-4">Bookmarked Employees</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {paginatedEmployees.length > 0 ? (
                  paginatedEmployees.map((emp) => (
                    <EmpCard key={emp.id} {...emp} />
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    No bookmarked employees found.
                  </p>
                )}
              </div>
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded border text-sm font-medium transition ${
                      page === currentPage
                        ? "bg-blue-600 text-white"
                        : "bg-transparent border-gray-400 text-gray-800 dark:text-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import EmpCard from "@/components/EmpCard";
import FilterSection from "@/components/FilterSection";
import { useEmployeeContext } from "@/context/EmployeeContext";

const departments = ["Engineering", "Marketing", "HR", "Finance", "Sales"];

export default function Home() {
  const { employees, setEmployees } = useEmployeeContext();
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Pagination
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch("/api/get-employee-data");
        if (!res.ok) throw new Error("Failed to fetch employee data");
        const data = await res.json();
        setEmployees(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (employees.length === 0) fetchEmployees();
    else setLoading(false);
  }, [employees.length, setEmployees]);

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 on filter/search change
  }, [query, filters]);

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(query.toLowerCase()) ||
      emp.email.toLowerCase().includes(query.toLowerCase()) ||
      emp.department.toLowerCase().includes(query.toLowerCase());

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
    <div>
      <Navbar />

      <div className="min-h-screen bg-gray-100 px-6 py-24">
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
          <div className="w-full md:w-2/3 bg-white rounded-xl shadow-md p-6 min-h-[360px] flex flex-col justify-between">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Employee List</h2>
            {loading ? (
              <p className="text-gray-500">Loading employees...</p>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {paginatedEmployees.length > 0 ? (
                    paginatedEmployees.map((emp) => (
                      <EmpCard key={emp.id} {...emp} />
                    ))
                  ) : (
                    <p className="text-gray-500">No employees match your filters.</p>
                  )}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="mt-6 flex justify-center items-center gap-4">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                      Prev
                    </button>
                    <span className="text-sm text-gray-700">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

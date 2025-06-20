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
    setCurrentPage(1);
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
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
    >
      <Navbar />

      <div className="px-6 py-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
          {/* Filter Area */}
          <div
            className="w-full md:w-1/3 rounded-xl shadow-md p-6"
            style={{
              backgroundColor: "var(--primary-bg-black)",
              color: "var(--foreground)",
              border: "1px solid var(--primary-button-border)",
            }}
          >
            <h2 className="text-xl font-semibold mb-4">Filter Employees</h2>
            <FilterSection
              departments={departments}
              onSearch={(val) => setQuery(val)}
              onFilterChange={(selected) => setFilters(selected)}
            />
          </div>

          {/* Employee List */}
          <div
            className="w-full md:w-2/3 rounded-xl shadow-md p-6 min-h-[360px] flex flex-col justify-between"
            style={{
              backgroundColor: "var(--primary-bg-black)",
              color: "var(--foreground)",
              border: "1px solid var(--primary-button-border)",
            }}
          >
            <h2 className="text-xl font-semibold mb-4">Employee List</h2>
            {loading ? (
              <p className="text-sm opacity-80">Loading employees...</p>
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
                    <p className="text-sm opacity-80">
                      No employees match your filters.
                    </p>
                  )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-6 flex justify-center items-center gap-4">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded border transition disabled:opacity-50"
                      style={{
                        backgroundColor: "transparent",
                        color: "var(--foreground)",
                        borderColor: "var(--primary-button-border)",
                      }}
                    >
                      Prev
                    </button>
                    <span className="text-sm">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded border transition disabled:opacity-50"
                      style={{
                        backgroundColor: "transparent",
                        color: "var(--foreground)",
                        borderColor: "var(--primary-button-border)",
                      }}
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

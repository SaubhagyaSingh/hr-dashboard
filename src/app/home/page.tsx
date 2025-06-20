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

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch("/api/get-employee-data");
        if (!res.ok) throw new Error("Failed to fetch employee data");
        const data = await res.json();
        setEmployees(data); // 💾 store in context
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    // fetch only if not already populated
    if (employees.length === 0) fetchEmployees();
    else setLoading(false);
  }, [employees.length, setEmployees]);

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
            {loading ? (
              <p className="text-gray-500">Loading employees...</p>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((emp) => (
                    <EmpCard key={emp.id} {...emp} />
                  ))
                ) : (
                  <p className="text-gray-500">No employees match your filters.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

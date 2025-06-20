"use client";

import { useState } from "react";

type FilterSectionProps = {
  departments: string[];
  onSearch: (query: string) => void;
  onFilterChange: (selected: string[]) => void;
};

export default function FilterSection({
  departments,
  onSearch,
  onFilterChange,
}: FilterSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value); // now sending case-sensitive value as-is
  };

  const handleCheckboxChange = (dept: string) => {
    let updated: string[];
    if (selectedFilters.includes(dept)) {
      updated = selectedFilters.filter((d) => d !== dept);
    } else {
      updated = [...selectedFilters, dept];
    }
    setSelectedFilters(updated);
    onFilterChange(updated);
  };

  return (
    <div
      className="rounded-xl shadow p-6 w-full max-w-3xl mx-auto mb-6 transition-colors duration-300"
      style={{
        backgroundColor: "var(--primary-bg-black)",
        color: "var(--foreground)",
      }}
    >
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, department..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border"
          style={{
            backgroundColor: "transparent",
            color: "var(--foreground)",
            borderColor: "var(--foreground)",
          }}
        />
      </div>

      {/* Filters */}
      <div>
        <h3 className="text-md font-semibold mb-2">Filter by Department</h3>
        <div className="flex flex-wrap gap-4">
          {departments.map((dept) => (
            <label key={dept} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selectedFilters.includes(dept)}
                onChange={() => handleCheckboxChange(dept)}
                className="accent-blue-600"
              />
              {dept}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

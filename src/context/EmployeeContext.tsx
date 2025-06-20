"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Performance = {
  year: number;
  rating: number;
};

export type Employee = {
  id: string;
  name: string;
  email: string;
  age: number;
  department: string;
  rating: number;
  avatar: string;
  bookmark: boolean;
  address: string;
  phone: string;
  bio: string;
  performance: Performance[];
  projects: string[];
  feedback: string[];
};

type EmployeeContextType = {
  employees: Employee[];
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
  updateEmployee: (id: string, newData: Partial<Employee>) => void;
  toggleBookmark: (id: string) => void;
};

const EmployeeContext = createContext<EmployeeContextType | null>(null);

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) throw new Error("useEmployeeContext must be used within EmployeeProvider");
  return context;
};

export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  // 🔁 Update employee by ID with partial data
  const updateEmployee = (id: string, newData: Partial<Employee>) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, ...newData } : emp))
    );
  };

  // ⭐ Toggle bookmark
  const toggleBookmark = (id: string) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id ? { ...emp, bookmark: !emp.bookmark } : emp
      )
    );
  };

  return (
    <EmployeeContext.Provider
      value={{ employees, setEmployees, updateEmployee, toggleBookmark }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

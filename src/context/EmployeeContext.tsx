"use client";

import { Employee } from "@/types/generaltypes";
import { createContext, useContext, useState, ReactNode } from "react";

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

  const updateEmployee = (id: string, newData: Partial<Employee>) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, ...newData } : emp))
    );
  };
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

"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import EmpCard from "@/components/EmpCard";

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
  ];
export default function Home() {
  return (
    <div>
        <Navbar/>
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-24">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {employees.map((emp, idx) => (
          <EmpCard key={idx} {...emp} />
        ))}
      </div>
    </div>
    </div>
  );
}

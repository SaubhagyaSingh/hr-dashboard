"use client";

import { EmployeePieChartProps } from "@/types/charttypes";
import { Pie } from "react-chartjs-2";



export default function EmployeePieChart({ data }: EmployeePieChartProps) {
  return <Pie data={data} />;
}

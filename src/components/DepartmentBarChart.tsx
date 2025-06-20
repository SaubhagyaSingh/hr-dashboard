"use client";

import { DepartmentBarChartProps } from "@/types/charttypes";
import { Bar } from "react-chartjs-2";

export default function DepartmentBarChart({ data }: DepartmentBarChartProps) {
  return <Bar data={data} />;
}

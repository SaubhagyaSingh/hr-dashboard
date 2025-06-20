// components/charts/EmployeePieChart.tsx
"use client";

import { Pie } from "react-chartjs-2";

type EmployeePieChartProps = {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
    }[];
  };
};

export default function EmployeePieChart({ data }: EmployeePieChartProps) {
  return <Pie data={data} />;
}

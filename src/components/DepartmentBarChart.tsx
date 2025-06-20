// components/charts/DepartmentBarChart.tsx
"use client";

import { Bar } from "react-chartjs-2";

type DepartmentBarChartProps = {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string;
    }[];
  };
};

export default function DepartmentBarChart({ data }: DepartmentBarChartProps) {
  return <Bar data={data} />;
}

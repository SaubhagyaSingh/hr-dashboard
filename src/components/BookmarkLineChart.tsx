// components/charts/BookmarkLineChart.tsx
"use client";

import { Line } from "react-chartjs-2";

type BookmarkLineChartProps = {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      fill?: boolean;
      borderColor?: string;
      tension?: number;
    }[];
  };
};

export default function BookmarkLineChart({ data }: BookmarkLineChartProps) {
  return <Line data={data} />;
}
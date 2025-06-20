"use client";

import { BookmarkLineChartProps } from "@/types/charttypes";
import { Line } from "react-chartjs-2";



export default function BookmarkLineChart({ data }: BookmarkLineChartProps) {
  return <Line data={data} />;
}
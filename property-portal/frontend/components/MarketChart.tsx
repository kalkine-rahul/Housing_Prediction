"use client";
import { BarChart, Bar, XAxis, Tooltip } from "recharts";

export default function MarketChart({ data }: any) {
  const chartData = [
    { name: "Avg Price", value: data.average_price },
    { name: "Properties", value: data.total_properties },
  ];

  return (
    <BarChart width={400} height={300} data={chartData}>
      <XAxis dataKey="name" />
      <Tooltip />
      <Bar dataKey="value" />
    </BarChart>
  );
}

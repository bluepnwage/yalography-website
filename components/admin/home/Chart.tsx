"use client";
import { PieChart, Pie, Legend, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  {
    name: "Wedding",
    value: 3
  },
  {
    name: "Party",
    value: 5
  },
  {
    name: "Ad shoot",
    value: 15
  },
  {
    name: "Pregnancy shoot",
    value: 9
  }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export function Chart() {
  return (
    <ResponsiveContainer width={"100%"} height={500}>
      <PieChart width={400} height={400}>
        <Pie data={data} dataKey={"value"} nameKey={"name"} label>
          {data.map((entry, key) => {
            return <Cell key={`cell-${key}`} fill={COLORS[key]} />;
          })}
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

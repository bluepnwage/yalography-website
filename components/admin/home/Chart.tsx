"use client";
import { PieChart, Pie, Legend, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useState } from "react";
import { Reservations } from "./Reservations";
import { Button } from "@components/shared";

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
  const [pieChartView, setView] = useState(true);
  return (
    <>
      <Button className="mx-auto mt-5" onClick={() => setView((prev) => !prev)}>
        Toggle view
      </Button>
      {pieChartView ? (
        <ResponsiveContainer width={"100%"} height={400}>
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
      ) : (
        <Reservations />
      )}
    </>
  );
}

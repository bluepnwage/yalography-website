"use client";
import { PieChart, Pie, Legend, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Reservations } from "./Reservations";
import { Button } from "@components/shared/client";

import { useToggle } from "@lib/hooks/useToggle";

type ChartData = {
  type: string;
  _count: number;
};

type PropTypes = {
  data: ChartData[];
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#e43535", "#7248d0", "#24d2f5", "#7b899d", "#d6438e"];

export function Chart({ data }: PropTypes) {
  const [pieChartView, toggle] = useToggle(true);
  return (
    <>
      <Button className="mx-auto mt-5 mb-2" onClick={toggle.toggle}>
        Toggle view
      </Button>
      {pieChartView ? (
        <ResponsiveContainer width={"100%"} height={400}>
          <PieChart width={400} height={400}>
            <Pie data={data} dataKey={"_count"} nameKey={"type"} label>
              {data.map((type, key) => {
                const fill = type.type.includes("wedding") ? "#f62252" : COLORS[key];
                return <Cell key={`cell-${key}`} fill={fill} />;
              })}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <Reservations data={data} />
      )}
    </>
  );
}

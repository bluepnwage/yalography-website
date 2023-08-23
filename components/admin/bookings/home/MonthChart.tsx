"use client";
import { BarChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Bar, Tooltip } from "recharts";
import { useState } from "react";
import type { ChartData } from "@/app/admin/bookings/ChartContainer";

type PropTypes = {
  data: ChartData;
};

function formatKey(key: keyof Omit<ChartData[0], "month">) {
  switch (key) {
    case "avg": {
      return "Average";
    }
    case "count": {
      return "Count";
    }
    case "max": {
      return "Max";
    }
    case "sum": {
      return "Total";
    }
    default: {
      throw new Error("Invalid key");
    }
  }
}
export function MonthChart({ data }: PropTypes) {
  const [metric, setMetric] = useState<keyof Omit<ChartData[0], "month">>("avg");
  return (
    <>
      <div className="py-2 px-4 -mx-4 -mt-4 border-b items-center border-zinc-200 flex justify-between dark:border-zinc-700">
        <h2 className="font-bold text-gray-900 dark:text-gray-100 text-xl">
          {formatKey(metric)} revenue for each month
        </h2>
        <div className="space-x-2">
          <button
            className={`py-2 px-2 font-semibold rounded-md  text-primary-200 ring-primary-600/20 ${
              metric === "avg" ? "ring-1 bg-primary-600/60" : ""
            }`}
            onClick={() => setMetric("avg")}
          >
            Average
          </button>
          <button
            className={`py-2 px-2 font-semibold rounded-md  text-primary-200 ring-primary-600/20 ${
              metric === "max" ? "ring-1 bg-primary-600/60" : ""
            }`}
            onClick={() => setMetric("max")}
          >
            Max
          </button>
          <button
            className={`py-2 px-2 font-semibold rounded-md  text-primary-200 ring-primary-600/20 ${
              metric === "sum" ? "ring-1 bg-primary-600/60" : ""
            }`}
            onClick={() => setMetric("sum")}
          >
            Sum
          </button>
        </div>
      </div>
      <div className="grow basis-3/4">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip content={<CustomTooltip />} />
            <Bar type="monotone" dataKey={metric} fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

type CustomTooltipProps = {
  label: string;
  active: boolean;
  payload: any[];
};

function CustomTooltip({ active, label, payload }: Partial<CustomTooltipProps>) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md px-4 py-2">
        <p className="">{`${label} : $${payload[0].value.toFixed()}`}</p>
      </div>
    );
  }

  return null;
}

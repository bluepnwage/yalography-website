"use client";
import { cardStyles } from "@aomdev/ui/src/card/styles";
import { useTheme } from "next-themes";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ChartMonthsData, ChartYearsData } from "./popular-months-container";
import { Switch, Title } from "@aomdev/ui";
import { useState } from "react";
type PropTypes = {
  months: ChartMonthsData;
  years: ChartYearsData;
};

export function BarChartExample({ months, years }: PropTypes) {
  const { theme } = useTheme();
  const [yearly, setYearly] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between">
        <Title order={2} className="text-3xl font-medium font-heading mb-6">
          {yearly ? "Yearly" : "Monthly"} revenue chart
        </Title>
        <Switch checked={yearly} onCheckedChange={setYearly} label="Yearly" size={"md"} />
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          className="stroke-gray-200"
          width={500}
          height={300}
          data={yearly ? years : months}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
          <XAxis dataKey={yearly ? "year" : "month"} stroke={theme === "light" ? "#525c61" : "#b8c1c6"} />
          <YAxis stroke={theme === "light" ? "#525c61" : "#b8c1c6"} />
          <Tooltip
            cursor={{
              fill:
                theme === "dark"
                  ? "rgb(255 255 255 / 0.05)"
                  : theme === "light"
                  ? "rgba(82, 92, 97,0.1)"
                  : "transparent"
            }}
            content={<CustomTooltip />}
          />
          <Legend />
          <Bar dataKey="sum" stackId="a" fill="#6341a4" stroke="none" />
          <Bar dataKey="max" fill="#0db38e" stroke="none" />
          <Bar dataKey="avg" fill="#b34200" stroke="none" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

type ToolTipProps = {
  label?: string;
  active: boolean;
  payload: { payload: ChartMonthsData[0] }[];
};

const CustomTooltip = ({ active, payload, label }: Partial<ToolTipProps>) => {
  if (active && payload && payload.length) {
    console.log(payload);
    return (
      <div className={cardStyles()}>
        <p className="font-medium text-lg mb-2 text-gray-900 dark:text-gray-50">
          {label} ({payload[0].payload.count})
        </p>
        <p className="text-gray-600 dark:text-gray-200">
          <span className="font-medium text-gray-800 dark:text-gray-100 inline-block mr-2">Total:</span> $
          {payload[0].payload.sum}
        </p>
        <p className="text-gray-600 dark:text-gray-200">
          <span className="font-medium text-gray-800 dark:text-gray-100 inline-block mr-2">Max:</span> $
          {payload[0].payload.max}
        </p>
        <p className="text-gray-600 dark:text-gray-200">
          <span className="font-medium text-gray-800 dark:text-gray-100 inline-block mr-2">Average:</span> $
          {payload[0].payload.avg}
        </p>
      </div>
    );
  }

  return null;
};

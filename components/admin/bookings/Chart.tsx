"use client";
import { AreaChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Area, Tooltip } from "recharts";
import type { ChartData } from "app/admin/bookings/completed/page";

type PropTypes = {
  data: ChartData;
};

export function Chart({ data }: PropTypes) {
  return (
    <ResponsiveContainer width={'100%'} height={'100%'}>

    <AreaChart  data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="month" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Area type="monotone" dataKey="_max.quote" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
    </AreaChart>
    </ResponsiveContainer>
  );
}

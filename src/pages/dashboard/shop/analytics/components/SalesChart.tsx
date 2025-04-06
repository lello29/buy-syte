
import React from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

// Mock data for sales chart
const salesData = [
  { date: "01/04", sales: 1200 },
  { date: "02/04", sales: 1900 },
  { date: "03/04", sales: 1500 },
  { date: "04/04", sales: 1800 },
  { date: "05/04", sales: 2300 },
  { date: "06/04", sales: 2100 },
  { date: "07/04", sales: 1700 },
  { date: "08/04", sales: 1400 },
  { date: "09/04", sales: 1600 },
  { date: "10/04", sales: 2000 },
  { date: "11/04", sales: 2200 },
  { date: "12/04", sales: 2500 },
  { date: "13/04", sales: 2300 },
  { date: "14/04", sales: 2400 }
];

const SalesChart = () => {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={salesData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0284c7" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#0284c7" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" />
          <YAxis tickFormatter={(value) => `€${value}`} />
          <Tooltip formatter={(value) => [`€${value}`, "Vendite"]} />
          <Area
            type="monotone"
            dataKey="sales"
            stroke="#0284c7"
            fillOpacity={1}
            fill="url(#colorSales)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;

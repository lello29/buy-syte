
import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

// Mock data for visitors chart
const visitorsData = [
  { date: "01/04", visitors: 120, conversions: 12 },
  { date: "02/04", visitors: 150, conversions: 18 },
  { date: "03/04", visitors: 190, conversions: 22 },
  { date: "04/04", visitors: 110, conversions: 9 },
  { date: "05/04", visitors: 170, conversions: 15 },
  { date: "06/04", visitors: 210, conversions: 24 },
  { date: "07/04", visitors: 160, conversions: 20 },
  { date: "08/04", visitors: 140, conversions: 16 },
  { date: "09/04", visitors: 180, conversions: 21 },
  { date: "10/04", visitors: 200, conversions: 25 },
  { date: "11/04", visitors: 160, conversions: 19 },
  { date: "12/04", visitors: 130, conversions: 14 },
  { date: "13/04", visitors: 170, conversions: 20 },
  { date: "14/04", visitors: 190, conversions: 23 }
];

const VisitorsChart = () => {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={visitorsData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar name="Visitatori" dataKey="visitors" fill="#6366f1" />
          <Bar name="Conversioni" dataKey="conversions" fill="#22c55e" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VisitorsChart;

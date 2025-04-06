
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

// Mock data for customer demographics
const ageData = [
  { name: "18-24", value: 15 },
  { name: "25-34", value: 35 },
  { name: "35-44", value: 25 },
  { name: "45-54", value: 15 },
  { name: "55+", value: 10 }
];

const genderData = [
  { name: "Uomo", value: 52 },
  { name: "Donna", value: 48 }
];

const loyaltyData = [
  { name: "Prima volta", value: 30 },
  { name: "Occasionale", value: 45 },
  { name: "Fedele", value: 25 }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
  const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomerStatsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistiche Clienti</CardTitle>
        <CardDescription>
          Analisi demografica e comportamentale dei clienti
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="age" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="age">Età</TabsTrigger>
            <TabsTrigger value="gender">Genere</TabsTrigger>
            <TabsTrigger value="loyalty">Fedeltà</TabsTrigger>
          </TabsList>
          
          <TabsContent value="age" className="space-y-4">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ageData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {ageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-500 text-center">
              La fascia d'età più attiva è 25-34 anni, che rappresenta il 35% della clientela
            </p>
          </TabsContent>
          
          <TabsContent value="gender" className="space-y-4">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    <Cell fill="#0088FE" />
                    <Cell fill="#FF8042" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-500 text-center">
              Distribuzione bilanciata tra clientela maschile e femminile
            </p>
          </TabsContent>
          
          <TabsContent value="loyalty" className="space-y-4">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={loyaltyData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    <Cell fill="#FFBB28" />
                    <Cell fill="#00C49F" />
                    <Cell fill="#0088FE" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-gray-500 text-center">
              Il 25% dei clienti è altamente fedele e genera il 60% delle vendite totali
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CustomerStatsCard;

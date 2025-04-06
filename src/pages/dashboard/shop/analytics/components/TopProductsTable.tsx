
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Mock data for top products
const topProducts = [
  {
    id: "prod1",
    name: "T-shirt Vintage Logo",
    category: "Abbigliamento",
    sales: 42,
    revenue: 1260,
    stock: 15,
    trending: true
  },
  {
    id: "prod2",
    name: "Scarpe Sportive Pro",
    category: "Calzature",
    sales: 38,
    revenue: 3420,
    stock: 8,
    trending: true
  },
  {
    id: "prod3",
    name: "Felpa con Cappuccio",
    category: "Abbigliamento",
    sales: 29,
    revenue: 1450,
    stock: 22,
    trending: false
  },
  {
    id: "prod4",
    name: "Borsa Elegante",
    category: "Accessori",
    sales: 25,
    revenue: 1875,
    stock: 5,
    trending: false
  },
  {
    id: "prod5",
    name: "Jeans Slim Fit",
    category: "Abbigliamento",
    sales: 23,
    revenue: 1150,
    stock: 30,
    trending: false
  }
];

const TopProductsTable = () => {
  // Calculate total sales for percentage
  const totalSales = topProducts.reduce((sum, product) => sum + product.sales, 0);
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Prodotto</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Vendite</TableHead>
          <TableHead>Ricavo</TableHead>
          <TableHead>Disponibilità</TableHead>
          <TableHead>% Vendite</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {topProducts.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">
              {product.name}
              {product.trending && (
                <Badge className="ml-2 bg-orange-100 text-orange-800 border-orange-200">
                  Trend
                </Badge>
              )}
            </TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>{product.sales}</TableCell>
            <TableCell>€{product.revenue.toLocaleString()}</TableCell>
            <TableCell>
              <div className="flex items-center">
                <span className={product.stock < 10 ? "text-red-500" : "text-green-600"}>
                  {product.stock}
                </span>
              </div>
            </TableCell>
            <TableCell>
              <div className="w-full">
                <div className="mb-1 text-xs text-gray-500">
                  {((product.sales / totalSales) * 100).toFixed(1)}%
                </div>
                <Progress
                  value={(product.sales / totalSales) * 100}
                  className="h-2"
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TopProductsTable;

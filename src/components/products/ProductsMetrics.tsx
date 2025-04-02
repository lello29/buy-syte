
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types";

interface ProductsMetricsProps {
  products: Product[];
}

const ProductsMetrics: React.FC<ProductsMetricsProps> = ({ products }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Totale prodotti</span>
            <span className="text-3xl font-bold">{products.length}</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Prodotti attivi</span>
            <span className="text-3xl font-bold">
              {products.filter(p => p.isActive).length}
            </span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">In offerta</span>
            <span className="text-3xl font-bold">
              {products.filter(p => p.discountPrice).length}
            </span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Esauriti</span>
            <span className="text-3xl font-bold">
              {products.filter(p => p.inventory === 0).length}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductsMetrics;


import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import RecentProductItem from "./RecentProductItem";

interface RecentProductsProps {
  recentProducts: any[];
  onAddProduct: () => void;
}

const RecentProducts: React.FC<RecentProductsProps> = ({ 
  recentProducts, 
  onAddProduct 
}) => {
  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Ultimi Prodotti</h2>
        <Link to="/dashboard/products">
          <Button variant="ghost" size="sm">
            Vedi tutti <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </div>
      
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          {recentProducts.length > 0 ? (
            <div>
              {recentProducts.map((product) => (
                <RecentProductItem key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-10 text-center">
              <p className="text-gray-500 mb-4">Non hai ancora aggiunto prodotti.</p>
              <Button onClick={onAddProduct}>Aggiungi Prodotto</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentProducts;

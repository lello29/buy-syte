
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Store, MapPin } from "lucide-react";
import { Shop } from "@/types";

interface PromotedShopCardProps {
  shop: Shop;
  distance: number;
}

const PromotedShopCard = ({ shop, distance }: PromotedShopCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-semibold">{shop.name}</h3>
            <p className="text-gray-500 text-sm line-clamp-1">{shop.description}</p>
          </div>
          <div className="bg-blue-50 p-2 rounded-full">
            <Store className="h-6 w-6 text-primary" />
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{distance} km da te</span>
          </div>
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Promozione attiva</Badge>
        </div>
        
        <div className="mt-4">
          <Link to={`/shops/${shop.id}`}>
            <Button variant="outline" className="w-full">Visualizza negozio</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default PromotedShopCard;

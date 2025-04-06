
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Package } from "lucide-react";
import { Link } from "react-router-dom";

interface InventoryAlertProps {
  lowStockCount: number;
}

const InventoryAlert: React.FC<InventoryAlertProps> = ({ lowStockCount }) => {
  if (lowStockCount === 0) return null;
  
  return (
    <Card className="bg-amber-50 border border-amber-200 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-amber-100 rounded-full p-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-medium text-amber-800">Avviso Inventario</h3>
              <p className="text-amber-700">
                {lowStockCount} {lowStockCount === 1 ? 'prodotto ha' : 'prodotti hanno'} scorte in esaurimento
              </p>
            </div>
          </div>
          <Link to="/dashboard/products/inventory">
            <Button variant="outline" className="border-amber-300 bg-white hover:bg-amber-100 text-amber-800">
              <Package className="h-4 w-4 mr-2" />
              Aggiorna Scorte
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryAlert;

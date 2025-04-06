
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

interface ShopHeaderProps {
  shopName: string;
  isMobile: boolean;
}

const ShopHeader: React.FC<ShopHeaderProps> = ({ 
  shopName, 
  isMobile 
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Negozio: {shopName}</h1>
      
      {!isMobile && (
        <Link to="/dashboard/shop-settings">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Impostazioni Negozio
          </Button>
        </Link>
      )}
    </div>
  );
};

export default ShopHeader;

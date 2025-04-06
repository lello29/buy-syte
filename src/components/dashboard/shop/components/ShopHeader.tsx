
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ShopHeaderProps {
  shopName: string;
  isMobile: boolean;
  notificationCount?: number;
}

const ShopHeader: React.FC<ShopHeaderProps> = ({ 
  shopName, 
  isMobile,
  notificationCount = 0
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Negozio: {shopName}</h1>
      
      {!isMobile && (
        <div className="flex space-x-2">
          <Link to="/dashboard/notifications">
            <Button variant="outline" className="relative">
              <Bell className="h-4 w-4 mr-2" />
              Notifiche
              {notificationCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 flex items-center justify-center p-0 text-xs rounded-full">
                  {notificationCount}
                </Badge>
              )}
            </Button>
          </Link>
          <Link to="/dashboard/shop/settings">
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Impostazioni Negozio
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ShopHeader;

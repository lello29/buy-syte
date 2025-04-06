
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

interface MobileFooterProps {
  showSettings: boolean;
}

const MobileFooter: React.FC<MobileFooterProps> = ({ showSettings }) => {
  if (!showSettings) return null;
  
  return (
    <div className="mt-8">
      <Link to="/dashboard/shop-settings">
        <Button variant="outline" className="w-full justify-center">
          <Settings className="h-4 w-4 mr-2" />
          Impostazioni Negozio
        </Button>
      </Link>
    </div>
  );
};

export default MobileFooter;


import React from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProductsPageHeaderProps {
  shopName: string;
}

const ProductsPageHeader: React.FC<ProductsPageHeaderProps> = ({ shopName }) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  return (
    <div className="flex justify-between items-center mb-6">
      {isMobile && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="mr-2 -ml-2" 
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Indietro
        </Button>
      )}
      <h1 className={`text-2xl font-bold ${isMobile ? "text-center flex-1" : ""}`}>
        Prodotti {shopName ? `- ${shopName}` : ""}
      </h1>
    </div>
  );
};

export default ProductsPageHeader;

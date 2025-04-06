
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Eye, X } from "lucide-react";

interface ProductTableRowProps {
  product: any;
  getShopName: (shopId: string) => string;
  onToggleStatus: (id: string, isActive: boolean) => void;
  onViewProduct: (product: any) => void;
}

const ProductTableRow: React.FC<ProductTableRowProps> = ({ 
  product, 
  getShopName, 
  onToggleStatus, 
  onViewProduct 
}) => {
  return (
    <tr>
      <td className="px-4 py-3 text-left">
        <div className="font-medium">{product.name}</div>
        <div className="text-xs text-muted-foreground truncate max-w-[200px]">
          {product.description.substring(0, 50)}...
        </div>
      </td>
      <td className="px-4 py-3 text-left">{getShopName(product.shopId)}</td>
      <td className="px-4 py-3 text-left">{product.category}</td>
      <td className="px-4 py-3 text-left">
        {product.discountPrice ? (
          <div>
            <span className="font-medium">€{product.discountPrice.toFixed(2)}</span>
            <span className="text-xs text-muted-foreground line-through ml-1">
              €{product.price.toFixed(2)}
            </span>
          </div>
        ) : (
          <span>€{product.price.toFixed(2)}</span>
        )}
      </td>
      <td className="px-4 py-3 text-left">{product.inventory}</td>
      <td className="px-4 py-3 text-left">
        <Badge variant={product.isActive ? "success" : "destructive"}>
          {product.isActive ? "Attivo" : "Inattivo"}
        </Badge>
      </td>
      <td className="px-4 py-3 text-right">
        <div className="flex justify-end gap-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onToggleStatus(product.id, !product.isActive)}
          >
            {product.isActive ? (
              <><X className="h-4 w-4" /> Disattiva</>
            ) : (
              <><Check className="h-4 w-4" /> Attiva</>
            )}
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onViewProduct(product)}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default ProductTableRow;

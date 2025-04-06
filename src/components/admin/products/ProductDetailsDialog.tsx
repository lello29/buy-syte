
import React from "react";
import { Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProductDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: any;
  getShopName: (shopId: string) => string;
  onToggleStatus: (id: string, isActive: boolean) => void;
}

const ProductDetailsDialog: React.FC<ProductDetailsDialogProps> = ({
  open,
  onOpenChange,
  product,
  getShopName,
  onToggleStatus,
}) => {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" /> Dettagli Prodotto
          </DialogTitle>
          <DialogDescription>
            Informazioni dettagliate sul prodotto
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">ID</p>
              <p className="font-mono">{product.id}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Stato</p>
              <Badge variant={product.isActive ? "success" : "destructive"}>
                {product.isActive ? "Attivo" : "Inattivo"}
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Nome</p>
              <p>{product.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Categoria</p>
              <p>{product.category}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Prezzo</p>
              <p>€{product.price.toFixed(2)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Prezzo Scontato</p>
              <p>{product.discountPrice ? `€${product.discountPrice.toFixed(2)}` : "N/A"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Inventario</p>
              <p>{product.inventory} unità</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Negozio</p>
              <p>{getShopName(product.shopId)}</p>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Descrizione</p>
            <p className="text-sm text-gray-700">{product.description}</p>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Chiudi
            </Button>
            <Button 
              variant={product.isActive ? "destructive" : "default"}
              onClick={() => {
                onToggleStatus(product.id, !product.isActive);
                onOpenChange(false);
              }}
            >
              {product.isActive ? "Disattiva" : "Attiva"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;

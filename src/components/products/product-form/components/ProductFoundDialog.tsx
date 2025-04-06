
import React from "react";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Check, X } from "lucide-react";

interface ProductFoundDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  foundProduct: any;
  onAccept: () => void;
  onReject: () => void;
}

const ProductFoundDialog: React.FC<ProductFoundDialogProps> = ({
  open,
  onOpenChange,
  foundProduct,
  onAccept,
  onReject
}) => {
  if (!foundProduct) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Prodotto trovato nell'archivio</AlertDialogTitle>
          <AlertDialogDescription>
            È questo il prodotto che stai cercando di aggiungere?
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="p-4 border rounded-md my-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="font-semibold">Nome:</div>
            <div>{foundProduct.name}</div>
            
            <div className="font-semibold">Categoria:</div>
            <div>{foundProduct.category}</div>
            
            <div className="font-semibold">Prezzo:</div>
            <div>€{foundProduct.price.toFixed(2)}</div>
            
            <div className="font-semibold">Codice:</div>
            <div>{foundProduct.barcode}</div>
          </div>
        </div>
        
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onReject} className="flex items-center">
            <X className="mr-2 h-4 w-4" />
            No, inserisco manualmente
          </AlertDialogCancel>
          <AlertDialogAction onClick={onAccept} className="flex items-center">
            <Check className="mr-2 h-4 w-4" />
            Sì, importa questo prodotto
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ProductFoundDialog;

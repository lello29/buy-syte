
import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Shop } from '@/types';

interface ViewShopDialogProps {
  shop: Shop | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ViewShopDialog: React.FC<ViewShopDialogProps> = ({ 
  shop,
  open, 
  onOpenChange 
}) => {
  if (!shop) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Dettagli Negozio</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-gray-500">Nome</span>
            <span>{shop.name}</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-gray-500">Indirizzo</span>
            <span>{shop.address}</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-gray-500">Email</span>
            <span>{shop.email}</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-gray-500">Telefono</span>
            <span>{shop.phone}</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-gray-500">Crediti AI</span>
            <span>{shop.aiCredits}</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-gray-500">Ultimo aggiornamento</span>
            <span>{new Date(shop.lastUpdated).toLocaleDateString()}</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-gray-500">Data creazione</span>
            <span>{new Date(shop.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewShopDialog;

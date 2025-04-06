
import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Shop } from '@/types';
import ShopBasicInfoFields from './components/ShopBasicInfoFields';
import ShopLocationFields from './components/ShopLocationFields';
import ShopStatusFields from './components/ShopStatusFields';
import ShopDialogFooter from './components/ShopDialogFooter';

interface EditShopDialogProps {
  shop: Shop | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onShopChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange?: (field: string, value: string) => void;
  onCheckboxChange?: (field: string, checked: boolean) => void;
  onGetLocation?: () => void;
  onSaveChanges: () => void;
}

const EditShopDialog: React.FC<EditShopDialogProps> = ({
  shop,
  open,
  onOpenChange,
  onShopChange,
  onSelectChange,
  onCheckboxChange,
  onGetLocation,
  onSaveChanges
}) => {
  if (!shop) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Modifica Negozio</DialogTitle>
          <DialogDescription>Modifica i dettagli del negozio selezionato.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <ShopBasicInfoFields
            name={shop.name}
            category={shop.category}
            address={shop.address}
            email={shop.email}
            phone={shop.phone}
            fiscalCode={shop.fiscalCode}
            vatNumber={shop.vatNumber}
            onShopChange={onShopChange}
            onSelectChange={onSelectChange}
          />
          
          <ShopLocationFields
            latitude={shop.location?.latitude}
            longitude={shop.location?.longitude}
            onShopChange={onShopChange}
            onGetLocation={onGetLocation}
          />
          
          <ShopStatusFields
            aiCredits={shop.aiCredits}
            isApproved={shop.isApproved}
            onShopChange={onShopChange}
            onCheckboxChange={onCheckboxChange}
          />
          
          <ShopDialogFooter
            onCancel={() => onOpenChange(false)}
            onSave={onSaveChanges}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditShopDialog;

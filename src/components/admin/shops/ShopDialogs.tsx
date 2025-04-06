
import React from 'react';
import { Shop } from '@/types';
import AddShopDialog from './AddShopDialog';
import ViewShopDialog from './ViewShopDialog';
import EditShopDialog from './EditShopDialog';

interface ShopDialogsProps {
  isAddShopOpen: boolean;
  setIsAddShopOpen: (open: boolean) => void;
  isViewShopOpen: boolean;
  setIsViewShopOpen: (open: boolean) => void;
  isEditShopOpen: boolean;
  setIsEditShopOpen: (open: boolean) => void;
  selectedShop: Shop | null;
  newShop: {
    name: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    fiscalCode: string;
    vatNumber: string;
    category: string;
  };
  handleNewShopChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (field: string, value: string) => void;
  handleCreateShop: () => void;
  handleShopChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCheckboxChange: (field: string, checked: boolean) => void;
  handleGetLocation: () => void;
  handleSaveChanges: () => void;
}

const ShopDialogs: React.FC<ShopDialogsProps> = ({
  isAddShopOpen,
  setIsAddShopOpen,
  isViewShopOpen,
  setIsViewShopOpen,
  isEditShopOpen,
  setIsEditShopOpen,
  selectedShop,
  newShop,
  handleNewShopChange,
  handleSelectChange,
  handleCreateShop,
  handleShopChange,
  handleCheckboxChange,
  handleGetLocation,
  handleSaveChanges
}) => {
  return (
    <>
      <AddShopDialog 
        open={isAddShopOpen} 
        onOpenChange={setIsAddShopOpen}
        newShop={newShop}
        onInputChange={handleNewShopChange}
        onSelectChange={handleSelectChange}
        onCreateShop={handleCreateShop}
      />
      
      <ViewShopDialog 
        shop={selectedShop}
        open={isViewShopOpen}
        onOpenChange={setIsViewShopOpen}
      />
      
      <EditShopDialog 
        shop={selectedShop}
        open={isEditShopOpen}
        onOpenChange={setIsEditShopOpen}
        onShopChange={handleShopChange}
        onSelectChange={handleSelectChange}
        onCheckboxChange={handleCheckboxChange}
        onGetLocation={handleGetLocation}
        onSaveChanges={handleSaveChanges}
      />
    </>
  );
};

export default ShopDialogs;

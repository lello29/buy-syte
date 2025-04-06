
import React from 'react';
import { useShopDialogs } from './hooks/useShopDialogs';
import AddShopDialog from './AddShopDialog';
import ViewShopDialog from './ViewShopDialog';
import EditShopDialog from './EditShopDialog';

const ShopDialogs: React.FC = () => {
  const {
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
  } = useShopDialogs();

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

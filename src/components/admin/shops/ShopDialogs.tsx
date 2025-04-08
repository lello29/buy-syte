
import React from 'react';
import AddShopDialog from './dialogs/AddShopDialog';
import ViewShopDialog from './dialogs/ViewShopDialog';
import EditShopDialog from './dialogs/EditShopDialog';
import DeleteShopDialog from './DeleteShopDialog';
import { useShopState } from './hooks/useShopState';

const ShopDialogs: React.FC = () => {
  const {
    isAddShopOpen,
    setIsAddShopOpen,
    isViewShopOpen,
    setIsViewShopOpen,
    isEditShopOpen,
    setIsEditShopOpen,
    isDeleteShopOpen,
    setIsDeleteShopOpen,
    isDeleting,
    selectedShop,
    newShop,
    handleNewShopChange,
    handleSelectChange,
    handleCreateShop,
    handleShopChange,
    handleCheckboxChange,
    handleSaveChanges,
    handleDeleteShop
  } = useShopState();

  // Ensure we have a valid shop before performing actions
  const onDeleteShop = () => {
    if (selectedShop && selectedShop.id) {
      handleDeleteShop(selectedShop.id);
    }
  };

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
        onSaveChanges={handleSaveChanges}
      />

      <DeleteShopDialog
        open={isDeleteShopOpen}
        onOpenChange={setIsDeleteShopOpen}
        onDelete={onDeleteShop}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default ShopDialogs;

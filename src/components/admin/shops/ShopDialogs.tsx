import React from 'react';
import { useShopState } from './hooks/useShopState';
import DeleteShopDialog from './DeleteShopDialog';

// Placeholder for other dialog components that will be implemented later
// import ViewShopDialog from './ViewShopDialog';
// import EditShopDialog from './EditShopDialog';
// import AddShopDialog from './AddShopDialog';

const ShopDialogs = () => {
  // Get all state and handlers from our hook
  const {
    selectedShop,
    isViewShopOpen,
    setIsViewShopOpen,
    isEditShopOpen,
    setIsEditShopOpen,
    isAddShopOpen,
    setIsAddShopOpen,
    isDeleteShopOpen,
    setIsDeleteShopOpen,
    isDeleting,
    handleConfirmDeleteShop
  } = useShopState();

  return (
    <>
      {/* We'll add more dialogs in the future (View, Edit, Add) */}
      
      {/* Delete Shop Dialog */}
      <DeleteShopDialog
        open={isDeleteShopOpen}
        onOpenChange={setIsDeleteShopOpen}
        onDelete={handleConfirmDeleteShop}
        isDeleting={isDeleting}
        shopName={selectedShop?.name}
      />
    </>
  );
};

export default ShopDialogs;

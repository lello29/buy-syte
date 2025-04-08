
import React, { useState } from 'react';
import { useShopState } from './hooks/useShopState';
import DeleteShopDialog from './DeleteShopDialog';
import DeleteAllShopsDialog from './DeleteAllShopsDialog';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

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
    handleConfirmDeleteShop,
    handleDeleteAllShops,
    shopsList
  } = useShopState();

  const [isDeleteAllDialogOpen, setIsDeleteAllDialogOpen] = useState(false);

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

      {/* Delete All Shops Dialog */}
      <DeleteAllShopsDialog
        open={isDeleteAllDialogOpen}
        onOpenChange={setIsDeleteAllDialogOpen}
        onDeleteAll={handleDeleteAllShops}
        isDeleting={isDeleting}
        shopsCount={shopsList.length}
      />
    </>
  );
};

export default ShopDialogs;

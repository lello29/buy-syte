
import React from 'react';
import { useShopState } from './hooks/useShopState';
import ViewShopDialog from './ViewShopDialog';
import EditShopDialog from './dialogs/EditShopDialog';
import DeleteShopDialog from './DeleteShopDialog';
import AddShopDialog from './dialogs/AddShopDialog';
import DeleteAllShopsDialog from './DeleteAllShopsDialog';

const ShopDialogs = () => {
  const {
    selectedShop,
    isViewShopOpen,
    isEditShopOpen,
    isAddShopOpen,
    isDeleteShopOpen,
    isDeleteAllShopsOpen,
    setIsViewShopOpen,
    setIsEditShopOpen,
    setIsAddShopOpen,
    setIsDeleteShopOpen,
    setIsDeleteAllShopsOpen,
    handleSaveChanges,
    handleConfirmDeleteShop,
    handleDeleteAllShops,
    handleShopChange,
    handleCheckboxChange,
    handleSelectChange,
    handleCreateShop,
    isDeleting,
    shopsList,
    isLocating
  } = useShopState();

  return (
    <>
      {/* Visualizza Negozio */}
      {selectedShop && (
        <ViewShopDialog
          open={isViewShopOpen}
          onOpenChange={setIsViewShopOpen}
          shop={selectedShop}
        />
      )}
      
      {/* Modifica Negozio */}
      {selectedShop && (
        <EditShopDialog
          open={isEditShopOpen}
          onOpenChange={setIsEditShopOpen}
          shop={selectedShop}
          onShopChange={handleShopChange}
          onCheckboxChange={handleCheckboxChange}
          onSelectChange={handleSelectChange}
          onSaveChanges={handleSaveChanges}
          onGetLocation={isLocating !== undefined ? undefined : undefined}
          isLocating={isLocating}
        />
      )}
      
      {/* Aggiungi Negozio */}
      <AddShopDialog 
        open={isAddShopOpen}
        onOpenChange={setIsAddShopOpen}
        onCreateShop={(shopData) => {
          if (shopData) {
            return handleCreateShop(shopData);
          }
          return Promise.resolve(false);
        }}
        onSelectChange={handleSelectChange}
      />
      
      {/* Elimina Negozio */}
      {selectedShop && (
        <DeleteShopDialog
          open={isDeleteShopOpen}
          onOpenChange={setIsDeleteShopOpen}
          shopName={selectedShop.name}
          onDelete={handleConfirmDeleteShop}
          isDeleting={isDeleting}
        />
      )}
      
      {/* Elimina Tutti i Negozi */}
      <DeleteAllShopsDialog
        open={isDeleteAllShopsOpen}
        onOpenChange={setIsDeleteAllShopsOpen}
        onDeleteAll={handleDeleteAllShops}
        isDeleting={isDeleting}
        shopsCount={shopsList.length}
      />
    </>
  );
};

export default ShopDialogs;

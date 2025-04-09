
import React from 'react';
import { useShopState } from './hooks/useShopState';
import ViewShopDialog from './ViewShopDialog';
import EditShopDialog from './EditShopDialog';
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
    newShop,
    setNewShop,
    newUser,
    setNewUser,
    createNewUser,
    setCreateNewUser,
    handleNewShopChange,
    handleNewUserChange,
    handleSelectChange,
    handleCreateShop,
    handleShopChange,
    handleCheckboxChange,
    handleSaveChanges,
    handleConfirmDeleteShop,
    handleDeleteAllShops,
    isDeleting,
    shopsList
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
        />
      )}
      
      {/* Aggiungi Negozio */}
      <AddShopDialog 
        open={isAddShopOpen}
        onOpenChange={setIsAddShopOpen}
        newShop={newShop}
        onInputChange={handleNewShopChange}
        onSelectChange={handleSelectChange}
        onCreateShop={handleCreateShop}
      />
      
      {/* Elimina Negozio */}
      {selectedShop && (
        <DeleteShopDialog
          open={isDeleteShopOpen}
          onOpenChange={setIsDeleteShopOpen}
          shopName={selectedShop.name}
          onDelete={handleConfirmDeleteShop}  // Changed from onConfirmDelete to onDelete
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

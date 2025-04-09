
import React, { useEffect } from 'react';
import { useShopState } from './hooks/useShopState';
import ViewShopDialog from './ViewShopDialog';
import EditShopDialog from './dialogs/EditShopDialog';
import DeleteShopDialog from './DeleteShopDialog';
import AddShopDialog from './dialogs/AddShopDialog';
import DeleteAllShopsDialog from './DeleteAllShopsDialog';
import { Shop } from '@/types';

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
    handleGetLocation,
    isLocating,
    isDeleting,
    shopsList
  } = useShopState();

  console.log("ShopDialogs - isAddShopOpen:", isAddShopOpen, "tipo:", typeof isAddShopOpen);

  // Monitoraggio più dettagliato del cambiamento di stato
  useEffect(() => {
    console.log("ShopDialogs useEffect - isAddShopOpen changed:", isAddShopOpen);
    if (isAddShopOpen) {
      // Verifica lo stato del DOM dopo il render
      setTimeout(() => {
        const dialogElement = document.querySelector('[role="dialog"]');
        if (!dialogElement) {
          console.warn("ATTENZIONE: Dialog DOM element non trovato anche se isAddShopOpen è true!");
        } else {
          console.log("Dialog DOM element trovato dopo il cambio di stato");
        }
      }, 100);
    }
  }, [isAddShopOpen]);

  // Verifica che AddShopDialog venga effettivamente renderizzato
  console.log("ShopDialogs - isAddShopOpen prima del render:", isAddShopOpen);

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
          onSaveChanges={() => handleSaveChanges(selectedShop)}
          onGetLocation={handleGetLocation}
          isLocating={isLocating}
        />
      )}
      
      {/* Aggiungi Negozio - Aggiungo log di debug */}
      <AddShopDialog 
        open={isAddShopOpen}
        onOpenChange={(open) => {
          console.log("AddShopDialog onOpenChange chiamato con valore:", open);
          setIsAddShopOpen(open);
          console.log("AddShopDialog onOpenChange - dopo setIsAddShopOpen");
        }}
        onCreateShop={(shopData) => {
          console.log("AddShopDialog onCreateShop chiamato con dati:", shopData);
          if (shopData) {
            return handleCreateShop(shopData);
          }
          return Promise.resolve(null);
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
        shopsCount={shopsList?.length || 0}
      />
    </>
  );
};

export default ShopDialogs;

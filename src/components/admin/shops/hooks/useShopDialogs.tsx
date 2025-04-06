
import { useShopState } from './useShopState';
import { useShopForm } from './useShopForm';

export const useShopDialogs = () => {
  const {
    isAddShopOpen,
    setIsAddShopOpen,
    isEditShopOpen,
    setIsEditShopOpen,
    isViewShopOpen,
    setIsViewShopOpen,
    selectedShop,
    newShop,
    setSelectedShop,
    setNewShop,
    setShopsList
  } = useShopState();

  const {
    handleShopChange,
    handleNewShopChange,
    handleSelectChange,
    handleCheckboxChange,
    handleGetLocation,
    handleCreateShop,
    handleSaveChanges
  } = useShopForm(
    selectedShop,
    setSelectedShop,
    newShop,
    setNewShop,
    setShopsList,
    setIsAddShopOpen,
    setIsEditShopOpen
  );

  return {
    isAddShopOpen,
    setIsAddShopOpen,
    isEditShopOpen,
    setIsEditShopOpen,
    isViewShopOpen,
    setIsViewShopOpen,
    selectedShop,
    newShop,
    handleShopChange,
    handleNewShopChange,
    handleSelectChange,
    handleCheckboxChange,
    handleGetLocation,
    handleCreateShop,
    handleSaveChanges
  };
};

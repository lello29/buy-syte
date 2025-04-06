
import { useShopLocation } from './useShopLocation';
import { useShopEdit } from './useShopEdit';
import { useShopCreate } from './useShopCreate';

export const useShopForm = (
  selectedShop,
  setSelectedShop,
  newShop,
  setNewShop,
  setShopsList,
  setIsAddShopOpen,
  setIsEditShopOpen
) => {
  // Get location-related functionality
  const { handleGetLocation, isLocating } = useShopLocation(setSelectedShop);
  
  // Get shop editing functionality
  const {
    handleShopChange,
    handleSelectChange: handleEditSelectChange,
    handleCheckboxChange,
    handleSaveChanges
  } = useShopEdit(selectedShop, setSelectedShop, setShopsList, setIsEditShopOpen);
  
  // Get shop creation functionality
  const {
    handleNewShopChange,
    handleCreateShop,
    handleSelectChange: handleCreateSelectChange
  } = useShopCreate(setShopsList, setIsAddShopOpen);
  
  // Combined select change handler
  const handleSelectChange = (field, value) => {
    if (selectedShop) {
      handleEditSelectChange(field, value);
    } else {
      handleCreateSelectChange(field, value);
    }
  };

  return {
    handleShopChange,
    handleNewShopChange,
    handleSelectChange,
    handleCheckboxChange,
    handleGetLocation,
    isLocating,
    handleCreateShop,
    handleSaveChanges
  };
};

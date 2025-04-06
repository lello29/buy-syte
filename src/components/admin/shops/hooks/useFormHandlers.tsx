
import { Shop } from '@/types';
import { useShopLocation } from './useShopLocation';
import { useShopEdit } from './useShopEdit';
import { useShopCreate } from './useShopCreate';

export const useFormHandlers = (
  selectedShop: Shop | null,
  setSelectedShop: React.Dispatch<React.SetStateAction<Shop | null>>,
  newShop: any,
  setNewShop: React.Dispatch<React.SetStateAction<any>>,
  setShopsList: React.Dispatch<React.SetStateAction<Shop[]>>,
  setIsAddShopOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsEditShopOpen: React.Dispatch<React.SetStateAction<boolean>>
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
  const handleSelectChange = (field: string, value: string) => {
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

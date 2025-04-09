
import { useCallback } from 'react';
import { Shop } from '@/types';
import { ShopFormData } from './types/shopTypes';
import { toast } from 'sonner';

export const useShopHandlers = (
  selectedShop: Shop | null,
  shopsList: Shop[],
  setSelectedShop: React.Dispatch<React.SetStateAction<Shop | null>>,
  setIsEditShopOpen: (open: boolean) => void,
  setIsDeleteShopOpen: (open: boolean) => void,
  shopActions: any
) => {
  const handleSaveChanges = useCallback(async (shopData: ShopFormData) => {
    if (!selectedShop) return false;
    
    try {
      await shopActions.handleEditShop(selectedShop);
      setIsEditShopOpen(false);
      toast.success("Negozio aggiornato con successo");
      return true;
    } catch (error) {
      console.error("Error saving shop changes:", error);
      toast.error("Errore durante il salvataggio delle modifiche");
      return false;
    }
  }, [selectedShop, shopActions, setIsEditShopOpen]);

  const handleShopChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log("Shop field changed:", e.target.name, e.target.value);
  }, []);
  
  const handleCheckboxChange = useCallback((field: string, checked: boolean) => {
    console.log("Checkbox changed:", field, checked);
  }, []);
  
  const handleSelectChange = useCallback((value: string, name: string) => {
    console.log("Select changed:", name, value);
  }, []);
  
  const handleDeleteButtonClick = useCallback((shopId: string) => {
    const shop = shopsList.find(shop => shop.id === shopId);
    if (shop) {
      setSelectedShop(shop);
      setIsDeleteShopOpen(true);
    } else {
      console.error("Shop not found with ID:", shopId);
    }
  }, [shopsList, setSelectedShop, setIsDeleteShopOpen]);
  
  return {
    handleSaveChanges,
    handleShopChange,
    handleCheckboxChange,
    handleSelectChange,
    handleDeleteButtonClick
  };
};

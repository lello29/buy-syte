
import { Shop } from '@/types';
import { toast } from "sonner";
import { updateShopField, validateShopFields } from '../utils/shopFormUtils';

export const useShopEdit = (
  selectedShop: Shop | null,
  setSelectedShop: React.Dispatch<React.SetStateAction<Shop | null>>,
  setShopsList: React.Dispatch<React.SetStateAction<Shop[]>>,
  setIsEditShopOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const handleShopChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!selectedShop) return;
    
    const { name, value } = e.target;
    setSelectedShop(prev => updateShopField(prev, name, value));
  };
  
  const handleSelectChange = (field: string, value: string) => {
    if (!selectedShop) return;
    
    setSelectedShop(prev => updateShopField(prev, field, value));
  };
  
  const handleCheckboxChange = (field: string, checked: boolean) => {
    if (!selectedShop) return;
    
    setSelectedShop(prev => updateShopField(prev, field, checked));
  };
  
  const handleSaveChanges = () => {
    if (!selectedShop) return;
    
    // Validation
    if (!validateShopFields(selectedShop)) {
      return;
    }
    
    // Update in the local state (would connect to backend in real app)
    setShopsList(prev => 
      prev.map(shop => 
        shop.id === selectedShop.id 
          ? { ...selectedShop, lastUpdated: new Date().toISOString() } 
          : shop
      )
    );
    
    setIsEditShopOpen(false);
    toast.success('Modifiche salvate con successo');
  };

  return {
    handleShopChange,
    handleSelectChange,
    handleCheckboxChange,
    handleSaveChanges
  };
};

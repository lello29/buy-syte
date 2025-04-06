
import { useState } from 'react';
import { Shop } from '@/types';
import { toast } from "sonner";
import { createNewShopObject, validateShopFields } from '../utils/shopFormUtils';

export interface ShopFormData {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  fiscalCode: string;
  vatNumber: string;
  category: string;
}

export const useShopCreate = (
  setShopsList: React.Dispatch<React.SetStateAction<Shop[]>>,
  setIsAddShopOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [newShop, setNewShop] = useState<ShopFormData>({
    name: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    fiscalCode: '',
    vatNumber: '',
    category: '',
  });
  
  const handleNewShopChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewShop(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCreateShop = () => {
    // Validate required fields
    if (!newShop.name || !newShop.address || 
        !newShop.phone || !newShop.email || !newShop.fiscalCode || 
        !newShop.vatNumber) {
      toast.error('Compila tutti i campi obbligatori');
      return;
    }
    
    // Create new shop
    const newShopObj = createNewShopObject(newShop);
    
    setShopsList(prev => [...prev, newShopObj]);
    setNewShop({
      name: '',
      description: '',
      address: '',
      phone: '',
      email: '',
      fiscalCode: '',
      vatNumber: '',
      category: '',
    });
    setIsAddShopOpen(false);
    toast.success('Negozio creato con successo');
  };
  
  const handleSelectChange = (field: string, value: string) => {
    setNewShop(prev => ({ ...prev, [field]: value }));
  };
  
  return {
    newShop,
    setNewShop,
    handleNewShopChange,
    handleCreateShop,
    handleSelectChange
  };
};

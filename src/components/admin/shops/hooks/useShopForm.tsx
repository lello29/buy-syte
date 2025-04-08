import { useState, useCallback } from 'react';
import { Shop } from '@/types';
import { toast } from 'sonner';
import { addShop, updateShop } from '@/services/shop';

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

export interface UseShopFormReturn {
  newShop: ShopFormData;
  setNewShop: React.Dispatch<React.SetStateAction<ShopFormData>>;
  handleNewShopChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (field: string, value: string) => void;
  handleCreateShop: () => void;
  handleShopChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCheckboxChange: (field: string, checked: boolean) => void;
  handleSaveChanges: () => void;
}

export const useShopForm = (
  selectedShop: Shop | null,
  setSelectedShop: React.Dispatch<React.SetStateAction<Shop | null>>,
  setIsAddShopOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsEditShopOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setShopsList: React.Dispatch<React.SetStateAction<Shop[]>>
): UseShopFormReturn => {
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
  
  const handleNewShopChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewShop(prev => ({ ...prev, [name]: value }));
  }, []);
  
  const handleCreateShop = useCallback(async () => {
    if (!newShop.name || !newShop.email || !newShop.address) {
      toast.error('Compila tutti i campi obbligatori');
      return;
    }
    
    try {
      const createdShop = await addShop(newShop);
      if (createdShop) {
        setShopsList(prev => [createdShop, ...prev]);
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
      }
    } catch (error) {
      console.error("Error creating shop:", error);
      toast.error("Errore nella creazione del negozio");
    }
  }, [newShop, setShopsList, setIsAddShopOpen]);
  
  const handleShopChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!selectedShop) return;
    
    const { name, value } = e.target;
    setSelectedShop(prev => prev ? { ...prev, [name]: value } : null);
  }, [selectedShop, setSelectedShop]);
  
  const handleCheckboxChange = useCallback((field: string, checked: boolean) => {
    if (!selectedShop) return;
    
    setSelectedShop(prev => prev ? { ...prev, [field]: checked } : null);
  }, [selectedShop, setSelectedShop]);
  
  const handleSaveChanges = useCallback(async () => {
    if (!selectedShop) return;
    
    if (!selectedShop.name || !selectedShop.email || !selectedShop.address) {
      toast.error('Compila tutti i campi obbligatori');
      return;
    }
    
    try {
      const success = await updateShop(selectedShop.id, selectedShop);
      if (success) {
        setShopsList(prev => 
          prev.map(shop => 
            shop.id === selectedShop.id 
              ? { ...selectedShop, lastUpdated: new Date().toISOString() } 
              : shop
          )
        );
        setIsEditShopOpen(false);
      }
    } catch (error) {
      console.error("Error updating shop:", error);
      toast.error("Errore nell'aggiornamento del negozio");
    }
  }, [selectedShop, setShopsList, setIsEditShopOpen]);
  
  const handleSelectChange = useCallback((field: string, value: string) => {
    if (selectedShop) {
      setSelectedShop(prev => prev ? { ...prev, [field]: value } : null);
    } else {
      setNewShop(prev => ({ ...prev, [field]: value }));
    }
  }, [selectedShop, setSelectedShop]);
  
  return {
    newShop,
    setNewShop,
    handleNewShopChange,
    handleSelectChange,
    handleCreateShop,
    handleShopChange,
    handleCheckboxChange,
    handleSaveChanges,
  };
};

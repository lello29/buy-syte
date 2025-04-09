
import { useState, useCallback } from 'react';
import { Shop } from '@/types';
import { createShop } from '@/services/shop';
import { toast } from 'sonner';

export const useShopCreation = (setShopsList: React.Dispatch<React.SetStateAction<Shop[]>>) => {
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateShop = useCallback(async (shopData: Partial<Shop>) => {
    try {
      setIsCreating(true);
      console.log("Creating shop with data:", shopData);
      
      const newShopData: Omit<Shop, 'id' | 'lastUpdated'> = {
        name: shopData.name || 'Nuovo negozio',
        description: shopData.description || '',
        address: shopData.address || '',
        phone: shopData.phone || '',
        email: shopData.email || '',
        category: shopData.category || 'general',
        isActive: true,
        isApproved: false,
        fiscalCode: shopData.fiscalCode || '',
        vatNumber: shopData.vatNumber || '',
        userId: shopData.userId || '',
        createdAt: new Date().toISOString(),
        aiCredits: 10,
        location: null,
        products: [],
        offers: []
      };
      
      const createdShop = await createShop(newShopData);
      
      if (createdShop) {
        setShopsList(prev => [...prev, createdShop]);
        toast.success("Negozio creato con successo");
        return createdShop;
      } else {
        toast.error("Errore durante la creazione del negozio");
        return null;
      }
    } catch (error) {
      console.error("Error creating shop:", error);
      toast.error("Errore durante la creazione del negozio");
      return null;
    } finally {
      setIsCreating(false);
    }
  }, [setShopsList]);

  return {
    isCreating,
    handleCreateShop
  };
};

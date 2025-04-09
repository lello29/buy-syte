
import { useState, useEffect } from 'react';
import { Shop } from '@/types';
import { fetchShops } from '@/services/shop';
import { toast } from 'sonner';

export const useShopLoader = () => {
  const [shopsList, setShopsList] = useState<Shop[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadShops = async () => {
      setIsLoading(true);
      try {
        const shops = await fetchShops();
        console.log("Loaded shops:", shops?.length || 0);
        setShopsList(shops || []);
      } catch (error) {
        console.error("Error loading shops:", error);
        toast.error("Errore nel caricamento dei negozi");
        setShopsList([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadShops();
  }, []);

  return {
    shopsList,
    setShopsList,
    isLoading
  };
};

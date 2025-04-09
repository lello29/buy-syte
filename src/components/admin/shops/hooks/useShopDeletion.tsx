
import { useState, useCallback } from 'react';
import { Shop } from '@/types';
import { deleteAllShops } from '@/services/shop';
import { toast } from 'sonner';

export const useShopDeletion = (
  setShopsList: React.Dispatch<React.SetStateAction<Shop[]>>,
  setIsDeleteAllShopsOpen: (open: boolean) => void
) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAllShops = useCallback(async () => {
    setIsDeleting(true);
    try {
      const result = await deleteAllShops();
      setIsDeleteAllShopsOpen(false);
      if (result) {
        toast.success("Tutti i negozi sono stati eliminati con successo");
        setShopsList([]);
      } else {
        toast.error("Errore durante l'eliminazione di tutti i negozi");
      }
      return result;
    } catch (error) {
      console.error("Error deleting all shops:", error);
      toast.error("Errore durante l'eliminazione di tutti i negozi");
      return false;
    } finally {
      setIsDeleting(false);
    }
  }, [setIsDeleteAllShopsOpen, setShopsList]);

  return {
    isDeleting,
    setIsDeleting,
    handleDeleteAllShops
  };
};

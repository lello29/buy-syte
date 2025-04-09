
import { useState, useCallback, useEffect } from 'react';
import { useShopDialogState } from './useShopDialogState';
import { useShopActions } from './useShopActions';
import { useShopLocation } from './useShopLocation';
import { Shop } from '@/types';
import { toast } from 'sonner';
import { fetchShops, createShop, deleteAllShops } from '@/services/shop';

export interface ShopFormData {
  id?: string;
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  category?: string;
  fiscalCode?: string;
  vatNumber?: string;
  latitude?: number;
  longitude?: number;
  userId?: string;
  isActive?: boolean;
  isApproved?: boolean;
}

export const useShopState = () => {
  const [shopsList, setShopsList] = useState<Shop[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  
  const {
    selectedShop,
    setSelectedShop,
    isViewShopOpen,
    isEditShopOpen,
    isAddShopOpen,
    isDeleteShopOpen,
    isDeleteAllShopsOpen,
    setIsViewShopOpen,
    setIsEditShopOpen,
    setIsAddShopOpen,
    setIsDeleteShopOpen,
    setIsDeleteAllShopsOpen,
    openAddShopDialog
  } = useShopDialogState();
  
  const { handleGetLocation, isLocating } = useShopLocation();
  
  const shopActions = useShopActions(
    setSelectedShop,
    setIsViewShopOpen,
    setIsEditShopOpen,
    setIsAddShopOpen,
    setIsDeleteShopOpen,
    setShopsList,
    setIsDeleting
  );
  
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
  
  const handleViewShop = useCallback((shop: Shop) => {
    setSelectedShop(shop);
    setIsViewShopOpen(true);
  }, [setSelectedShop, setIsViewShopOpen]);
  
  const handleEditShop = useCallback((shop: Shop) => {
    setSelectedShop(shop);
    setIsEditShopOpen(true);
  }, [setSelectedShop, setIsEditShopOpen]);
  
  // Semplificata la funzione handleAddShop per utilizzare openAddShopDialog
  const handleAddShop = useCallback(() => {
    console.log("handleAddShop chiamato in useShopState");
    openAddShopDialog();
  }, [openAddShopDialog]);
  
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
  
  const handleConfirmDeleteShop = useCallback(async () => {
    if (!selectedShop) return false;
    
    setIsDeleting(true);
    try {
      const result = await shopActions.handleDeleteShop(selectedShop.id);
      setIsDeleteShopOpen(false);
      toast.success(`Negozio "${selectedShop.name}" eliminato con successo`);
      return true;
    } catch (error) {
      console.error("Error deleting shop:", error);
      toast.error("Errore durante l'eliminazione del negozio");
      return false;
    } finally {
      setIsDeleting(false);
    }
  }, [selectedShop, shopActions, setIsDeleteShopOpen]);
  
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
  
  const handleOpenDeleteAllDialog = useCallback(() => {
    setIsDeleteAllShopsOpen(true);
  }, [setIsDeleteAllShopsOpen]);
  
  const handleToggleStatus = useCallback(async (shopId: string, currentStatus: boolean) => {
    try {
      await shopActions.handleToggleStatus(shopId, currentStatus);
    } catch (error) {
      console.error("Error toggling shop status:", error);
    }
  }, [shopActions]);
  
  const handleApproveShop = useCallback(async (shopId: string) => {
    try {
      await shopActions.handleApproveShop(shopId);
    } catch (error) {
      console.error("Error approving shop:", error);
    }
  }, [shopActions]);
  
  return {
    selectedShop,
    isViewShopOpen,
    isEditShopOpen,
    isAddShopOpen,
    isDeleteShopOpen,
    isDeleteAllShopsOpen,
    setIsViewShopOpen,
    setIsEditShopOpen,
    setIsAddShopOpen,
    setIsDeleteShopOpen,
    setIsDeleteAllShopsOpen,
    handleSaveChanges,
    handleConfirmDeleteShop,
    handleDeleteAllShops,
    handleShopChange,
    handleCheckboxChange,
    handleSelectChange,
    handleCreateShop,
    handleViewShop,
    handleEditShop,
    handleAddShop,
    isDeleting,
    isCreating,
    shopsList,
    isLocating,
    isLoading,
    handleDeleteButtonClick,
    handleToggleStatus,
    handleApproveShop,
    handleOpenDeleteAllDialog,
    handleGetLocation
  };
};

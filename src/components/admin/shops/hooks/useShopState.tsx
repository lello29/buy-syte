
import { useState } from 'react';
import { Shop } from '@/types';
import { shops } from '@/data/shops';
import { toast } from 'sonner';

export const useShopState = () => {
  const [shopsList, setShopsList] = useState<Shop[]>(shops);
  const [isAddShopOpen, setIsAddShopOpen] = useState(false);
  const [isEditShopOpen, setIsEditShopOpen] = useState(false);
  const [isViewShopOpen, setIsViewShopOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [newShop, setNewShop] = useState({
    name: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    fiscalCode: '',
    vatNumber: '',
    category: '',
  });

  const handleAddShop = () => {
    setIsAddShopOpen(true);
  };
  
  const handleViewShop = (shop: Shop) => {
    setSelectedShop(shop);
    setIsViewShopOpen(true);
  };
  
  const handleEditShop = (shop: Shop) => {
    setSelectedShop(shop);
    setIsEditShopOpen(true);
  };
  
  const handleDeleteShop = (shopId: string) => {
    // Implementation would connect to backend in a real app
    setShopsList(prev => prev.filter(shop => shop.id !== shopId));
    toast.success('Negozio eliminato con successo');
  };
  
  const handleToggleStatus = (shopId: string, isActive: boolean) => {
    // Implementation would connect to backend in a real app
    setShopsList(prev => 
      prev.map(shop => 
        shop.id === shopId 
          ? { ...shop, isActive } 
          : shop
      )
    );
  };

  return {
    shopsList,
    setShopsList,
    isAddShopOpen,
    setIsAddShopOpen,
    isEditShopOpen,
    setIsEditShopOpen,
    isViewShopOpen,
    setIsViewShopOpen,
    selectedShop,
    setSelectedShop,
    newShop,
    setNewShop,
    handleAddShop,
    handleViewShop,
    handleEditShop,
    handleDeleteShop,
    handleToggleStatus,
  };
};

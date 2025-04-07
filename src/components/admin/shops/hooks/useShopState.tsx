
import { useState } from 'react';
import { Shop } from '@/types';
import { shops as initialShops } from '@/data/mock-data/shops-data';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface UseShopStateReturnType {
  shopsList: Shop[];
  setShopsList: React.Dispatch<React.SetStateAction<Shop[]>>;
  selectedShop: Shop | null;
  setSelectedShop: React.Dispatch<React.SetStateAction<Shop | null>>;
  isViewShopOpen: boolean;
  setIsViewShopOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEditShopOpen: boolean;
  setIsEditShopOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAddShopOpen: boolean;
  setIsAddShopOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newShop: {
    name: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    fiscalCode: string;
    vatNumber: string;
    category: string;
  };
  setNewShop: React.Dispatch<React.SetStateAction<{
    name: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    fiscalCode: string;
    vatNumber: string;
    category: string;
  }>>;
  handleAddShop: () => void;
  handleViewShop: (shop: Shop) => void;
  handleEditShop: (shop: Shop) => void;
  handleDeleteShop: (shopId: string) => void;
  handleToggleStatus: (shopId: string, isActive: boolean) => void;
  handleApproveShop: (shopId: string, isApproved: boolean) => void;
}

export const useShopState = (): UseShopStateReturnType => {
  const [shopsList, setShopsList] = useState<Shop[]>(initialShops);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [isViewShopOpen, setIsViewShopOpen] = useState(false);
  const [isEditShopOpen, setIsEditShopOpen] = useState(false);
  const [isAddShopOpen, setIsAddShopOpen] = useState(false);
  const navigate = useNavigate();
  
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
    setShopsList(prev => prev.filter(shop => shop.id !== shopId));
    toast.success('Negozio eliminato con successo');
  };
  
  const handleToggleStatus = (shopId: string, isActive: boolean) => {
    setShopsList(prev => 
      prev.map(shop => 
        shop.id === shopId ? { ...shop, isActive, lastUpdated: new Date().toISOString() } : shop
      )
    );
    toast.success(`Negozio ${isActive ? 'attivato' : 'disattivato'} con successo`);
  };
  
  const handleApproveShop = (shopId: string, isApproved: boolean) => {
    setShopsList(prev => 
      prev.map(shop => 
        shop.id === shopId ? { ...shop, isApproved, lastUpdated: new Date().toISOString() } : shop
      )
    );
    toast.success(`Negozio ${isApproved ? 'approvato' : 'messo in attesa'} con successo`);
  };
  
  return {
    shopsList,
    setShopsList,
    selectedShop,
    setSelectedShop,
    isViewShopOpen,
    setIsViewShopOpen,
    isEditShopOpen,
    setIsEditShopOpen,
    isAddShopOpen,
    setIsAddShopOpen,
    newShop,
    setNewShop,
    handleAddShop,
    handleViewShop,
    handleEditShop,
    handleDeleteShop,
    handleToggleStatus,
    handleApproveShop
  };
};

import { useState, useCallback, useEffect } from 'react';
import { Shop } from '@/types';
import { shops as initialShops } from '@/data/mock-data/shops-data';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

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
  isDeleteShopOpen: boolean;
  setIsDeleteShopOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
  handleNewShopChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (field: string, value: string) => void;
  handleCreateShop: () => void;
  handleShopChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCheckboxChange: (field: string, checked: boolean) => void;
  handleSaveChanges: () => void;
  handleAddShop: () => void;
  handleViewShop: (shop: Shop) => void;
  handleEditShop: (shop: Shop) => void;
  handleDeleteShop: (shopId: string) => void;
  handleToggleStatus: (shopId: string, isActive: boolean) => void;
  handleApproveShop: (shopId: string, isApproved: boolean) => void;
  isLoading: boolean;
}

export const useShopState = (): UseShopStateReturnType => {
  const [shopsList, setShopsList] = useState<Shop[]>(initialShops);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [isViewShopOpen, setIsViewShopOpen] = useState(false);
  const [isEditShopOpen, setIsEditShopOpen] = useState(false);
  const [isAddShopOpen, setIsAddShopOpen] = useState(false);
  const [isDeleteShopOpen, setIsDeleteShopOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
  
  const handleNewShopChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewShop(prev => ({ ...prev, [name]: value }));
  }, []);
  
  const handleSelectChange = useCallback((field: string, value: string) => {
    if (selectedShop) {
      setSelectedShop(prev => prev ? { ...prev, [field]: value } : null);
    } else {
      setNewShop(prev => ({ ...prev, [field]: value }));
    }
  }, [selectedShop]);
  
  const handleAddShop = useCallback(() => {
    setIsAddShopOpen(true);
  }, []);
  
  const handleCreateShop = useCallback(() => {
    if (!newShop.name || !newShop.email || !newShop.address) {
      toast.error('Compila tutti i campi obbligatori');
      return;
    }
    
    const shopId = `shop-${Date.now()}`;
    const newShopItem: Shop = {
      id: shopId,
      userId: '',
      name: newShop.name,
      description: newShop.description,
      address: newShop.address,
      phone: newShop.phone,
      email: newShop.email,
      fiscalCode: newShop.fiscalCode,
      vatNumber: newShop.vatNumber,
      category: newShop.category,
      isActive: true,
      isApproved: false,
      aiCredits: 100,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      location: null,
      products: [],
      offers: []
    };
    
    setShopsList(prev => [newShopItem, ...prev]);
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
    toast.success('Negozio aggiunto con successo');
  }, [newShop]);
  
  const handleViewShop = useCallback((shop: Shop) => {
    setSelectedShop(shop);
    setIsViewShopOpen(true);
  }, []);
  
  const handleEditShop = useCallback((shop: Shop) => {
    setSelectedShop(shop);
    setIsEditShopOpen(true);
  }, []);
  
  const handleShopChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!selectedShop) return;
    
    const { name, value } = e.target;
    setSelectedShop(prev => prev ? { ...prev, [name]: value } : null);
  }, [selectedShop]);
  
  const handleCheckboxChange = useCallback((field: string, checked: boolean) => {
    if (!selectedShop) return;
    
    setSelectedShop(prev => prev ? { ...prev, [field]: checked } : null);
  }, [selectedShop]);
  
  const handleSaveChanges = useCallback(() => {
    if (!selectedShop) return;
    
    if (!selectedShop.name || !selectedShop.email || !selectedShop.address) {
      toast.error('Compila tutti i campi obbligatori');
      return;
    }
    
    setShopsList(prev => 
      prev.map(shop => 
        shop.id === selectedShop.id 
          ? { ...selectedShop, lastUpdated: new Date().toISOString() } 
          : shop
      )
    );
    
    setIsEditShopOpen(false);
    toast.success('Modifiche salvate con successo');
  }, [selectedShop]);
  
  const handleDeleteShop = useCallback((shopId: string) => {
    setShopsList(prev => prev.filter(shop => shop.id !== shopId));
    setIsDeleteShopOpen(false);
    toast.success('Negozio eliminato con successo');
  }, []);
  
  const handleToggleStatus = useCallback((shopId: string, isActive: boolean) => {
    setShopsList(prev => 
      prev.map(shop => 
        shop.id === shopId ? { ...shop, isActive, lastUpdated: new Date().toISOString() } : shop
      )
    );
    toast.success(`Negozio ${isActive ? 'attivato' : 'disattivato'} con successo`);
  }, []);
  
  const handleApproveShop = useCallback((shopId: string, isApproved: boolean) => {
    setShopsList(prev => 
      prev.map(shop => 
        shop.id === shopId ? { ...shop, isApproved, lastUpdated: new Date().toISOString() } : shop
      )
    );
    toast.success(`Negozio ${isApproved ? 'approvato' : 'messo in attesa'} con successo`);
  }, []);
  
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
    isDeleteShopOpen,
    setIsDeleteShopOpen,
    newShop,
    setNewShop,
    handleNewShopChange,
    handleSelectChange,
    handleCreateShop,
    handleShopChange,
    handleCheckboxChange,
    handleSaveChanges,
    handleAddShop,
    handleViewShop,
    handleEditShop,
    handleDeleteShop,
    handleToggleStatus,
    handleApproveShop,
    isLoading
  };
};

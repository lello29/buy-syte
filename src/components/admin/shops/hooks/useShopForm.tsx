
import React from 'react';
import { Shop } from '@/types';
import { toast } from "sonner";

export const useShopForm = (
  selectedShop: Shop | null,
  setSelectedShop: React.Dispatch<React.SetStateAction<Shop | null>>,
  newShop: { 
    name: string; 
    description: string; 
    address: string; 
    phone: string; 
    email: string; 
    fiscalCode: string; 
    vatNumber: string; 
    category: string; 
  },
  setNewShop: React.Dispatch<React.SetStateAction<{
    name: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    fiscalCode: string;
    vatNumber: string;
    category: string;
  }>>,
  setShopsList: React.Dispatch<React.SetStateAction<Shop[]>>,
  setIsAddShopOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setIsEditShopOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  // Logic for handling shop form changes
  const handleShopChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!selectedShop) return;
    
    const { name, value } = e.target;
    
    // Special handling for location coordinates
    if (name === 'latitude' || name === 'longitude') {
      setSelectedShop(prev => {
        if (!prev) return prev;
        
        const location = prev.location || { latitude: 0, longitude: 0 };
        const newLocation = {
          ...location,
          [name]: parseFloat(value) || 0
        };
        
        return {
          ...prev,
          location: newLocation
        };
      });
      return;
    }

    // Special handling for boolean values like isApproved  
    if (name === 'isApproved') {
      setSelectedShop(prev => {
        if (!prev) return prev;
        return { ...prev, [name]: value === 'true' || value === true };
      });
      return;
    }
    
    // Handle regular inputs
    setSelectedShop(prev => {
      if (!prev) return prev;
      return { ...prev, [name]: value };
    });
  };
  
  // Handler for new shop form
  const handleNewShopChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewShop(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (field: string, value: string) => {
    if (selectedShop) {
      setSelectedShop(prev => {
        if (!prev) return prev;
        return { ...prev, [field]: value };
      });
    } else {
      // For new shop form
      setNewShop(prev => ({ ...prev, [field]: value }));
    }
  };
  
  const handleCheckboxChange = (field: string, checked: boolean) => {
    if (!selectedShop) return;
    
    setSelectedShop(prev => {
      if (!prev) return prev;
      return { ...prev, [field]: checked };
    });
  };
  
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          setSelectedShop(prev => {
            if (!prev) return prev;
            return {
              ...prev,
              location: { latitude, longitude }
            };
          });
          
          toast.success('Posizione rilevata con successo');
        },
        (error) => {
          toast.error(`Errore nel rilevamento della posizione: ${error.message}`);
        }
      );
    } else {
      toast.error('Geolocalizzazione non supportata dal browser');
    }
  };
  
  const handleCreateShop = () => {
    // Validation
    if (!newShop.name || !newShop.address || 
        !newShop.phone || !newShop.email || !newShop.fiscalCode || 
        !newShop.vatNumber) {
      toast.error('Compila tutti i campi obbligatori');
      return;
    }
    
    // Create new shop
    const now = new Date().toISOString();
    const newShopObj: Shop = {
      id: `shop-${Date.now()}`,
      userId: `user-${Date.now()}`,
      name: newShop.name,
      description: newShop.description || '',
      address: newShop.address,
      phone: newShop.phone,
      email: newShop.email,
      products: [],
      offers: [],
      aiCredits: 100, // Default credits
      isActive: true,
      isApproved: false, // Nuovi negozi non sono approvati di default
      lastUpdated: now,
      createdAt: now,
      fiscalCode: newShop.fiscalCode,
      vatNumber: newShop.vatNumber,
      category: newShop.category,
    };
    
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
  
  const handleSaveChanges = () => {
    if (!selectedShop) return;
    
    // Validation
    if (!selectedShop.name || !selectedShop.address || 
        !selectedShop.phone || !selectedShop.email || !selectedShop.fiscalCode || 
        !selectedShop.vatNumber) {
      toast.error('Compila tutti i campi obbligatori');
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
    handleNewShopChange,
    handleSelectChange,
    handleCheckboxChange,
    handleGetLocation,
    handleCreateShop,
    handleSaveChanges
  };
};

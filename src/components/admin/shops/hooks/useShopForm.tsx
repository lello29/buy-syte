
import { useState, useCallback } from 'react';
import { Shop, User } from '@/types';
import { toast } from 'sonner';
import { addShop, updateShop } from '@/services/shop';
import { addUser } from '@/services/userService';

export interface ShopFormData {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  fiscalCode: string;
  vatNumber: string;
  category: string;
  userId?: string;
}

export interface NewUserData {
  name: string;
  email: string;
  role: string;
}

export interface UseShopFormReturn {
  newShop: ShopFormData;
  setNewShop: React.Dispatch<React.SetStateAction<ShopFormData>>;
  newUser: NewUserData;
  setNewUser: React.Dispatch<React.SetStateAction<NewUserData>>;
  createNewUser: boolean;
  setCreateNewUser: React.Dispatch<React.SetStateAction<boolean>>;
  handleNewShopChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleNewUserChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
    userId: '',
  });
  
  const [newUser, setNewUser] = useState<NewUserData>({
    name: '',
    email: '',
    role: 'shop',
  });
  
  const [createNewUser, setCreateNewUser] = useState(false);
  
  const handleNewShopChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewShop(prev => ({ ...prev, [name]: value }));
  }, []);
  
  const handleNewUserChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  }, []);
  
  const handleCreateShop = useCallback(async () => {
    if (!newShop.name || !newShop.email || !newShop.address) {
      toast.error('Compila tutti i campi obbligatori del negozio');
      return;
    }
    
    let userId = newShop.userId;
    
    if (createNewUser) {
      if (!newUser.name || !newUser.email) {
        toast.error('Compila tutti i campi obbligatori per il nuovo utente');
        return;
      }
      
      try {
        const createdUser = await addUser({
          name: newUser.name,
          email: newUser.email,
          role: 'shop',
          isActive: true,
          favorites: [],
          loyaltyPoints: 0
        });
        
        if (!createdUser) {
          toast.error('Errore nella creazione del nuovo utente');
          return;
        }
        
        userId = createdUser.id;
        console.log("Created user with ID:", userId);
        toast.success(`Utente ${newUser.name} creato con successo`);
      } catch (error) {
        console.error("Errore nella creazione dell'utente:", error);
        toast.error("Errore nella creazione dell'utente");
        return;
      }
    } else if (!userId) {
      toast.error('Seleziona un utente per il negozio');
      return;
    }
    
    try {
      const shopData: Omit<Shop, 'id' | 'lastUpdated'> = {
        userId: userId || '',
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
        location: null,
        products: [],
        offers: []
      };
      
      console.log("Creating shop with data:", shopData);
      const createdShop = await addShop(shopData);
      
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
          userId: '',
        });
        setNewUser({
          name: '',
          email: '',
          role: 'shop',
        });
        setCreateNewUser(false);
        setIsAddShopOpen(false);
        toast.success("Negozio creato con successo");
      }
    } catch (error) {
      console.error("Errore nella creazione del negozio:", error);
      toast.error("Errore nella creazione del negozio");
    }
  }, [newShop, newUser, createNewUser, setShopsList, setIsAddShopOpen]);
  
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
    newUser,
    setNewUser,
    createNewUser,
    setCreateNewUser,
    handleNewShopChange,
    handleNewUserChange,
    handleSelectChange,
    handleCreateShop,
    handleShopChange,
    handleCheckboxChange,
    handleSaveChanges,
  };
};

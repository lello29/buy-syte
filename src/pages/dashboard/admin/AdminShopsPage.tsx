
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ShopsTable from '@/components/admin/shops/ShopsTable';
import AddShopDialog from '@/components/admin/shops/AddShopDialog';
import EditShopDialog from '@/components/admin/shops/EditShopDialog';
import ViewShopDialog from '@/components/admin/shops/ViewShopDialog';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileShopsList from '@/components/admin/shops/MobileShopsList';
import { shops } from '@/data/shops';
import { Shop } from '@/types';
import { toast } from 'sonner';

const AdminShopsPage: React.FC = () => {
  const isMobile = useIsMobile();
  const [shopsList, setShopsList] = useState<Shop[]>(shops);
  const [isAddShopOpen, setIsAddShopOpen] = useState(false);
  const [isEditShopOpen, setIsEditShopOpen] = useState(false);
  const [isViewShopOpen, setIsViewShopOpen] = useState(false);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  
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
    
    toast.success(`Negozio ${isActive ? 'attivato' : 'disattivato'} con successo`);
  };
  
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
    
    // Handle checkbox fields that might come as boolean
    if (name === 'isApproved' && typeof e.target.value === 'boolean') {
      setSelectedShop(prev => prev ? { ...prev, [name]: e.target.value } : prev);
      return;
    }
    
    // Handle regular inputs
    setSelectedShop(prev => prev ? { ...prev, [name]: value } : prev);
  };
  
  const handleSelectChange = (field: string, value: string) => {
    if (!selectedShop) return;
    setSelectedShop(prev => prev ? { ...prev, [field]: value } : prev);
  };
  
  const handleCheckboxChange = (field: string, checked: boolean) => {
    if (!selectedShop) return;
    setSelectedShop(prev => prev ? { ...prev, [field]: checked } : prev);
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
  
  const handleSaveChanges = () => {
    if (!selectedShop) return;
    
    // Update in the local state (would connect to backend in real app)
    setShopsList(prev => 
      prev.map(shop => 
        shop.id === selectedShop.id 
          ? selectedShop 
          : shop
      )
    );
    
    setIsEditShopOpen(false);
    toast.success('Modifiche salvate con successo');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Gestione Negozi</h1>
        {!isMobile && (
          <Button onClick={handleAddShop}>
            <Plus className="mr-2 h-4 w-4" />
            Aggiungi nuovo negozio
          </Button>
        )}
      </div>
      
      {isMobile ? (
        <MobileShopsList 
          shops={shopsList} 
          onViewShop={handleViewShop}
          onEditShop={handleEditShop}
          onToggleStatus={handleToggleStatus}
          onDeleteShop={handleDeleteShop}
          onAddShop={handleAddShop}
        />
      ) : (
        <ShopsTable 
          shops={shopsList} 
          onViewShop={handleViewShop}
          onEditShop={handleEditShop}
          onToggleStatus={handleToggleStatus}
          onDeleteShop={handleDeleteShop}
        />
      )}
      
      <AddShopDialog 
        open={isAddShopOpen} 
        onOpenChange={setIsAddShopOpen} 
      />
      
      <ViewShopDialog 
        shop={selectedShop}
        open={isViewShopOpen}
        onOpenChange={setIsViewShopOpen}
      />
      
      <EditShopDialog 
        shop={selectedShop}
        open={isEditShopOpen}
        onOpenChange={setIsEditShopOpen}
        onShopChange={handleShopChange}
        onSelectChange={handleSelectChange}
        onCheckboxChange={handleCheckboxChange}
        onGetLocation={handleGetLocation}
        onSaveChanges={handleSaveChanges}
      />
    </div>
  );
};

export default AdminShopsPage;

import React, { useState } from 'react';
import { shops } from '@/data/shops';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Shop } from '@/types';
import ShopsTable from '@/components/admin/shops/ShopsTable';
import ViewShopDialog from '@/components/admin/shops/ViewShopDialog';
import EditShopDialog from '@/components/admin/shops/EditShopDialog';
import AddShopDialog from '@/components/admin/shops/AddShopDialog';

const AdminShopsPage = () => {
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [shopsList, setShopsList] = useState<Shop[]>(shops);
  
  const [newShop, setNewShop] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    aiCredits: 100,
  });

  const handleViewShop = (shop: Shop) => {
    setSelectedShop(shop);
    setViewDialogOpen(true);
  };

  const handleEditShop = (shop: Shop) => {
    setSelectedShop(shop);
    setEditDialogOpen(true);
  };

  const handleApproveShop = () => {
    if (!selectedShop) return;

    const updatedShops = shopsList.map(shop => 
      shop.id === selectedShop.id 
        ? { ...selectedShop, isApproved: selectedShop.isApproved === false ? true : selectedShop.isApproved }
        : shop
    );
    
    setShopsList(updatedShops);
    toast({
      title: "Negozio aggiornato",
      description: `Il negozio "${selectedShop.name}" è stato aggiornato con successo.`
    });
    setEditDialogOpen(false);
  };

  const handleAddShop = () => {
    setAddDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editDialogOpen && selectedShop) {
      setSelectedShop({ 
        ...selectedShop, 
        [name]: name === 'aiCredits' 
          ? parseInt(value as string) 
          : name === 'isApproved'
          ? value === true || value === 'true'
          : value 
      });
    } else if (addDialogOpen) {
      setNewShop({ 
        ...newShop, 
        [name]: name === 'aiCredits' ? parseInt(value as string) : value 
      });
    }
  };

  const handleCreateShop = () => {
    const newShopWithId: Shop = {
      ...newShop,
      id: `shop-${Date.now()}`,
      userId: `user-${Date.now()}`,
      description: "",
      products: [],
      offers: [],
      isApproved: false,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      logoImage: 'https://placehold.co/400x300',
      bannerImage: 'https://placehold.co/400x300',
    };
    
    setShopsList([...shopsList, newShopWithId]);
    toast({
      title: "Negozio creato",
      description: `Il negozio "${newShop.name}" è stato creato con successo.`
    });
    setAddDialogOpen(false);
    setNewShop({
      name: '',
      address: '',
      email: '',
      phone: '',
      aiCredits: 100,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestione Negozi</h1>
        <Button onClick={handleAddShop}>
          <Plus className="mr-1 h-4 w-4" /> Aggiungi Negozio
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Tutti i Negozi</CardTitle>
        </CardHeader>
        <CardContent>
          <ShopsTable
            shops={shopsList}
            onViewShop={handleViewShop}
            onEditShop={handleEditShop}
          />
        </CardContent>
      </Card>

      <ViewShopDialog 
        shop={selectedShop}
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
      />

      <EditShopDialog 
        shop={selectedShop}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onShopChange={handleInputChange}
        onSaveChanges={handleApproveShop}
      />

      <AddShopDialog 
        newShop={newShop}
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onInputChange={handleInputChange}
        onCreateShop={handleCreateShop}
      />
    </div>
  );
};

export default AdminShopsPage;

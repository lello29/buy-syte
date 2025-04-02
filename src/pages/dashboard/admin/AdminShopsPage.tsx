
import React, { useState } from 'react';
import { shops } from '@/data/shops';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Pencil, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { getProductsByShopId } from '@/data/products';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const AdminShopsPage = () => {
  const [selectedShop, setSelectedShop] = useState<any>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [shopsList, setShopsList] = useState(shops);
  const isMobile = useIsMobile();
  
  // Add shop form state
  const [newShop, setNewShop] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    aiCredits: 100,
  });

  const handleViewShop = (shop: any) => {
    setSelectedShop(shop);
    setViewDialogOpen(true);
  };

  const handleEditShop = (shop: any) => {
    setSelectedShop(shop);
    setEditDialogOpen(true);
  };

  const handleApproveShop = () => {
    // In a real application, this would call an API to update the shop
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
      setSelectedShop({ ...selectedShop, [name]: value });
    } else if (addDialogOpen) {
      setNewShop({ ...newShop, [name]: name === 'aiCredits' ? parseInt(value) : value });
    }
  };

  const handleCreateShop = () => {
    const newShopWithId = {
      ...newShop,
      id: `shop-${Date.now()}`,
      isApproved: false,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      imageUrl: 'https://placehold.co/400x300',
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Indirizzo</TableHead>
                <TableHead>Prodotti</TableHead>
                <TableHead>Crediti AI</TableHead>
                <TableHead>Ultimo aggiornamento</TableHead>
                <TableHead>Stato</TableHead>
                <TableHead className="text-right">Azioni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shopsList.map((shop) => (
                <TableRow key={shop.id}>
                  <TableCell className="font-medium">{shop.name}</TableCell>
                  <TableCell>{shop.address}</TableCell>
                  <TableCell>{getProductsByShopId(shop.id).length}</TableCell>
                  <TableCell>{shop.aiCredits}</TableCell>
                  <TableCell>{new Date(shop.lastUpdated).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={shop.isApproved === false ? "warning" : "success"}>
                      {shop.isApproved === false ? "In attesa" : "Approvato"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleViewShop(shop)}
                      >
                        <Eye className="mr-1 h-4 w-4" /> {!isMobile && "Visualizza"}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditShop(shop)}
                      >
                        <Pencil className="mr-1 h-4 w-4" /> {!isMobile && "Modifica"}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Shop Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Dettagli Negozio</DialogTitle>
          </DialogHeader>
          {selectedShop && (
            <div className="space-y-4">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-gray-500">Nome</span>
                <span>{selectedShop.name}</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-gray-500">Indirizzo</span>
                <span>{selectedShop.address}</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-gray-500">Email</span>
                <span>{selectedShop.email}</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-gray-500">Telefono</span>
                <span>{selectedShop.phone}</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-gray-500">Crediti AI</span>
                <span>{selectedShop.aiCredits}</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-gray-500">Ultimo aggiornamento</span>
                <span>{new Date(selectedShop.lastUpdated).toLocaleDateString()}</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-gray-500">Data creazione</span>
                <span>{new Date(selectedShop.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Shop Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Modifica Negozio</DialogTitle>
          </DialogHeader>
          {selectedShop && (
            <div className="space-y-4">
              <div className="flex flex-col space-y-1">
                <Label htmlFor="name">Nome</Label>
                <Input 
                  id="name"
                  name="name"
                  value={selectedShop.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col space-y-1">
                <Label htmlFor="address">Indirizzo</Label>
                <Input 
                  id="address"
                  name="address"
                  value={selectedShop.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  value={selectedShop.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col space-y-1">
                <Label htmlFor="phone">Telefono</Label>
                <Input 
                  id="phone"
                  name="phone"
                  value={selectedShop.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col space-y-1">
                <Label htmlFor="aiCredits">Crediti AI</Label>
                <Input 
                  id="aiCredits"
                  name="aiCredits"
                  type="number" 
                  value={selectedShop.aiCredits}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="isApproved" 
                  name="isApproved"
                  checked={selectedShop.isApproved !== false}
                  onChange={(e) => setSelectedShop({...selectedShop, isApproved: e.target.checked})}
                />
                <Label htmlFor="isApproved">Approvato</Label>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                  Annulla
                </Button>
                <Button onClick={handleApproveShop}>
                  Salva Modifiche
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Shop Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Aggiungi Nuovo Negozio</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex flex-col space-y-1">
              <Label htmlFor="new-name">Nome</Label>
              <Input 
                id="new-name"
                name="name"
                value={newShop.name}
                onChange={handleInputChange}
                placeholder="Nome del negozio"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <Label htmlFor="new-address">Indirizzo</Label>
              <Input 
                id="new-address"
                name="address"
                value={newShop.address}
                onChange={handleInputChange}
                placeholder="Indirizzo"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <Label htmlFor="new-email">Email</Label>
              <Input 
                id="new-email"
                name="email"
                type="email"
                value={newShop.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <Label htmlFor="new-phone">Telefono</Label>
              <Input 
                id="new-phone"
                name="phone"
                value={newShop.phone}
                onChange={handleInputChange}
                placeholder="Numero di telefono"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <Label htmlFor="new-aiCredits">Crediti AI</Label>
              <Input 
                id="new-aiCredits"
                name="aiCredits"
                type="number" 
                value={newShop.aiCredits}
                onChange={handleInputChange}
                placeholder="Crediti AI"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                Annulla
              </Button>
              <Button onClick={handleCreateShop}>
                Crea Negozio
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminShopsPage;

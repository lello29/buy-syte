
import React, { useState } from 'react';
import { shops } from '@/data/shops';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Pencil } from 'lucide-react';
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

const AdminShopsPage = () => {
  const [selectedShop, setSelectedShop] = useState<any>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const isMobile = useIsMobile();

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
    toast({
      title: "Negozio approvato",
      description: `Il negozio "${selectedShop.name}" è stato approvato.`
    });
    setEditDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestione Negozi</h1>
        <Button>Aggiungi Negozio</Button>
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
              {shops.map((shop) => (
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
                <span className="text-sm font-medium text-gray-500">Nome</span>
                <input 
                  type="text" 
                  className="border p-2 rounded" 
                  defaultValue={selectedShop.name}
                />
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-gray-500">Indirizzo</span>
                <input 
                  type="text" 
                  className="border p-2 rounded" 
                  defaultValue={selectedShop.address}
                />
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-gray-500">Email</span>
                <input 
                  type="email" 
                  className="border p-2 rounded" 
                  defaultValue={selectedShop.email}
                />
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-gray-500">Telefono</span>
                <input 
                  type="text" 
                  className="border p-2 rounded" 
                  defaultValue={selectedShop.phone}
                />
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-gray-500">Crediti AI</span>
                <input 
                  type="number" 
                  className="border p-2 rounded" 
                  defaultValue={selectedShop.aiCredits}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="isApproved" 
                  defaultChecked={selectedShop.isApproved !== false}
                />
                <label htmlFor="isApproved">Approvato</label>
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
    </div>
  );
};

export default AdminShopsPage;

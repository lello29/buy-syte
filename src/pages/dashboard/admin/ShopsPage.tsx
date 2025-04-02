
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Check, X, Store, PenLine, Trash2, Eye } from "lucide-react";
import { shops, getProductsByShopId } from "@/data/mockData";
import { Shop } from "@/types";
import { toast } from "@/components/ui/use-toast";

const AdminShopsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const filteredShops = shops.filter(shop => 
    shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewShop = (shop: Shop) => {
    setSelectedShop(shop);
    setIsViewDialogOpen(true);
  };

  const handleDeleteConfirmation = (shopId: string) => {
    setConfirmDeleteId(shopId);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (confirmDeleteId) {
      // In a real app, this would call an API to delete the shop
      toast({
        title: "Negozio eliminato",
        description: "Il negozio è stato eliminato con successo.",
      });
      setIsDeleteDialogOpen(false);
      setConfirmDeleteId(null);
    }
  };

  const toggleApprovalStatus = (shop: Shop) => {
    // In a real app, this would call an API to update the shop
    toast({
      title: shop.isApproved ? "Approvazione revocata" : "Negozio approvato",
      description: shop.isApproved 
        ? "Il negozio non è più approvato." 
        : "Il negozio è ora approvato.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestione Negozi</h1>
          <p className="text-gray-600">
            Gestione e controllo dei negozi sulla piattaforma.
          </p>
        </div>
      </div>
      
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <Input
            placeholder="Cerca per nome, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            Esporta dati
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left p-3 font-medium">Nome</th>
                  <th className="text-left p-3 font-medium">Email</th>
                  <th className="text-left p-3 font-medium">Prodotti</th>
                  <th className="text-center p-3 font-medium">Stato</th>
                  <th className="text-right p-3 font-medium">Azioni</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredShops.map((shop) => {
                  const productCount = getProductsByShopId(shop.id).length;
                  return (
                    <tr key={shop.id} className="hover:bg-gray-50">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          {shop.logoImage ? (
                            <img 
                              src={shop.logoImage} 
                              alt={shop.name} 
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                              <Store className="w-4 h-4 text-gray-500" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium">{shop.name}</p>
                            <p className="text-xs text-gray-500">
                              ID: {shop.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">{shop.email}</td>
                      <td className="p-3">{productCount}</td>
                      <td className="p-3 text-center">
                        <Badge 
                          variant={shop.isApproved ? "success" : "secondary"}
                          className={shop.isApproved 
                            ? "bg-green-100 text-green-800 hover:bg-green-100" 
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                          }
                        >
                          {shop.isApproved ? "Approvato" : "In attesa"}
                        </Badge>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleViewShop(shop)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => toggleApprovalStatus(shop)}
                          >
                            {shop.isApproved ? (
                              <X className="w-4 h-4 text-red-500" />
                            ) : (
                              <Check className="w-4 h-4 text-green-500" />
                            )}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleDeleteConfirmation(shop.id)}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filteredShops.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-3 text-center text-gray-500">
                      Nessun negozio trovato
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* View Shop Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Dettagli Negozio</DialogTitle>
          </DialogHeader>
          {selectedShop && (
            <div className="space-y-4">
              {selectedShop.bannerImage && (
                <div className="h-40 rounded-md overflow-hidden">
                  <img 
                    src={selectedShop.bannerImage} 
                    alt={`${selectedShop.name} banner`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex gap-4 items-center">
                {selectedShop.logoImage ? (
                  <img 
                    src={selectedShop.logoImage} 
                    alt={selectedShop.name} 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                    <Store className="w-8 h-8 text-gray-500" />
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-bold">{selectedShop.name}</h2>
                  <p className="text-gray-500">{selectedShop.email}</p>
                </div>
                <div className="ml-auto">
                  <Badge variant={selectedShop.isApproved ? "success" : "secondary"}>
                    {selectedShop.isApproved ? "Approvato" : "In attesa"}
                  </Badge>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Indirizzo</Label>
                  <p className="text-sm">{selectedShop.address}</p>
                </div>
                <div className="space-y-2">
                  <Label>Telefono</Label>
                  <p className="text-sm">{selectedShop.phone}</p>
                </div>
                <div className="space-y-2">
                  <Label>Crediti AI</Label>
                  <p className="text-sm">{selectedShop.aiCredits}</p>
                </div>
                <div className="space-y-2">
                  <Label>Data Creazione</Label>
                  <p className="text-sm">{new Date(selectedShop.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="space-y-2">
                  <Label>Data Ultimo Aggiornamento</Label>
                  <p className="text-sm">{new Date(selectedShop.lastUpdated).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Descrizione</Label>
                <p className="text-sm border p-3 rounded-md">{selectedShop.description}</p>
              </div>

              {selectedShop.aboutUs && (
                <div className="space-y-2">
                  <Label>Chi Siamo</Label>
                  <p className="text-sm border p-3 rounded-md">{selectedShop.aboutUs}</p>
                </div>
              )}

              {selectedShop.openingHours && (
                <div className="space-y-2">
                  <Label>Orari di Apertura</Label>
                  <p className="text-sm border p-3 rounded-md whitespace-pre-line">{selectedShop.openingHours}</p>
                </div>
              )}

              {selectedShop.categories && selectedShop.categories.length > 0 && (
                <div className="space-y-2">
                  <Label>Categorie</Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedShop.categories.map((category, index) => (
                      <Badge key={index} variant="outline">{category}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedShop.socialLinks && (
                <div className="space-y-2">
                  <Label>Social Media</Label>
                  <div className="flex gap-3">
                    {selectedShop.socialLinks.facebook && (
                      <a href={selectedShop.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Facebook</a>
                    )}
                    {selectedShop.socialLinks.instagram && (
                      <a href={selectedShop.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">Instagram</a>
                    )}
                    {selectedShop.socialLinks.twitter && (
                      <a href={selectedShop.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Twitter</a>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <Switch id="approved-status" checked={!!selectedShop.isApproved} />
                  <Label htmlFor="approved-status">Approvato</Label>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Chiudi
            </Button>
            <Button>
              <PenLine className="w-4 h-4 mr-2" />
              Modifica
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Conferma eliminazione</DialogTitle>
            <DialogDescription>
              Sei sicuro di voler eliminare questo negozio? Questa azione non può essere annullata.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Annulla</Button>
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="w-4 h-4 mr-2" /> Elimina
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminShopsPage;

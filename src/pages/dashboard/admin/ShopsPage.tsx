
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Store, Package, Check, X, Sparkles, Eye, Trash2, Edit } from "lucide-react";
import { shops, getProductsByShopId } from "@/data/mockData";
import { Shop } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ShopsPage = () => {
  const { currentUser } = useAuth();
  const [approvalFilters, setApprovalFilters] = useState<"all" | "approved" | "pending">("all");
  const [shopsData, setShopsData] = useState(shops);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Non sei autorizzato a visualizzare questa pagina.</p>
      </div>
    );
  }

  const handleApproveShop = (shopId: string) => {
    // In a real application, this would be an API call
    const updatedShops = shopsData.map(shop => 
      shop.id === shopId ? { ...shop, isApproved: true } : shop
    );
    setShopsData(updatedShops);
    toast.success("Negozio approvato con successo");
  };
  
  const handleRejectShop = (shopId: string) => {
    // In a real application, this would be an API call
    const updatedShops = shopsData.map(shop => 
      shop.id === shopId ? { ...shop, isApproved: false } : shop
    );
    setShopsData(updatedShops);
    toast.success("Negozio rifiutato");
  };
  
  const handleAssignPromotion = (shopId: string) => {
    // In a real application, this would be an API call
    toast.success("Pacchetto promozionale assegnato con successo");
  };

  const handleDeleteShop = (shopId: string) => {
    // In a real application, this would be an API call
    const updatedShops = shopsData.filter(shop => shop.id !== shopId);
    setShopsData(updatedShops);
    setIsDeleteDialogOpen(false);
    setSelectedShop(null);
    toast.success("Negozio eliminato con successo");
  };

  const openViewDialog = (shop: Shop) => {
    setSelectedShop(shop);
    setIsViewDialogOpen(true);
  };

  const openDeleteDialog = (shop: Shop) => {
    setSelectedShop(shop);
    setIsDeleteDialogOpen(true);
  };

  const filteredShops = approvalFilters === "all" 
    ? shopsData 
    : shopsData.filter(shop => 
        approvalFilters === "approved" ? shop.isApproved : !shop.isApproved
      );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gestione Negozi</h1>
      <p className="text-gray-600">
        Visualizza e gestisci i negozi registrati sulla piattaforma.
      </p>

      <div className="flex flex-wrap gap-3 mb-6">
        <Button 
          variant={approvalFilters === "all" ? "default" : "outline"} 
          onClick={() => setApprovalFilters("all")}
        >
          Tutti
        </Button>
        <Button 
          variant={approvalFilters === "approved" ? "default" : "outline"} 
          onClick={() => setApprovalFilters("approved")}
        >
          Approvati
        </Button>
        <Button 
          variant={approvalFilters === "pending" ? "default" : "outline"} 
          onClick={() => setApprovalFilters("pending")}
        >
          In attesa
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store className="h-5 w-5 text-primary" />
            Lista Negozi
          </CardTitle>
          <CardDescription>
            Elenco di tutti i negozi registrati sulla piattaforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Indirizzo</TableHead>
                  <TableHead>Prodotti</TableHead>
                  <TableHead>Creato</TableHead>
                  <TableHead>Stato</TableHead>
                  <TableHead>Promozione</TableHead>
                  <TableHead className="text-right">Azioni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredShops.map((shop) => (
                  <TableRow key={shop.id}>
                    <TableCell>
                      <div className="font-medium">{shop.name}</div>
                      <div className="text-xs text-muted-foreground">{shop.email}</div>
                    </TableCell>
                    <TableCell>{shop.address}</TableCell>
                    <TableCell>
                      {getProductsByShopId(shop.id).length}
                    </TableCell>
                    <TableCell>
                      {new Date(shop.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant={shop.isApproved ? "success" : "warning"}>
                        {shop.isApproved ? "Approvato" : "In Attesa"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {parseInt(shop.id) < 3 ? (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          <Sparkles className="h-3 w-3 mr-1" /> Attiva
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200">
                          Nessuna
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {!shop.isApproved && (
                          <>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleApproveShop(shop.id)}
                            >
                              <Check className="mr-1 h-4 w-4" /> Approva
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="text-destructive border-destructive hover:bg-destructive/10"
                              onClick={() => handleRejectShop(shop.id)}
                            >
                              <X className="mr-1 h-4 w-4" /> Rifiuta
                            </Button>
                          </>
                        )}
                        {shop.isApproved && parseInt(shop.id) >= 3 && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-blue-600 border-blue-200 hover:bg-blue-50"
                            onClick={() => handleAssignPromotion(shop.id)}
                          >
                            <Sparkles className="mr-1 h-4 w-4" /> Promuovi
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => openViewDialog(shop)}
                        >
                          <Eye className="mr-1 h-4 w-4" /> Dettagli
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-red-600 hover:bg-red-100"
                          onClick={() => openDeleteDialog(shop)}
                        >
                          <Trash2 className="mr-1 h-4 w-4" /> Elimina
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Shop Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" /> Dettagli Negozio
            </DialogTitle>
            <DialogDescription>
              Informazioni dettagliate sul negozio
            </DialogDescription>
          </DialogHeader>
          {selectedShop && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">ID</p>
                  <p className="font-mono">{selectedShop.id}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Stato</p>
                  <Badge variant={selectedShop.isApproved ? "success" : "warning"}>
                    {selectedShop.isApproved ? "Approvato" : "In Attesa"}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Nome</p>
                  <p>{selectedShop.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p>{selectedShop.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Telefono</p>
                  <p>{selectedShop.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Indirizzo</p>
                  <p>{selectedShop.address}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Creato il</p>
                  <p>{new Date(selectedShop.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Ultimo aggiornamento</p>
                  <p>{new Date(selectedShop.lastUpdated).toLocaleDateString()}</p>
                </div>
                <div className="space-y-1 col-span-2">
                  <p className="text-sm font-medium text-gray-500">Descrizione</p>
                  <p className="text-sm">{selectedShop.description}</p>
                </div>
              </div>

              <div className="pt-4">
                <p className="text-sm font-medium text-gray-500 mb-2">Statistiche</p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-3 rounded-md text-center">
                    <p className="text-2xl font-bold">{getProductsByShopId(selectedShop.id).length}</p>
                    <p className="text-xs text-gray-500">Prodotti</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md text-center">
                    <p className="text-2xl font-bold">{selectedShop.offers.length}</p>
                    <p className="text-xs text-gray-500">Offerte</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-md text-center">
                    <p className="text-2xl font-bold">{selectedShop.aiCredits}</p>
                    <p className="text-xs text-gray-500">Crediti AI</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsViewDialogOpen(false)}
                >
                  Chiudi
                </Button>
                <Button 
                  variant="outline"
                  className="text-blue-600 hover:bg-blue-50"
                >
                  <Edit className="mr-1 h-4 w-4" /> Modifica
                </Button>
                <Button 
                  variant="outline"
                  className="text-red-600 hover:bg-red-100"
                  onClick={() => {
                    setIsViewDialogOpen(false);
                    openDeleteDialog(selectedShop);
                  }}
                >
                  <Trash2 className="mr-1 h-4 w-4" /> Elimina
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Shop Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600">Conferma Eliminazione</DialogTitle>
            <DialogDescription>
              Sei sicuro di voler eliminare questo negozio? Questa azione non può essere annullata.
            </DialogDescription>
          </DialogHeader>
          {selectedShop && (
            <div className="space-y-4">
              <div className="bg-red-50 p-4 rounded-md">
                <p className="text-sm"><strong>Nome:</strong> {selectedShop.name}</p>
                <p className="text-sm"><strong>Email:</strong> {selectedShop.email}</p>
                <p className="text-sm"><strong>ID:</strong> {selectedShop.id}</p>
                <p className="text-sm"><strong>Prodotti:</strong> {getProductsByShopId(selectedShop.id).length}</p>
              </div>
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsDeleteDialogOpen(false)}
                >
                  Annulla
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => handleDeleteShop(selectedShop.id)}
                >
                  Elimina Negozio
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShopsPage;

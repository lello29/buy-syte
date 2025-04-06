
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
import { Package, Eye, Edit, Check, X, Plus } from "lucide-react";
import { products, shops } from "@/data/mockData";
import { useIsMobile } from '@/hooks/use-mobile';
import MobileProductsList from "@/components/products/MobileProductsList";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const ProductsPage = () => {
  const { currentUser } = useAuth();
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const isMobile = useIsMobile();

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Non sei autorizzato a visualizzare questa pagina.</p>
      </div>
    );
  }

  // Get unique categories
  const categories = Array.from(new Set(products.map(product => product.category)));

  const handleToggleProductStatus = (id: string, isActive: boolean) => {
    toast.success(`Stato del prodotto aggiornato con successo`);
  };

  const filteredProducts = products
    .filter(product => statusFilter === "all" ? true : statusFilter === "active" ? product.isActive : !product.isActive)
    .filter(product => categoryFilter === "all" ? true : product.category === categoryFilter);

  const getShopName = (shopId: string) => {
    const shop = shops.find(s => s.id === shopId);
    return shop ? shop.name : "Negozio non trovato";
  };

  // Create a mapping of shop IDs to shop names for easy lookup
  const shopNames: Record<string, string> = {};
  shops.forEach(shop => {
    shopNames[shop.id] = shop.name;
  });

  const handleViewProduct = (product: any) => {
    setSelectedProduct(product);
    setViewDialogOpen(true);
  };

  const handleAddProduct = () => {
    toast.info("Funzionalità in sviluppo");
  };

  const mobileHeader = (
    <div className="md:hidden">
      <h1 className="text-3xl font-bold mb-2">Gestione Prodotti</h1>
      <p className="text-gray-600 mb-6">
        Elenco di tutti i prodotti sulla piattaforma
      </p>
    </div>
  );

  return (
    <div className="space-y-6">
      {!isMobile && (
        <>
          <h1 className="text-3xl font-bold">Gestione Prodotti</h1>
          <p className="text-gray-600">
            Visualizza e gestisci i prodotti disponibili sulla piattaforma.
          </p>
        </>
      )}

      {isMobile ? (
        <>
          {mobileHeader}
          
          {/* Mobile Filters */}
          <div className="flex flex-col gap-4 mb-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Stato</h3>
              <div className="flex flex-wrap gap-2">
                <Button 
                  size="sm"
                  variant={statusFilter === "all" ? "default" : "outline"} 
                  onClick={() => setStatusFilter("all")}
                >
                  Tutti
                </Button>
                <Button 
                  size="sm"
                  variant={statusFilter === "active" ? "default" : "outline"} 
                  onClick={() => setStatusFilter("active")}
                >
                  Attivi
                </Button>
                <Button 
                  size="sm"
                  variant={statusFilter === "inactive" ? "default" : "outline"} 
                  onClick={() => setStatusFilter("inactive")}
                >
                  Inattivi
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Categoria</h3>
              <div className="flex overflow-x-auto gap-2 pb-2">
                <Button 
                  size="sm"
                  variant={categoryFilter === "all" ? "default" : "outline"} 
                  onClick={() => setCategoryFilter("all")}
                >
                  Tutte
                </Button>
                {categories.map(category => (
                  <Button 
                    key={category}
                    size="sm"
                    className="whitespace-nowrap"
                    variant={categoryFilter === category ? "default" : "outline"} 
                    onClick={() => setCategoryFilter(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          <MobileProductsList 
            products={filteredProducts}
            shopNames={shopNames}
            onToggleProductStatus={handleToggleProductStatus}
            onAddProduct={handleAddProduct}
            onViewProduct={handleViewProduct}
          />
        </>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Stato</h3>
              <div className="flex flex-wrap gap-2">
                <Button 
                  size="sm"
                  variant={statusFilter === "all" ? "default" : "outline"} 
                  onClick={() => setStatusFilter("all")}
                >
                  Tutti
                </Button>
                <Button 
                  size="sm"
                  variant={statusFilter === "active" ? "default" : "outline"} 
                  onClick={() => setStatusFilter("active")}
                >
                  Attivi
                </Button>
                <Button 
                  size="sm"
                  variant={statusFilter === "inactive" ? "default" : "outline"} 
                  onClick={() => setStatusFilter("inactive")}
                >
                  Inattivi
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Categoria</h3>
              <div className="flex flex-wrap gap-2">
                <Button 
                  size="sm"
                  variant={categoryFilter === "all" ? "default" : "outline"} 
                  onClick={() => setCategoryFilter("all")}
                >
                  Tutte
                </Button>
                {categories.map(category => (
                  <Button 
                    key={category}
                    size="sm"
                    variant={categoryFilter === category ? "default" : "outline"} 
                    onClick={() => setCategoryFilter(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  Lista Prodotti
                </CardTitle>
                <CardDescription>
                  Elenco di tutti i prodotti disponibili sulla piattaforma
                </CardDescription>
              </div>
              <Button onClick={handleAddProduct}>
                <Plus className="mr-1 h-4 w-4" /> Aggiungi Prodotto
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium">Nome</th>
                        <th className="px-4 py-3 text-left font-medium">Negozio</th>
                        <th className="px-4 py-3 text-left font-medium">Categoria</th>
                        <th className="px-4 py-3 text-left font-medium">Prezzo</th>
                        <th className="px-4 py-3 text-left font-medium">Inventario</th>
                        <th className="px-4 py-3 text-left font-medium">Stato</th>
                        <th className="px-4 py-3 text-right font-medium">Azioni</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredProducts.map((product) => (
                        <TableRow 
                          key={product.id}
                          product={product}
                          getShopName={getShopName}
                          onToggleStatus={handleToggleProductStatus}
                          onViewProduct={handleViewProduct}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* View Product Details Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" /> Dettagli Prodotto
            </DialogTitle>
            <DialogDescription>
              Informazioni dettagliate sul prodotto
            </DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">ID</p>
                  <p className="font-mono">{selectedProduct.id}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Stato</p>
                  <Badge variant={selectedProduct.isActive ? "success" : "destructive"}>
                    {selectedProduct.isActive ? "Attivo" : "Inattivo"}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Nome</p>
                  <p>{selectedProduct.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Categoria</p>
                  <p>{selectedProduct.category}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Prezzo</p>
                  <p>€{selectedProduct.price.toFixed(2)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Prezzo Scontato</p>
                  <p>{selectedProduct.discountPrice ? `€${selectedProduct.discountPrice.toFixed(2)}` : "N/A"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Inventario</p>
                  <p>{selectedProduct.inventory} unità</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Negozio</p>
                  <p>{getShopName(selectedProduct.shopId)}</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">Descrizione</p>
                <p className="text-sm text-gray-700">{selectedProduct.description}</p>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setViewDialogOpen(false)}
                >
                  Chiudi
                </Button>
                <Button 
                  variant={selectedProduct.isActive ? "destructive" : "default"}
                  onClick={() => {
                    handleToggleProductStatus(selectedProduct.id, !selectedProduct.isActive);
                    setViewDialogOpen(false);
                  }}
                >
                  {selectedProduct.isActive ? "Disattiva" : "Attiva"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Extracted to a separate component for cleaner code
const TableRow = ({ product, getShopName, onToggleStatus, onViewProduct }) => {
  return (
    <tr>
      <td className="px-4 py-3 text-left">
        <div className="font-medium">{product.name}</div>
        <div className="text-xs text-muted-foreground truncate max-w-[200px]">
          {product.description.substring(0, 50)}...
        </div>
      </td>
      <td className="px-4 py-3 text-left">{getShopName(product.shopId)}</td>
      <td className="px-4 py-3 text-left">{product.category}</td>
      <td className="px-4 py-3 text-left">
        {product.discountPrice ? (
          <div>
            <span className="font-medium">€{product.discountPrice.toFixed(2)}</span>
            <span className="text-xs text-muted-foreground line-through ml-1">
              €{product.price.toFixed(2)}
            </span>
          </div>
        ) : (
          <span>€{product.price.toFixed(2)}</span>
        )}
      </td>
      <td className="px-4 py-3 text-left">{product.inventory}</td>
      <td className="px-4 py-3 text-left">
        <Badge variant={product.isActive ? "success" : "destructive"}>
          {product.isActive ? "Attivo" : "Inattivo"}
        </Badge>
      </td>
      <td className="px-4 py-3 text-right">
        <div className="flex justify-end gap-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onToggleStatus(product.id, !product.isActive)}
          >
            {product.isActive ? (
              <><X className="h-4 w-4" /> Disattiva</>
            ) : (
              <><Check className="h-4 w-4" /> Attiva</>
            )}
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onViewProduct(product)}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default ProductsPage;

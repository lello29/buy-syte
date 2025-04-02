
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
import { Package, Eye, Edit, Check, X } from "lucide-react";
import { products, shops } from "@/data/mockData";

const ProductsPage = () => {
  const { currentUser } = useAuth();
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

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

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gestione Prodotti</h1>
      <p className="text-gray-600">
        Visualizza e gestisci i prodotti disponibili sulla piattaforma.
      </p>

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
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Lista Prodotti
          </CardTitle>
          <CardDescription>
            Elenco di tutti i prodotti disponibili sulla piattaforma
          </CardDescription>
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
                    <tr key={product.id}>
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
                            onClick={() => handleToggleProductStatus(product.id, !product.isActive)}
                          >
                            {product.isActive ? (
                              <><X className="h-4 w-4" /> Disattiva</>
                            ) : (
                              <><Check className="h-4 w-4" /> Attiva</>
                            )}
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductsPage;

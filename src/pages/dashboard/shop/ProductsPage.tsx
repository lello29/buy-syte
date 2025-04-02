
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { getProductsByShopId, shops } from "@/data/mockData";
import { Package, Plus, Search, Upload, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

const ProductsPage = () => {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  
  if (!currentUser || currentUser.role !== "shop") {
    return <div>Accesso non autorizzato</div>;
  }
  
  const shop = shops.find(shop => shop.userId === currentUser.id);
  
  if (!shop) {
    return <div>Negozio non trovato</div>;
  }
  
  const products = getProductsByShopId(shop.id);
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gestione Prodotti</h1>
          <p className="text-gray-600">
            Gestisci il catalogo prodotti del tuo negozio.
          </p>
        </div>
        
        <div className="flex gap-4">
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nuovo Prodotto
          </Button>
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Importa CSV
          </Button>
        </div>
      </div>
      
      <div className="flex items-center gap-4 bg-white p-2 rounded-lg border">
        <Search className="h-5 w-5 text-gray-400" />
        <Input
          placeholder="Cerca prodotti per nome o categoria..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-0 focus-visible:ring-0 flex-1"
        />
      </div>
      
      {filteredProducts.length > 0 ? (
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">Nome</th>
                  <th className="px-4 py-3 text-left">Categoria</th>
                  <th className="px-4 py-3 text-right">Prezzo</th>
                  <th className="px-4 py-3 text-right">Sconto</th>
                  <th className="px-4 py-3 text-right">Inventario</th>
                  <th className="px-4 py-3 text-left">Stato</th>
                  <th className="px-4 py-3 text-right">Azioni</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-4 py-3">{product.name}</td>
                    <td className="px-4 py-3">{product.category}</td>
                    <td className="px-4 py-3 text-right">
                      €{product.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {product.discountPrice ? (
                        <span className="text-green-600">
                          -€{(product.price - product.discountPrice).toFixed(2)}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {product.inventory}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                        product.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.isActive ? 'Attivo' : 'Disattivato'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="icon" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="py-10">
            <div className="text-center space-y-4">
              <Package className="h-10 w-10 text-gray-400 mx-auto" />
              <h3 className="font-medium text-lg">Nessun prodotto trovato</h3>
              {searchTerm ? (
                <p className="text-gray-500">
                  Nessun prodotto corrisponde alla tua ricerca. Prova con altri termini.
                </p>
              ) : (
                <p className="text-gray-500">
                  Il tuo catalogo è vuoto. Aggiungi il tuo primo prodotto!
                </p>
              )}
              <Button 
                className="mt-4" 
                onClick={() => {
                  setSearchTerm("");
                  setShowAddModal(true);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Aggiungi Prodotto
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Basic product metrics */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">Totale prodotti</span>
              <span className="text-3xl font-bold">{products.length}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">Prodotti attivi</span>
              <span className="text-3xl font-bold">
                {products.filter(p => p.isActive).length}
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">In offerta</span>
              <span className="text-3xl font-bold">
                {products.filter(p => p.discountPrice).length}
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm">Esauriti</span>
              <span className="text-3xl font-bold">
                {products.filter(p => p.inventory === 0).length}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Product tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Suggerimenti per aumentare le vendite</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm">
              <div className="rounded-full w-5 h-5 bg-primary text-white flex items-center justify-center text-xs mt-0.5">1</div>
              <span>Aggiungi <strong>immagini di alta qualità</strong> per tutti i tuoi prodotti</span>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <div className="rounded-full w-5 h-5 bg-primary text-white flex items-center justify-center text-xs mt-0.5">2</div>
              <span>Scrivi <strong>descrizioni dettagliate</strong> che rispondano alle domande dei clienti</span>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <div className="rounded-full w-5 h-5 bg-primary text-white flex items-center justify-center text-xs mt-0.5">3</div>
              <span>Crea <strong>offerte speciali</strong> per i prodotti più popolari</span>
            </li>
            <li className="flex items-start gap-2 text-sm">
              <div className="rounded-full w-5 h-5 bg-primary text-white flex items-center justify-center text-xs mt-0.5">4</div>
              <span>Utilizza l'<strong>assistenza AI</strong> per ottimizzare le tue schede prodotto</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductsPage;

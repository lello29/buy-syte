
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardCard from "../cards/DashboardCard";
import { Package, ShoppingBag, BarChart3, Calendar, Users, Store } from "lucide-react";
import { getProductsByShopId, shops } from "@/data/mockData";

interface ShopDashboardProps {
  userId: string;
}

const ShopDashboard: React.FC<ShopDashboardProps> = ({ userId }) => {
  const shop = shops.find(shop => shop.userId === userId);
  
  if (!shop) {
    return <div>Negozio non trovato</div>;
  }
  
  const shopProducts = getProductsByShopId(shop.id);
  
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Prodotti"
          description="Gestisci il tuo catalogo"
          value={shopProducts.length.toString()}
          icon={<Package className="h-8 w-8 text-purple-600" />}
          linkTo="/dashboard/products"
        />
        
        <DashboardCard
          title="Ordini Ricevuti"
          description="Ordini da evadere"
          value={(Math.floor(Math.random() * 10) + 1).toString()}
          icon={<ShoppingBag className="h-8 w-8 text-blue-600" />}
          linkTo="/dashboard/shop-orders"
        />
        
        <DashboardCard
          title="Crediti AI"
          description="Crediti disponibili per assistenza AI"
          value={shop.aiCredits.toString()}
          icon={<BarChart3 className="h-8 w-8 text-green-600" />}
          linkTo="/dashboard/ai-credits"
        />
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Prodotti Recenti</h2>
      {shopProducts.length > 0 ? (
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">Nome Prodotto</th>
                  <th className="px-4 py-3 text-left">Categoria</th>
                  <th className="px-4 py-3 text-right">Prezzo</th>
                  <th className="px-4 py-3 text-right">Inventario</th>
                  <th className="px-4 py-3 text-left">Stato</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {shopProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-4 py-3">{product.name}</td>
                    <td className="px-4 py-3">{product.category}</td>
                    <td className="px-4 py-3 text-right">
                      €{product.price.toFixed(2)}
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
                      <Button size="sm" variant="ghost">Modifica</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-gray-500">Non hai ancora aggiunto prodotti.</p>
            <Button className="mt-4">Aggiungi Prodotto</Button>
          </CardContent>
        </Card>
      )}

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Statistiche Negozio</CardTitle>
            <CardDescription>Dati degli ultimi 30 giorni</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Visite totali:</span>
                <span className="font-medium">{Math.floor(Math.random() * 500) + 100}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Conversioni:</span>
                <span className="font-medium">{Math.floor(Math.random() * 50) + 10}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Ultimo aggiornamento:</span>
                <span className="font-medium">
                  {new Date(shop.lastUpdated).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Offerte attive:</span>
                <span className="font-medium">{shop.offers.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Azioni Rapide</CardTitle>
            <CardDescription>Gestisci il tuo negozio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full justify-start">
                <Package className="mr-2 h-4 w-4" /> Aggiungi Nuovo Prodotto
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="mr-2 h-4 w-4" /> Crea Nuova Offerta
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" /> Cerca Collaboratori
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Store className="mr-2 h-4 w-4" /> Modifica Informazioni Negozio
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShopDashboard;

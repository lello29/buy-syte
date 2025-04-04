
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardCard from "../cards/DashboardCard";
import { Users, Store, User, Package, ShoppingBag } from "lucide-react";
import { getUsersByRole, shops, products, collaborators } from "@/data/mockData";

const AdminDashboard: React.FC = () => {
  const allUsers = getUsersByRole("user").length;
  const allShops = shops.length;
  const allProducts = products.length;
  
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Utenti"
          description="Utenti registrati"
          value={allUsers.toString()}
          icon={<Users className="h-8 w-8 text-blue-600" />}
          linkTo="/dashboard/users"
        />
        
        <DashboardCard
          title="Negozi"
          description="Negozi attivi"
          value={allShops.toString()}
          icon={<Store className="h-8 w-8 text-green-600" />}
          linkTo="/dashboard/shops"
        />
        
        <DashboardCard
          title="Collaboratori"
          description="Collaboratori registrati"
          value={collaborators.length.toString()}
          icon={<User className="h-8 w-8 text-purple-600" />}
          linkTo="/dashboard/admin-collaborators"
        />
        
        <DashboardCard
          title="Prodotti"
          description="Prodotti totali"
          value={allProducts.toString()}
          icon={<Package className="h-8 w-8 text-orange-600" />}
          linkTo="/dashboard/admin-products"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Negozi recenti</CardTitle>
            <CardDescription>Ultimi negozi registrati</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left">Nome</th>
                    <th className="px-4 py-3 text-left">Data</th>
                    <th className="px-4 py-3 text-left">Prodotti</th>
                    <th className="px-4 py-3 text-left">Stato</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {shops.slice(0, 4).map((shop) => (
                    <tr key={shop.id}>
                      <td className="px-4 py-3">{shop.name}</td>
                      <td className="px-4 py-3">
                        {new Date(shop.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        {getProductsByShopId(shop.id).length}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-block px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                          Attivo
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button variant="ghost" size="sm" className="w-full mt-4">
                Visualizza tutti
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Attività recenti</CardTitle>
            <CardDescription>Ultime azioni sulla piattaforma</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center gap-4">
                <div className="bg-blue-100 text-blue-700 p-2 rounded-full">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm">Nuovo utente registrato</p>
                  <p className="text-xs text-gray-500">2 ore fa</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-green-100 text-green-700 p-2 rounded-full">
                  <Package className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm">5 nuovi prodotti aggiunti</p>
                  <p className="text-xs text-gray-500">3 ore fa</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-amber-100 text-amber-700 p-2 rounded-full">
                  <ShoppingBag className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm">Nuovo ordine completato</p>
                  <p className="text-xs text-gray-500">5 ore fa</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="bg-purple-100 text-purple-700 p-2 rounded-full">
                  <Store className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm">Nuovo negozio registrato</p>
                  <p className="text-xs text-gray-500">6 ore fa</p>
                </div>
              </li>
            </ul>
            <Button variant="ghost" size="sm" className="w-full mt-4">
              Visualizza tutte le attività
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Statistiche Globali</CardTitle>
          <CardDescription>Panoramica della piattaforma</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Crediti AI utilizzati</h3>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold">
                  {shops.reduce((acc, shop) => acc + (100 - shop.aiCredits), 0)}
                </span>
                <span className="text-sm text-gray-500">di 1000</span>
              </div>
              <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary" 
                  style={{ 
                    width: `${(shops.reduce((acc, shop) => acc + (100 - shop.aiCredits), 0) / 1000) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Prodotti inattivi</h3>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold">
                  {products.filter(p => !p.isActive).length}
                </span>
                <span className="text-sm text-gray-500">
                  prodotti
                </span>
              </div>
              <Button variant="outline" size="sm" className="mt-4">
                Visualizza dettagli
              </Button>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Negozi non aggiornati</h3>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-bold">
                  {shops.filter(shop => {
                    const lastUpdated = new Date(shop.lastUpdated);
                    const thirtyDaysAgo = new Date();
                    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                    return lastUpdated < thirtyDaysAgo;
                  }).length}
                </span>
                <span className="text-sm text-gray-500">
                  negozi
                </span>
              </div>
              <Button variant="outline" size="sm" className="mt-4">
                Invia promemoria
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;


import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardCard from "../cards/DashboardCard";
import { ShoppingBag, Heart, Award } from "lucide-react";
import { getOrdersByUserId, shops, products } from "@/data/mockData";

interface UserDashboardProps {
  userId: string;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ userId }) => {
  const orders = getOrdersByUserId(userId);
  
  return (
    <div className="space-y-6">
      <div className="bg-primary text-white p-4 -mx-4 -mt-6 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard Cliente</h1>
          <Button variant="ghost" className="text-white hover:bg-white/20">
            Logout
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Ordini Recenti"
          description="Monitora i tuoi ultimi acquisti"
          value={orders.length.toString()}
          icon={<ShoppingBag className="h-8 w-8 text-blue-600" />}
          linkTo="/dashboard/orders"
        />
        
        <DashboardCard
          title="Negozi Preferiti"
          description="I negozi che segui"
          value={(Math.floor(Math.random() * 5) + 1).toString()}
          icon={<Heart className="h-8 w-8 text-red-500" />}
          linkTo="/dashboard/favorites"
        />
        
        <DashboardCard
          title="Punti Fedeltà"
          description="Accumula punti con i tuoi acquisti"
          value={Math.floor(Math.random() * 200 + 50).toString()}
          icon={<Award className="h-8 w-8 text-amber-500" />}
          linkTo="/dashboard/loyalty"
        />
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Ordini Recenti</h2>
      {orders.length > 0 ? (
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">ID Ordine</th>
                  <th className="px-4 py-3 text-left">Negozio</th>
                  <th className="px-4 py-3 text-left">Data</th>
                  <th className="px-4 py-3 text-left">Stato</th>
                  <th className="px-4 py-3 text-right">Totale</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-4 py-3">{order.id}</td>
                    <td className="px-4 py-3">
                      {shops.find(shop => shop.id === order.shopId)?.name || 'N/A'}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                        order.status === 'delivered' 
                          ? 'bg-green-100 text-green-800' 
                          : order.status === 'processing' 
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status === 'delivered' 
                          ? 'Consegnato' 
                          : order.status === 'processing' 
                          ? 'In Lavorazione'
                          : order.status === 'shipped'
                          ? 'Spedito'
                          : 'In Attesa'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-medium">
                      €{order.totalPrice.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button size="sm" variant="ghost">Dettagli</Button>
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
            <p className="text-gray-500">Non hai ancora effettuato ordini.</p>
            <Link to="/shops">
              <Button className="mt-4">Visita i negozi</Button>
            </Link>
          </CardContent>
        </Card>
      )}

      <h2 className="text-2xl font-semibold mt-8 mb-4">Prodotti consigliati</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(0, 4).map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-40 bg-gray-100">
              <img
                src={product.images[0] || "/placeholder.svg"} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-gray-500 text-sm line-clamp-2 mt-1">
                {product.description}
              </p>
              <div className="mt-2 flex justify-between items-center">
                <span className="font-bold">
                  {product.discountPrice ? (
                    <>
                      €{product.discountPrice.toFixed(2)}
                      <span className="text-xs text-gray-500 line-through ml-1">
                        €{product.price.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    `€${product.price.toFixed(2)}`
                  )}
                </span>
                <Button size="sm" variant="outline">
                  Dettagli
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;

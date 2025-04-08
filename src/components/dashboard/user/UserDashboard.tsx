
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Calendar, Gift, ShoppingBag } from "lucide-react";
import { User, Order } from "@/types";
import { users, getOrdersByUserId } from "@/data/mockData";
import DashboardCard from "../cards/DashboardCard";

interface UserDashboardProps {
  userId: string;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ userId }) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  
  useEffect(() => {
    // Find user data
    const user = users.find(u => u.id === userId);
    if (user) {
      setUserData(user);
    }
    
    // Get recent orders
    const orders = getOrdersByUserId(userId);
    setRecentOrders(orders);
  }, [userId]);
  
  if (!userData) return <div>Caricamento dati utente...</div>;
  
  return (
    <div className="space-y-8">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Benvenuto, {userData.name}</h2>
          <Button variant="outline" size="sm">
            Modifica profilo
          </Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-4">
          <DashboardCard
            title="Ordini Totali"
            description="I tuoi acquisti"
            value={recentOrders.length.toString()}
            icon={<ShoppingBag className="h-8 w-8 text-blue-600" />}
            linkTo="/dashboard/orders"
          />
          
          <DashboardCard
            title="Preferiti"
            description="I tuoi negozi preferiti"
            value={userData.favorites.length.toString()}
            icon={<Heart className="h-8 w-8 text-red-600" />}
            linkTo="/dashboard/favorites"
          />
          
          <DashboardCard
            title="Punti Fedeltà"
            description="Il tuo saldo punti"
            value={userData.loyaltyPoints.toString()}
            icon={<Gift className="h-8 w-8 text-purple-600" />}
            linkTo="/dashboard/loyalty"
          />
          
          <DashboardCard
            title="Prossima Consegna"
            description="In arrivo"
            value={recentOrders.some(o => o.status === 'processing') ? "In arrivo" : "Nessuna"}
            icon={<Calendar className="h-8 w-8 text-green-600" />}
            linkTo="/dashboard/orders"
          />
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>I tuoi ordini recenti</CardTitle>
        </CardHeader>
        <CardContent>
          {recentOrders.length > 0 ? (
            <div className="space-y-4">
              {recentOrders.slice(0, 5).map(order => (
                <div key={order.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Ordine #{order.id.substring(0, 8)}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()} ·{' '}
                      {order.products.length} {order.products.length === 1 ? 'prodotto' : 'prodotti'}
                    </p>
                  </div>
                  <div className="mt-2 md:mt-0 flex flex-col md:flex-row md:items-center gap-3">
                    <div className="text-right">
                      <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status === 'delivered' ? 'Consegnato' : 
                        order.status === 'shipped' ? 'Spedito' : 
                        order.status === 'processing' ? 'In lavorazione' : 
                        order.status === 'cancelled' ? 'Annullato' : 
                        'In attesa'}
                      </span>
                    </div>
                    <div className="font-bold text-right">
                      €{order.totalPrice.toFixed(2)}
                    </div>
                    <Button variant="outline" size="sm">
                      Dettagli
                    </Button>
                  </div>
                </div>
              ))}
              <div className="text-center mt-4">
                <Button variant="ghost">
                  Vedi tutti gli ordini
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Non hai ancora effettuato ordini</p>
              <Button variant="outline" className="mt-4">
                Inizia lo shopping
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;

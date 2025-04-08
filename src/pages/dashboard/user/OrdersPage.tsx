
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth";
import { Order } from "@/types";

// Mock data helper function
const getOrdersByUserId = (userId: string): Order[] => {
  return []; // Return empty array as placeholder
};

const OrdersPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (currentUser) {
      // Get orders for this user
      const userOrders = getOrdersByUserId(currentUser.id);
      setOrders(userOrders);
    }
  }, [currentUser]);

  if (!currentUser) {
    return <div>Caricamento ordini...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">I miei ordini</h1>
      
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-semibold">Ordine #{order.id.substring(0, 8)}</h2>
              <span 
                className={`px-2 py-1 text-xs rounded-full ${
                  order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                  order.status === 'processing' ? 'bg-amber-100 text-amber-800' :
                  order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}
              >
                {order.status === 'delivered' ? 'Consegnato' : 
                 order.status === 'shipped' ? 'Spedito' : 
                 order.status === 'processing' ? 'In elaborazione' :
                 order.status === 'cancelled' ? 'Annullato' : 'In attesa'}
              </span>
            </div>
            
            <div className="mt-3 space-y-2">
              {order.products.map((item, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <div>
                    <span className="font-medium">{item.productName}</span> 
                    <span className="text-gray-500"> × {item.quantity}</span>
                  </div>
                  <div className="font-medium">
                    €{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-3 border-t flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
              <span className="text-base font-bold">
                Totale: €{order.totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
        
        {orders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nessun ordine trovato</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;

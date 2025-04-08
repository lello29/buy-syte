
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth";
import { Order } from "@/types";

// Mock data helper function
const getOrdersByUserId = (userId: string): Order[] => {
  return []; // Return empty array as placeholder
};

const LoyaltyPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (currentUser) {
      // Get orders for this user to calculate loyalty points
      const userOrders = getOrdersByUserId(currentUser.id);
      setOrders(userOrders);
    }
  }, [currentUser]);

  if (!currentUser) {
    return <div>Caricamento dati fedeltà...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Programma Fedeltà</h1>
      
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold">I tuoi punti fedeltà</h2>
          <div className="text-4xl font-bold text-primary mt-2">
            {currentUser.loyaltyPoints || 0}
          </div>
          <p className="text-gray-500 mt-1">
            Punti accumulati finora
          </p>
        </div>
        
        <div className="mt-8">
          <h3 className="font-medium mb-3">Come funziona:</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Guadagna 1 punto per ogni euro speso</li>
            <li>Ottieni 100 punti extra ad ogni ordine completato</li>
            <li>Ogni 500 punti ricevi un buono sconto del 10%</li>
            <li>I punti non hanno scadenza</li>
          </ul>
        </div>
      </div>
      
      {orders.length > 0 ? (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">Storico punti</h2>
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ordine
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Punti Guadagnati
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map(order => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      #{order.id.substring(0, 8)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {Math.round(order.totalPrice)} + 100 = {Math.round(order.totalPrice) + 100}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="mt-6 text-center py-8 bg-white shadow-sm rounded-lg">
          <p className="text-gray-500">Nessun punto fedeltà accumulato finora</p>
        </div>
      )}
    </div>
  );
};

export default LoyaltyPage;

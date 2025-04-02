
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { getOrdersByUserId, shops } from "@/data/mockData";
import { format } from "date-fns";
import { it } from "date-fns/locale";

const OrdersPage = () => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <div>Caricamento...</div>;
  }
  
  const orders = getOrdersByUserId(currentUser.id);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">I Miei Ordini</h1>
      <p className="text-gray-600">
        Visualizza e gestisci i tuoi ordini.
      </p>
      
      <div className="mt-6">
        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => {
              const shop = shops.find(s => s.id === order.shopId);
              
              return (
                <Card key={order.id} className="overflow-hidden">
                  <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Ordine #{order.id}</h3>
                      <p className="text-sm text-gray-500">
                        Effettuato il {format(new Date(order.createdAt), "d MMMM yyyy", { locale: it })}
                      </p>
                    </div>
                    <div>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs ${
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
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-500">Negozio:</h4>
                      <p>{shop?.name || 'N/A'}</p>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Prodotti:</h4>
                      <div className="space-y-2">
                        {order.products.map((product, idx) => (
                          <div key={idx} className="flex justify-between text-sm py-1 border-b">
                            <span>
                              {product.quantity}x {product.productName}
                            </span>
                            <span className="font-medium">
                              €{product.price.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-gray-500">Totale:</span>
                        <span className="font-bold text-lg ml-2">
                          €{order.totalPrice.toFixed(2)}
                        </span>
                      </div>
                      <Button variant="outline" size="sm">
                        Dettagli Ordine
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="py-10 text-center">
              <p className="text-gray-500 mb-4">Non hai ancora effettuato ordini.</p>
              <Button onClick={() => window.location.href = "/shops"}>
                Visita i negozi
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;

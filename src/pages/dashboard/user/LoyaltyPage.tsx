
import React from "react";
import LoyaltyCard from "@/components/dashboard/LoyaltyCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { getOrdersByUserId } from "@/data/mockData";
import { Award, ShoppingBag, Star, Calendar } from "lucide-react";

const LoyaltyPage = () => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <div>Caricamento...</div>;
  }
  
  const orders = getOrdersByUserId(currentUser.id);
  const totalSpent = orders.reduce((acc, order) => acc + order.totalPrice, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Punti Fedeltà</h1>
      <p className="text-gray-600">
        Gestisci il tuo programma fedeltà e accumula vantaggi.
      </p>
      
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <LoyaltyCard />
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-blue-500" />
                Storico Punti
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Punti totali accumulati:</span>
                  <span className="font-medium">{currentUser.loyaltyPoints}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Totale spesa:</span>
                  <span className="font-medium">€{totalSpent.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Ordini completati:</span>
                  <span className="font-medium">{orders.length}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Punti disponibili:</span>
                  <span className="font-medium text-lg">{currentUser.loyaltyPoints}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-500" />
                Vantaggi del tuo livello
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-md">
                  <Calendar className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Offerte esclusive</h4>
                    <p className="text-sm text-gray-600">
                      Accesso anticipato alle offerte speciali dei negozi che segui
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-md">
                  <Award className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Punti bonus</h4>
                    <p className="text-sm text-gray-600">
                      x2 punti su ogni acquisto durante il tuo compleanno
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-md">
                  <ShoppingBag className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Spedizione gratuita</h4>
                    <p className="text-sm text-gray-600">
                      Su tutti gli ordini superiori a €30
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyPage;

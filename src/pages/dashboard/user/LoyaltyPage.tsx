
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth";
import { getOrdersByUserId } from "@/data/mockData";
import { Order } from "@/types";

const LoyaltyPage: React.FC = () => {
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
    return <div>Caricamento programma fedeltà...</div>;
  }

  // Calculate points based on orders
  const totalPoints = currentUser.loyaltyPoints || orders.length * 10;
  
  // Define loyalty tiers
  const tiers = [
    { name: "Standard", points: 0, benefits: ["Accesso alle promozioni base"] },
    { name: "Silver", points: 50, benefits: ["5% di sconto sugli ordini", "Spedizione gratuita"] },
    { name: "Gold", points: 100, benefits: ["10% di sconto sugli ordini", "Spedizione prioritaria", "Accesso anticipato alle offerte"] },
    { name: "Platinum", points: 200, benefits: ["15% di sconto sugli ordini", "Spedizione prioritaria", "Accesso anticipato alle offerte", "Assistenza dedicata"] }
  ];

  // Determine user's current tier
  const currentTier = tiers
    .filter(tier => totalPoints >= tier.points)
    .reduce((highest, tier) => tier.points > highest.points ? tier : highest, tiers[0]);
  
  // Find next tier
  const nextTierIndex = tiers.findIndex(tier => tier.name === currentTier.name) + 1;
  const nextTier = nextTierIndex < tiers.length ? tiers[nextTierIndex] : null;
  const pointsToNextTier = nextTier ? nextTier.points - totalPoints : 0;
  
  // Calculate progress percentage to next tier
  const progressPercentage = nextTier 
    ? Math.min(100, (totalPoints - currentTier.points) * 100 / (nextTier.points - currentTier.points))
    : 100;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Programma Fedeltà</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Il tuo stato</h2>
          
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-primary text-white p-3 rounded-full">
              <span className="text-lg font-bold">{totalPoints}</span>
            </div>
            <div>
              <p className="font-medium">Punti Fedeltà</p>
              <p className="text-sm text-gray-500">Livello {currentTier.name}</p>
            </div>
          </div>
          
          {nextTier && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progresso verso {nextTier.name}</span>
                <span>{totalPoints}/{nextTier.points} punti</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500">
                Ti mancano {pointsToNextTier} punti per raggiungere il livello {nextTier.name}
              </p>
            </div>
          )}
          
          <div className="mt-6">
            <h3 className="font-medium mb-2">I tuoi vantaggi:</h3>
            <ul className="list-disc pl-5 space-y-1">
              {currentTier.benefits.map((benefit, index) => (
                <li key={index} className="text-gray-600">{benefit}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Come guadagnare punti</h2>
          
          <ul className="space-y-3">
            <li className="flex space-x-3">
              <div className="bg-primary/10 text-primary p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              </div>
              <div>
                <p className="font-medium">Acquisti</p>
                <p className="text-sm text-gray-500">Guadagni 1 punto per ogni €1 speso</p>
              </div>
            </li>
            
            <li className="flex space-x-3">
              <div className="bg-primary/10 text-primary p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              </div>
              <div>
                <p className="font-medium">Recensioni</p>
                <p className="text-sm text-gray-500">Guadagni 5 punti per ogni recensione</p>
              </div>
            </li>
            
            <li className="flex space-x-3">
              <div className="bg-primary/10 text-primary p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"/></svg>
              </div>
              <div>
                <p className="font-medium">Referral</p>
                <p className="text-sm text-gray-500">Guadagni 20 punti per ogni amico invitato</p>
              </div>
            </li>
          </ul>
          
          <div className="mt-6 space-y-4">
            <h3 className="font-medium">Storico punti:</h3>
            {orders.length > 0 ? (
              <ul className="space-y-2">
                {orders.slice(0, 5).map((order, index) => (
                  <li key={index} className="flex justify-between text-sm">
                    <span>Ordine #{order.id.substring(0, 8)}</span>
                    <span className="font-medium">+{Math.round(order.totalPrice)} punti</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">Nessun punto guadagnato ancora</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyPage;

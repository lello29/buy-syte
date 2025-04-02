
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Award } from "lucide-react";

const LoyaltyCard = () => {
  const { currentUser } = useAuth();
  const loyaltyPoints = currentUser?.loyaltyPoints || 0;
  
  // Calculate loyalty level based on points
  const getLoyaltyLevel = (points: number) => {
    if (points >= 500) return { level: "Oro", color: "text-amber-500", percentage: 100 };
    if (points >= 200) return { level: "Argento", color: "text-gray-400", percentage: 75 };
    if (points >= 100) return { level: "Bronzo", color: "text-amber-700", percentage: 50 };
    return { level: "Standard", color: "text-blue-500", percentage: 25 };
  };
  
  const loyalty = getLoyaltyLevel(loyaltyPoints);
  const nextLevel = loyalty.level === "Standard" ? "Bronzo" : 
                   loyalty.level === "Bronzo" ? "Argento" : 
                   loyalty.level === "Argento" ? "Oro" : "Massimo";
  
  const pointsForNextLevel = loyalty.level === "Standard" ? 100 - loyaltyPoints :
                            loyalty.level === "Bronzo" ? 200 - loyaltyPoints :
                            loyalty.level === "Argento" ? 500 - loyaltyPoints : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-amber-500" />
          Programma Fedeltà
        </CardTitle>
        <CardDescription>
          Accumula punti e sblocca vantaggi esclusivi
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-center">
            <span className="text-4xl font-bold">{loyaltyPoints}</span>
            <span className="text-lg ml-1">punti</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Livello attuale:</span>
              <span className={`font-medium ${loyalty.color}`}>{loyalty.level}</span>
            </div>
            
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary" 
                style={{ width: `${loyalty.percentage}%` }}
              ></div>
            </div>
            
            {nextLevel !== "Massimo" && (
              <div className="text-xs text-gray-500 text-right">
                {pointsForNextLevel} punti per il livello {nextLevel}
              </div>
            )}
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="font-medium mb-2">Come guadagnare punti</h4>
            <ul className="text-sm space-y-1 text-gray-600">
              <li>• 1 punto per ogni € speso</li>
              <li>• 5 punti per ogni recensione</li>
              <li>• 10 punti per ogni amico invitato</li>
              <li>• 25 punti per il primo acquisto in un nuovo negozio</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoyaltyCard;

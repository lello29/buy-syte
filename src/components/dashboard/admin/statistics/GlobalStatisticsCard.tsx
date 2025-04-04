
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import StatisticsCard from "./StatisticsCard";
import { Shop } from "@/types";
import { Product } from "@/types";

interface GlobalStatisticsCardProps {
  shops: Shop[];
  products: Product[];
}

const GlobalStatisticsCard: React.FC<GlobalStatisticsCardProps> = ({
  shops,
  products
}) => {
  // Calculate stats
  const usedAICredits = shops.reduce((acc, shop) => acc + (100 - shop.aiCredits), 0);
  const maxAICredits = 1000;
  const aiCreditsPercentage = (usedAICredits / maxAICredits) * 100;
  
  const inactiveProducts = products.filter(p => !p.isActive).length;
  
  const outdatedShops = shops.filter(shop => {
    const lastUpdated = new Date(shop.lastUpdated);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return lastUpdated < thirtyDaysAgo;
  }).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Statistiche Globali</CardTitle>
        <CardDescription>Panoramica della piattaforma</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <StatisticsCard
            title="Crediti AI utilizzati"
            value={usedAICredits}
            maxValue={maxAICredits}
            showProgress={true}
            progressValue={aiCreditsPercentage}
          />
          
          <StatisticsCard
            title="Prodotti inattivi"
            value={inactiveProducts}
            description="prodotti"
            buttonText="Visualizza dettagli"
          />
          
          <StatisticsCard
            title="Negozi non aggiornati"
            value={outdatedShops}
            description="negozi"
            buttonText="Invia promemoria"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default GlobalStatisticsCard;

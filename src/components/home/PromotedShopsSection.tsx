
import React from "react";
import PromotedShopCard from "@/components/shops/PromotedShopCard";
import { Shop } from "@/types";

interface PromotedShopsSectionProps {
  shops: Shop[];
}

const PromotedShopsSection = ({ shops }: PromotedShopsSectionProps) => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-8">Negozi con promozioni attive vicino a te</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shops.map((shop) => (
            <PromotedShopCard 
              key={shop.id} 
              shop={shop} 
              distance={Math.floor(Math.random() * 10) + 1} // Random distance for demo
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotedShopsSection;

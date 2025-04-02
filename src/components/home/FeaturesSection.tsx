
import React from "react";
import { ShoppingBag, Store, Users } from "lucide-react";

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Come funziona ShopHubConnect</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Per i Clienti</h3>
            <p className="text-gray-600">
              Scopri negozi locali, ricevi offerte personalizzate e tieni traccia dei tuoi acquisti e punti fedeltà.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Store className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Per i Negozi</h3>
            <p className="text-gray-600">
              Gestisci il tuo catalogo prodotti, crea offerte, monitora vendite e connettiti con i clienti.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Per i Collaboratori</h3>
            <p className="text-gray-600">
              Offri i tuoi servizi ai negozi locali, gestisci le consegne e costruisci la tua reputazione.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

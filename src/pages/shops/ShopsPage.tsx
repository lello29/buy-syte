
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { shops } from "@/data/mockData";
import { Heart, MapPin, Phone, Mail, Store } from "lucide-react";
import { toast } from "sonner";

const ShopsPage = () => {
  const { currentUser, updateUserFavorites } = useAuth();
  const userFavorites = currentUser?.favorites || [];

  const handleToggleFavorite = (shopId: string) => {
    if (!currentUser) {
      toast.error("Effettua il login per aggiungere ai preferiti");
      return;
    }

    let newFavorites;
    if (userFavorites.includes(shopId)) {
      newFavorites = userFavorites.filter(id => id !== shopId);
      toast.success("Rimosso dai preferiti");
    } else {
      newFavorites = [...userFavorites, shopId];
      toast.success("Aggiunto ai preferiti");
    }
    
    updateUserFavorites(newFavorites);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8 px-4 pt-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Esplora i Negozi</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Scopri i negozi disponibili nella piattaforma e aggiungi ai preferiti quelli che ti interessano per ricevere offerte e aggiornamenti.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shops.map(shop => (
            <Card key={shop.id} className="overflow-hidden">
              <div className="h-40 bg-gray-100 flex items-center justify-center">
                <Store className="h-20 w-20 text-gray-400" />
              </div>
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span>{shop.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={userFavorites.includes(shop.id) ? "text-red-500" : "text-gray-400"}
                    onClick={() => handleToggleFavorite(shop.id)}
                  >
                    <Heart className="h-5 w-5" fill={userFavorites.includes(shop.id) ? "currentColor" : "none"} />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">{shop.description}</p>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {shop.address}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    {shop.phone}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    {shop.email}
                  </div>
                  
                  <div className="pt-4">
                    <Button className="w-full">Visita Negozio</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShopsPage;

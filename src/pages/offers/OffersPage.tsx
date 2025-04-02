
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { shops, products } from "@/data/mockData";
import { Store, Tag, Calendar, Percent, Timer } from "lucide-react";
import { toast } from "sonner";

// Creazione di offerte mock
const offers = products
  .filter(product => product.discountPrice !== null)
  .map(product => {
    const shop = shops.find(shop => shop.id === product.shopId);
    return {
      id: `offer-${product.id}`,
      shopId: shop?.id || "",
      shopName: shop?.name || "Negozio sconosciuto",
      productId: product.id,
      productName: product.name,
      originalPrice: product.price,
      discountPrice: product.discountPrice || 0,
      discountPercentage: product.discountPrice ? Math.round(((product.price - product.discountPrice) / product.price) * 100) : 0,
      validUntil: new Date(Date.now() + Math.random() * 15 * 24 * 60 * 60 * 1000).toISOString(), // Random date up to 15 days in future
      category: product.category
    };
  });

const OffersPage = () => {
  const { currentUser, updateUserFavorites } = useAuth();
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("discount");
  
  // Estrarre categorie uniche
  const categories = ["all", ...new Set(offers.map(offer => offer.category))];
  
  // Filtra e ordina le offerte
  const filteredOffers = offers
    .filter(offer => categoryFilter === "all" || offer.category === categoryFilter)
    .sort((a, b) => {
      if (sortBy === "discount") {
        return b.discountPercentage - a.discountPercentage;
      } else if (sortBy === "expiry") {
        return new Date(a.validUntil).getTime() - new Date(b.validUntil).getTime();
      } else {
        return a.discountPrice - b.discountPrice;
      }
    });

  const handleFavorite = (shopId: string) => {
    if (!currentUser) {
      toast.error("Effettua il login per salvare nei preferiti");
      return;
    }
    
    const favorites = currentUser.favorites || [];
    const isAlreadyFavorite = favorites.includes(shopId);
    
    if (isAlreadyFavorite) {
      updateUserFavorites(favorites.filter(id => id !== shopId));
      toast.success("Negozio rimosso dai preferiti");
    } else {
      updateUserFavorites([...favorites, shopId]);
      toast.success("Negozio aggiunto ai preferiti");
    }
  };

  const calculateDaysLeft = (validUntil: string) => {
    const endDate = new Date(validUntil);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Offerte Speciali</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Approfitta delle offerte limitate dei negozi nella piattaforma. Non perdere queste occasioni!
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2">
            <Tag className="h-5 w-5 text-gray-600" />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "Tutte le categorie" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Timer className="h-5 w-5 text-gray-600" />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordina per" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="discount">Sconto maggiore</SelectItem>
              <SelectItem value="price">Prezzo più basso</SelectItem>
              <SelectItem value="expiry">Scade prima</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredOffers.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredOffers.map(offer => {
            const daysLeft = calculateDaysLeft(offer.validUntil);
            const isExpiringSoon = daysLeft <= 3;
            return (
              <Card key={offer.id} className="overflow-hidden">
                <div className="relative">
                  <div className="h-40 bg-gray-100 flex items-center justify-center">
                    <Percent className="h-20 w-20 text-primary/30" />
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      -{offer.discountPercentage}%
                    </span>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-lg">{offer.productName}</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Store className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-gray-700">{offer.shopName}</span>
                      </div>
                      <div className="flex items-center">
                        <Tag className="h-4 w-4 mr-1 text-gray-500" />
                        <span className="text-sm text-gray-500">{offer.category}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold">€{offer.discountPrice.toFixed(2)}</span>
                        <span className="text-gray-500 line-through">€{offer.originalPrice.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                        <span className={`text-sm ${isExpiringSoon ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                          {daysLeft === 0 ? 'Scade oggi' : 
                           daysLeft === 1 ? 'Scade domani' :
                           `Scade tra ${daysLeft} giorni`}
                        </span>
                      </div>
                    </div>
                    
                    <div className="pt-2 flex gap-2">
                      <Button className="w-full">
                        Vedi Prodotto
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleFavorite(offer.shopId)}
                      >
                        <Store className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <Percent className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-medium mb-2">Nessuna offerta disponibile</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Non ci sono offerte per la categoria selezionata al momento. Prova a selezionare un'altra categoria o torna più tardi.
          </p>
        </div>
      )}
    </div>
  );
};

export default OffersPage;


import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { shops } from "@/data/mockData";
import { Heart, X } from "lucide-react";
import { toast } from "sonner";

const FavoritesCard = () => {
  const { currentUser, updateUserFavorites } = useAuth();
  const [favorites, setFavorites] = useState(
    currentUser?.favorites || []
  );

  const handleRemoveFavorite = (shopId: string) => {
    const updatedFavorites = favorites.filter(id => id !== shopId);
    setFavorites(updatedFavorites);
    updateUserFavorites(updatedFavorites);
    toast.success("Negozio rimosso dai preferiti");
  };

  // Get shop details for each favorite
  const favoriteShops = shops.filter(shop => favorites.includes(shop.id));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-500" />
          I Miei Preferiti
        </CardTitle>
        <CardDescription>
          Negozi che segui per ricevere offerte e aggiornamenti
        </CardDescription>
      </CardHeader>
      <CardContent>
        {favoriteShops.length > 0 ? (
          <div className="space-y-4">
            {favoriteShops.map(shop => (
              <div 
                key={shop.id} 
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
              >
                <div>
                  <h3 className="font-medium">{shop.name}</h3>
                  <p className="text-sm text-gray-500">{shop.address}</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.location.href = `/shops/${shop.id}`}
                  >
                    Visualizza
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleRemoveFavorite(shop.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">
              Non hai ancora aggiunto negozi ai preferiti
            </p>
            <Button onClick={() => window.location.href = "/shops"}>
              Esplora negozi
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FavoritesCard;

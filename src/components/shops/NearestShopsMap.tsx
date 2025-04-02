
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shop } from "@/types";
import { Button } from "@/components/ui/button";
import { Map, Navigation } from "lucide-react";
import { toast } from "sonner";

interface LocationProps {
  lat: number;
  lng: number;
}

interface NearestShopsMapProps {
  shops: Shop[];
}

const NearestShopsMap: React.FC<NearestShopsMapProps> = ({ shops }) => {
  const [userLocation, setUserLocation] = useState<LocationProps | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [mapApiKey] = useState(localStorage.getItem("mapApiKey") || "");
  const [nearestShops, setNearestShops] = useState<Shop[]>([]);

  // Get user current location
  const getUserLocation = () => {
    setIsLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Impossibile ottenere la posizione. Assicurati di aver concesso l'autorizzazione.");
          setIsLoadingLocation(false);
        }
      );
    } else {
      toast.error("La geolocalizzazione non è supportata dal tuo browser.");
      setIsLoadingLocation(false);
    }
  };

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // Earth radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Find nearest shops when user location changes
  useEffect(() => {
    if (userLocation && shops.length > 0) {
      // For now, we'll simulate shop locations using random coordinates near user
      const shopsWithDistance = shops.map(shop => {
        // In a real app, shop would have lat/lng stored in the database
        // Here we're simulating random nearby locations for demonstration
        const randomLat = userLocation.lat + (Math.random() - 0.5) * 0.05;
        const randomLng = userLocation.lng + (Math.random() - 0.5) * 0.05;
        const distance = calculateDistance(userLocation.lat, userLocation.lng, randomLat, randomLng);
        
        return {
          ...shop,
          distance,
          lat: randomLat,
          lng: randomLng
        };
      });
      
      // Sort shops by distance
      const sortedShops = shopsWithDistance.sort((a, b) => a.distance - b.distance);
      setNearestShops(sortedShops.slice(0, 5)); // Get 5 nearest shops
    }
  }, [userLocation, shops]);

  if (!mapApiKey) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Negozi più vicini</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Map className="mx-auto h-12 w-12 text-gray-400 mb-3" />
            <h3 className="text-lg font-medium">API Maps non configurata</h3>
            <p className="text-sm text-gray-500 mt-2">
              L'amministratore deve configurare l'API Maps nelle impostazioni.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Negozi più vicini a te</span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={getUserLocation}
            disabled={isLoadingLocation}
          >
            <Navigation className="mr-2 h-4 w-4" />
            {isLoadingLocation ? "Ricerca..." : "Trova posizione"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!userLocation ? (
          <div className="text-center py-8">
            <Map className="mx-auto h-12 w-12 text-gray-400 mb-3" />
            <h3 className="text-lg font-medium">Trova negozi vicini</h3>
            <p className="text-sm text-gray-500 mt-2">
              Clicca sul pulsante "Trova posizione" per scoprire i negozi più vicini a te.
            </p>
          </div>
        ) : nearestShops.length === 0 ? (
          <div className="text-center py-8">
            <p>Nessun negozio trovato nelle vicinanze.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {nearestShops.map((shop) => (
              <NearestShopCard key={shop.id} shop={shop as Shop & {distance: number}} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface NearestShopCardProps {
  shop: Shop & {
    distance: number;
  };
}

const NearestShopCard: React.FC<NearestShopCardProps> = ({ shop }) => {
  const handleContact = () => {
    // In a real app, this would open a chat or contact form
    toast.success(`Hai avviato una chat con ${shop.name}`);
  };

  const handleBook = () => {
    // In a real app, this would open a booking form
    toast.success(`Hai prenotato un prodotto presso ${shop.name}`);
  };

  const handlePay = () => {
    // In a real app, this would open a payment form
    toast.success(`Stai procedendo con il pagamento per ${shop.name}`);
  };

  const enablePayments = localStorage.getItem("enablePayments") === "true";

  return (
    <div className="p-4 border rounded-lg bg-white">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{shop.name}</h3>
          <p className="text-sm text-gray-500">{shop.address}</p>
          <p className="text-sm font-semibold text-primary mt-1">
            {shop.distance.toFixed(1)} km di distanza
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Button size="sm" variant="outline" onClick={handleContact}>
            Contatta
          </Button>
          <Button size="sm" onClick={handleBook}>
            Prenota
          </Button>
          {enablePayments && (
            <Button size="sm" variant="secondary" onClick={handlePay}>
              Paga
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NearestShopsMap;

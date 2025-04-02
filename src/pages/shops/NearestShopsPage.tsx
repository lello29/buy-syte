
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import NearestShopsMap from "@/components/shops/NearestShopsMap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Map, Navigation, Search } from "lucide-react";
import { Shop } from "@/types";
import { toast } from "sonner";
import { shops } from "@/data/mockData";

const NearestShopsPage = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [searchAddress, setSearchAddress] = useState("");
  const [enableMapFeature] = useState(localStorage.getItem("enableMapFeature") !== "false");
  
  // Get user location
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

  // Handle address search
  const handleAddressSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would geocode the address to get coordinates
    // For now, we'll simulate with random coordinates in Italy
    const italyLat = 41.9 + (Math.random() - 0.5) * 2;
    const italyLng = 12.5 + (Math.random() - 0.5) * 2;
    
    setUserLocation({ lat: italyLat, lng: italyLng });
    toast.success(`Ricerca completata per: ${searchAddress}`);
  };

  if (!enableMapFeature) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Funzione Mappa Disabilitata</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center py-4">
              La funzionalità di ricerca negozi vicini è attualmente disabilitata dall'amministratore.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Trova Negozi Vicini</h1>
      <p className="text-gray-600 mb-8">
        Trova i negozi più vicini alla tua posizione per prenotare i prodotti che desideri
      </p>
      
      <div className="grid gap-8 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>La tua posizione</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Button 
                  onClick={getUserLocation} 
                  disabled={isLoadingLocation}
                  className="flex-1"
                >
                  <Navigation className="mr-2 h-4 w-4" />
                  {isLoadingLocation ? "Ricerca..." : "Usa posizione attuale"}
                </Button>
              </div>
              
              <div className="relative">
                <div className="flex items-center">
                  <hr className="flex-grow border-t border-gray-300" />
                  <span className="px-2 text-gray-500 text-sm">oppure</span>
                  <hr className="flex-grow border-t border-gray-300" />
                </div>
              </div>

              <form onSubmit={handleAddressSearch}>
                <div className="space-y-2">
                  <Label htmlFor="address">Cerca per indirizzo</Label>
                  <div className="flex gap-2">
                    <Input
                      id="address"
                      placeholder="Via, Città, CAP"
                      value={searchAddress}
                      onChange={(e) => setSearchAddress(e.target.value)}
                    />
                    <Button type="submit">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </form>

              {userLocation && (
                <div className="mt-4 p-3 bg-primary/10 rounded text-sm">
                  <p>Posizione trovata! Mostrando negozi nelle vicinanze.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {userLocation ? (
          <NearestShopsMap shops={shops} />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Negozi più vicini</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Map className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <h3 className="text-lg font-medium">Trova negozi vicini</h3>
                <p className="text-sm text-gray-500 mt-2">
                  Usa la tua posizione attuale o cerca un indirizzo per trovare i negozi più vicini.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default NearestShopsPage;

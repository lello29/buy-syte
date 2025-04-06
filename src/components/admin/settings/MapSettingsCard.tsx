
import React, { useState, useEffect } from "react";
import { Map } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface MapSettingsCardProps {
  mapApiKey: string;
  setMapApiKey: (value: string) => void;
  enableMapFeature: boolean;
  setEnableMapFeature: (value: boolean) => void;
  enablePayments: boolean;
  setEnablePayments: (value: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function MapSettingsCard({
  mapApiKey,
  setMapApiKey,
  enableMapFeature,
  setEnableMapFeature,
  enablePayments,
  setEnablePayments,
  onSubmit,
}: MapSettingsCardProps) {
  const [defaultRadius, setDefaultRadius] = useState("10");

  // Carica tutte le impostazioni dal localStorage
  useEffect(() => {
    try {
      const savedRadius = localStorage.getItem('defaultRadius');
      if (savedRadius) {
        setDefaultRadius(savedRadius);
      }
      
      const savedMapApiKey = localStorage.getItem('mapApiKey');
      if (savedMapApiKey) {
        setMapApiKey(savedMapApiKey);
      }
      
      const savedEnableMapFeature = localStorage.getItem('enableMapFeature');
      if (savedEnableMapFeature !== null) {
        setEnableMapFeature(savedEnableMapFeature === 'true');
      }
      
      const savedEnablePayments = localStorage.getItem('enablePayments');
      if (savedEnablePayments !== null) {
        setEnablePayments(savedEnablePayments === 'true');
      }
    } catch (error) {
      console.error("Errore nel caricare le impostazioni della mappa:", error);
    }
  }, [setMapApiKey, setEnableMapFeature, setEnablePayments]);

  // Gestisce il cambiamento del raggio
  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDefaultRadius(value);
  };

  // Gestisce il submit del form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Salva tutte le impostazioni nel localStorage
    localStorage.setItem('defaultRadius', defaultRadius);
    localStorage.setItem('mapApiKey', mapApiKey);
    localStorage.setItem('enableMapFeature', enableMapFeature.toString());
    localStorage.setItem('enablePayments', enablePayments.toString());
    
    // Chiama la funzione onSubmit passata come prop
    onSubmit(e);
    
    // Mostra un messaggio di conferma
    toast.success("Impostazioni mappa salvate con successo");
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-xl gap-2">
          <Map className="h-5 w-5 text-primary" />
          Impostazioni Mappa
        </CardTitle>
        <CardDescription>
          Configura l'API della mappa per la funzione di localizzazione dei negozi
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="maps-api-key">Chiave API Maps</Label>
            <Input
              id="maps-api-key"
              value={mapApiKey}
              onChange={(e) => setMapApiKey(e.target.value)}
              placeholder="Inserisci la chiave API di Google Maps o Mapbox"
              className="focus:border-primary"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Ottieni una chiave API da Google Maps Platform o Mapbox
            </p>
          </div>

          <div className="flex items-center justify-between space-x-2 py-2 border-t border-gray-100 mt-4 pt-2">
            <Label htmlFor="enable-maps">Abilita Funzione Mappa</Label>
            <Switch 
              id="enable-maps" 
              checked={enableMapFeature} 
              onCheckedChange={setEnableMapFeature}
            />
          </div>

          <div className="flex items-center justify-between space-x-2 py-2">
            <Label htmlFor="enable-payments">Abilita Pagamenti Online</Label>
            <Switch 
              id="enable-payments" 
              checked={enablePayments} 
              onCheckedChange={setEnablePayments}
            />
          </div>
          
          <div className="space-y-2 mt-4">
            <Label htmlFor="default-radius">Raggio di Ricerca Predefinito (km)</Label>
            <Input
              id="default-radius"
              type="number"
              value={defaultRadius}
              onChange={handleRadiusChange}
              className="focus:border-primary"
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="button" onClick={handleSubmit} className="w-full mt-4">Salva Impostazioni</Button>
      </CardFooter>
    </Card>
  );
}


import React from "react";
import { Map } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

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
        <form onSubmit={onSubmit} className="space-y-4">
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
              defaultChecked 
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
              defaultValue="10"
              className="focus:border-primary"
            />
          </div>
          
          <Button type="submit" className="w-full mt-4">Salva Impostazioni</Button>
        </form>
      </CardContent>
    </Card>
  );
}

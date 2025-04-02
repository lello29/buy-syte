
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Settings, Lock, Bell, Database, CreditCard, Map } from "lucide-react";

const SettingsPage = () => {
  const { currentUser } = useAuth();
  const [mapApiKey, setMapApiKey] = useState("");
  const [enableMapFeature, setEnableMapFeature] = useState(true);
  const [enablePayments, setEnablePayments] = useState(false);

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Non sei autorizzato a visualizzare questa pagina.</p>
      </div>
    );
  }

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the settings to a database
    localStorage.setItem("mapApiKey", mapApiKey);
    localStorage.setItem("enableMapFeature", String(enableMapFeature));
    localStorage.setItem("enablePayments", String(enablePayments));
    toast.success("Impostazioni salvate con successo");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Impostazioni Amministratore</h1>
      <p className="text-gray-600">
        Configura le impostazioni globali della piattaforma.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              Impostazioni Generali
            </CardTitle>
            <CardDescription>
              Configura il comportamento generale della piattaforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platform-name">Nome Piattaforma</Label>
                <Input
                  id="platform-name"
                  defaultValue="ShopHubConnect"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contact-email">Email di Contatto</Label>
                <Input
                  id="contact-email"
                  type="email"
                  defaultValue="admin@shophubconnect.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="support-phone">Telefono Supporto</Label>
                <Input
                  id="support-phone"
                  defaultValue="+39 02 1234567"
                />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="maintenance-mode">Modalità Manutenzione</Label>
                <Switch id="maintenance-mode" />
              </div>
              
              <Button type="submit" className="w-full">Salva Impostazioni</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map className="h-5 w-5 text-primary" />
              Impostazioni Mappa
            </CardTitle>
            <CardDescription>
              Configura l'API della mappa per la funzione di localizzazione dei negozi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="maps-api-key">Chiave API Maps</Label>
                <Input
                  id="maps-api-key"
                  value={mapApiKey}
                  onChange={(e) => setMapApiKey(e.target.value)}
                  placeholder="Inserisci la chiave API di Google Maps o Mapbox"
                />
                <p className="text-xs text-gray-500">
                  Ottieni una chiave API da Google Maps Platform o Mapbox
                </p>
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="enable-maps">Abilita Funzione Mappa</Label>
                <Switch 
                  id="enable-maps" 
                  checked={enableMapFeature} 
                  onCheckedChange={setEnableMapFeature}
                  defaultChecked 
                />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="enable-payments">Abilita Pagamenti Online</Label>
                <Switch 
                  id="enable-payments" 
                  checked={enablePayments} 
                  onCheckedChange={setEnablePayments}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="default-radius">Raggio di Ricerca Predefinito (km)</Label>
                <Input
                  id="default-radius"
                  type="number"
                  defaultValue="10"
                />
              </div>
              
              <Button type="submit" className="w-full">Salva Impostazioni</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notifiche
            </CardTitle>
            <CardDescription>
              Configura le notifiche automatiche della piattaforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="notify-new-users">Notifica Nuovi Utenti</Label>
                <Switch id="notify-new-users" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="notify-new-shops">Notifica Nuovi Negozi</Label>
                <Switch id="notify-new-shops" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="notify-inactive-shops">Notifica Negozi Inattivi</Label>
                <Switch id="notify-inactive-shops" />
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="weekly-report">Report Settimanale</Label>
                <Switch id="weekly-report" defaultChecked />
              </div>
              
              <Button variant="outline" className="w-full">Invia Notifiche di Test</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Pacchetti AI
            </CardTitle>
            <CardDescription>
              Gestisci i pacchetti di crediti AI disponibili per i negozi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="base-credits">Crediti Base (Nuovi Negozi)</Label>
                <Input
                  id="base-credits"
                  type="number"
                  defaultValue="100"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="base-package-price">Prezzo Pacchetto Base (100 crediti)</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    €
                  </span>
                  <Input
                    id="base-package-price"
                    type="number"
                    className="rounded-l-none"
                    defaultValue="19.99"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="premium-package-price">Prezzo Pacchetto Premium (500 crediti)</Label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                    €
                  </span>
                  <Input
                    id="premium-package-price"
                    type="number"
                    className="rounded-l-none"
                    defaultValue="79.99"
                  />
                </div>
              </div>
              
              <Button className="w-full">Aggiorna Pacchetti</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              Database
            </CardTitle>
            <CardDescription>
              Opzioni manutenzione del database
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-yellow-50 text-yellow-700 rounded-md text-sm">
                Attenzione: le operazioni di database sono irreversibili. Procedi con cautela.
              </div>
              
              <Button variant="outline" className="w-full">
                Backup Database
              </Button>
              
              <Button variant="outline" className="w-full">
                Ottimizza Database
              </Button>
              
              <Button variant="outline" className="w-full text-destructive hover:bg-destructive/10">
                <Lock className="mr-2 h-4 w-4" />
                Elimina Dati Inattivi
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;

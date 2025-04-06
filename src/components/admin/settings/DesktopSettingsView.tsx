
import React from "react";
import { Separator } from "@/components/ui/separator";
import { GeneralSettingsCard } from "@/components/admin/settings/GeneralSettingsCard";
import { MapSettingsCard } from "@/components/admin/settings/MapSettingsCard";
import { NotificationsCard } from "@/components/admin/settings/NotificationsCard";
import { AIPackagesCard } from "@/components/admin/settings/AIPackagesCard";
import { DatabaseCard } from "@/components/admin/settings/DatabaseCard";
import { AISettingsCard } from "@/components/admin/settings/AISettingsCard";
import { AIIntegrationCard } from "@/components/admin/settings/AIIntegrationCard";
import { Settings, Map, Bell, CreditCard, Database, Sparkles, Loader2 } from "lucide-react";

interface DesktopSettingsViewProps {
  isLoading: boolean;
  mapSettings: {
    mapApiKey: string;
    setMapApiKey: (value: string) => void;
    enableMapFeature: boolean;
    setEnableMapFeature: (value: boolean) => void;
    enablePayments: boolean;
    setEnablePayments: (value: boolean) => void;
  };
  handleSaveGeneralSettings: (e: React.FormEvent, data: any) => void;
  handleSaveMapSettings: (e: React.FormEvent) => void;
}

export const DesktopSettingsView: React.FC<DesktopSettingsViewProps> = ({
  isLoading,
  mapSettings,
  handleSaveGeneralSettings,
  handleSaveMapSettings
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span className="text-lg">Caricamento...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Impostazioni Amministratore</h1>
        <p className="text-muted-foreground">
          Configura le impostazioni globali della piattaforma.
        </p>
      </div>
      
      <Separator className="my-6" />
      
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Settings className="h-5 w-5 text-primary" />
            <h2>Configurazione Generale</h2>
          </div>
          <GeneralSettingsCard onSubmit={handleSaveGeneralSettings} />
          
          <div className="flex items-center gap-2 text-lg font-semibold mt-8">
            <Map className="h-5 w-5 text-primary" />
            <h2>Configurazione Mappe e Pagamenti</h2>
          </div>
          <MapSettingsCard 
            mapApiKey={mapSettings.mapApiKey}
            setMapApiKey={mapSettings.setMapApiKey}
            enableMapFeature={mapSettings.enableMapFeature}
            setEnableMapFeature={mapSettings.setEnableMapFeature}
            enablePayments={mapSettings.enablePayments}
            setEnablePayments={mapSettings.setEnablePayments}
            onSubmit={handleSaveMapSettings}
          />
          
          <div className="flex items-center gap-2 text-lg font-semibold mt-8">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2>Configurazione Intelligenza Artificiale</h2>
          </div>
          <AISettingsCard />
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Bell className="h-5 w-5 text-primary" />
            <h2>Sistema di Notifiche</h2>
          </div>
          <NotificationsCard />
          
          <div className="flex items-center gap-2 text-lg font-semibold mt-8">
            <CreditCard className="h-5 w-5 text-primary" />
            <h2>Pacchetti e Crediti</h2>
          </div>
          <AIPackagesCard />
          
          <div className="flex items-center gap-2 text-lg font-semibold mt-8">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2>Integrazione AI Prodotti</h2>
          </div>
          <AIIntegrationCard />
          
          <div className="flex items-center gap-2 text-lg font-semibold mt-8">
            <Database className="h-5 w-5 text-primary" />
            <h2>Gestione Database</h2>
          </div>
          <DatabaseCard />
        </div>
      </div>
    </div>
  );
};

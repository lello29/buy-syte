
import React from "react";
import { Separator } from "@/components/ui/separator";
import { GeneralSettingsCard } from "@/components/admin/settings/GeneralSettingsCard";
import { MapSettingsCard } from "@/components/admin/settings/MapSettingsCard";
import { NotificationsCard } from "@/components/admin/settings/NotificationsCard";
import { AISettingsCard } from "@/components/admin/settings/AISettingsCard";
import { Loader2 } from "lucide-react";

interface MobileSettingsViewProps {
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

export const MobileSettingsView: React.FC<MobileSettingsViewProps> = ({
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
      
      <div className="space-y-6">
        <GeneralSettingsCard onSubmit={handleSaveGeneralSettings} />
        <MapSettingsCard 
          mapApiKey={mapSettings.mapApiKey}
          setMapApiKey={mapSettings.setMapApiKey}
          enableMapFeature={mapSettings.enableMapFeature}
          setEnableMapFeature={mapSettings.setEnableMapFeature}
          enablePayments={mapSettings.enablePayments}
          setEnablePayments={mapSettings.setEnablePayments}
          onSubmit={handleSaveMapSettings}
        />
        <NotificationsCard />
        <AISettingsCard />
      </div>
    </div>
  );
};

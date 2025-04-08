
import React from "react";
import { Settings, Map, Sparkles, Package } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { GeneralSettingsCard } from "@/components/admin/settings/GeneralSettingsCard";
import { MapSettingsCard } from "@/components/admin/settings/MapSettingsCard";
import { AISettingsCard } from "@/components/admin/settings/AISettingsCard";
import { ProjectExportCard } from "@/components/admin/settings/ProjectExportCard";

interface SettingsLeftColumnProps {
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

export const SettingsLeftColumn = ({
  mapSettings,
  handleSaveGeneralSettings,
  handleSaveMapSettings
}: SettingsLeftColumnProps) => {
  return (
    <div className="space-y-6">
      <SectionTitle icon={Settings} title="Configurazione Generale" />
      <GeneralSettingsCard onSubmit={handleSaveGeneralSettings} />
      
      <SectionTitle icon={Map} title="Configurazione Mappe e Pagamenti" />
      <MapSettingsCard 
        mapApiKey={mapSettings.mapApiKey}
        setMapApiKey={mapSettings.setMapApiKey}
        enableMapFeature={mapSettings.enableMapFeature}
        setEnableMapFeature={mapSettings.setEnableMapFeature}
        enablePayments={mapSettings.enablePayments}
        setEnablePayments={mapSettings.setEnablePayments}
        onSubmit={handleSaveMapSettings}
      />
      
      <SectionTitle icon={Sparkles} title="Configurazione Intelligenza Artificiale" />
      <AISettingsCard />
      
      <SectionTitle icon={Package} title="Esportazione Progetto" />
      <ProjectExportCard />
    </div>
  );
};

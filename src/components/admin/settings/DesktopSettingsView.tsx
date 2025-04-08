
import React from "react";
import { SettingsLoadingState } from "./components/SettingsLoadingState";
import { SettingsHeader } from "./components/SettingsHeader";
import { SettingsLeftColumn } from "./components/SettingsLeftColumn";
import { SettingsRightColumn } from "./components/SettingsRightColumn";

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
    return <SettingsLoadingState />;
  }

  return (
    <div className="space-y-6">
      <SettingsHeader />
      
      <div className="grid gap-6 lg:grid-cols-2">
        <SettingsLeftColumn 
          mapSettings={mapSettings}
          handleSaveGeneralSettings={handleSaveGeneralSettings}
          handleSaveMapSettings={handleSaveMapSettings}
        />
        
        <SettingsRightColumn />
      </div>
    </div>
  );
};

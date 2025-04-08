
import React from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { SettingsLoadingState } from "./components/SettingsLoadingState";
import { GeneralSettingsCard } from "./GeneralSettingsCard";
import { DatabaseCard } from "./DatabaseCard";
import { NotificationsCard } from "./NotificationsCard";
import { MapSettingsCard } from "./MapSettingsCard";
import { AISettingsCard } from "./AISettingsCard";
import { AIPackagesCard } from "./AIPackagesCard";
import { DatabaseMigrationCard } from "./DatabaseMigrationCard";
import { AIIntegrationCard } from "./AIIntegrationCard";
import { ProjectExportCard } from "./ProjectExportCard";
import { DeploymentInfoCard } from "./DeploymentInfoCard";
import { SettingsHeader } from "./components/SettingsHeader";
import { DataImportExportCard } from "./DataImportExportCard";

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

export function MobileSettingsView({
  isLoading,
  mapSettings,
  handleSaveGeneralSettings,
  handleSaveMapSettings
}: MobileSettingsViewProps) {
  if (isLoading) {
    return <SettingsLoadingState />;
  }

  return (
    <Tabs defaultValue="general" className="w-full">
      <div className="space-y-6">
        <SettingsHeader />
        
        <TabsContent value="general" className="mt-0 space-y-6">
          <GeneralSettingsCard onSubmit={handleSaveGeneralSettings} />
          <NotificationsCard />
        </TabsContent>
        
        <TabsContent value="maps" className="mt-0 space-y-6">
          <MapSettingsCard 
            mapApiKey={mapSettings.mapApiKey}
            setMapApiKey={mapSettings.setMapApiKey}
            enableMapFeature={mapSettings.enableMapFeature}
            setEnableMapFeature={mapSettings.setEnableMapFeature}
            enablePayments={mapSettings.enablePayments}
            setEnablePayments={mapSettings.setEnablePayments}
            onSubmit={handleSaveMapSettings}
          />
        </TabsContent>
        
        <TabsContent value="database" className="mt-0 space-y-6">
          <DatabaseCard />
          <DatabaseMigrationCard />
          <DataImportExportCard />
        </TabsContent>
        
        <TabsContent value="ai" className="mt-0 space-y-6">
          <AISettingsCard />
          <AIIntegrationCard />
          <AIPackagesCard />
        </TabsContent>
        
        <TabsContent value="export" className="mt-0 space-y-6">
          <ProjectExportCard />
          <DeploymentInfoCard />
        </TabsContent>
      </div>
    </Tabs>
  );
}

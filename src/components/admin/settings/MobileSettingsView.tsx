
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    <div className="container mx-auto px-4 py-6">
      <SettingsHeader />
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="w-full grid grid-cols-3 mb-6">
          <TabsTrigger value="general">Generale</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="system">Sistema</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="mt-0 space-y-6">
          <GeneralSettingsCard onSubmit={handleSaveGeneralSettings} />
          <NotificationsCard />
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
        
        <TabsContent value="system" className="mt-0 space-y-6">
          <AISettingsCard />
          <AIIntegrationCard />
          <AIPackagesCard />
          <ProjectExportCard />
          <DeploymentInfoCard />
        </TabsContent>
      </Tabs>
    </div>
  );
}

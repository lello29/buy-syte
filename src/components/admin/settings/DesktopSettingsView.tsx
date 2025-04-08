
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SettingsLoadingState } from "./components/SettingsLoadingState";
import { SettingsLeftColumn } from "./components/SettingsLeftColumn";
import { SettingsRightColumn } from "./components/SettingsRightColumn";
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
import { DataImportExportCard } from "./DataImportExportCard";
import { SettingsHeader } from "./components/SettingsHeader";

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
  databaseCards?: React.ReactNode;
}

export function DesktopSettingsView({ 
  isLoading,
  mapSettings,
  handleSaveGeneralSettings,
  handleSaveMapSettings,
  databaseCards
}: DesktopSettingsViewProps) {
  if (isLoading) {
    return <SettingsLoadingState />;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <SettingsHeader />
      
      <Tabs defaultValue="general" className="w-full">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-3">
            <TabsList className="flex flex-col h-auto w-full space-y-2 bg-transparent p-0">
              <TabsTrigger 
                value="general" 
                className="w-full justify-start px-4 py-3 text-left font-medium"
              >
                Impostazioni Generali
              </TabsTrigger>
              <TabsTrigger 
                value="maps" 
                className="w-full justify-start px-4 py-3 text-left font-medium"
              >
                Mappe e Localizzazione
              </TabsTrigger>
              <TabsTrigger 
                value="database" 
                className="w-full justify-start px-4 py-3 text-left font-medium"
              >
                Database e Dati
              </TabsTrigger>
              <TabsTrigger 
                value="ai" 
                className="w-full justify-start px-4 py-3 text-left font-medium"
              >
                Intelligenza Artificiale
              </TabsTrigger>
              <TabsTrigger 
                value="export" 
                className="w-full justify-start px-4 py-3 text-left font-medium"
              >
                Esportazione Progetto
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="col-span-9">
            <TabsContent value="general" className="mt-0">
              <SettingsRightColumn
                title="Impostazioni Generali"
                description="Gestisci le impostazioni di base dell'applicazione"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <GeneralSettingsCard onSubmit={handleSaveGeneralSettings} />
                  <NotificationsCard />
                </div>
              </SettingsRightColumn>
            </TabsContent>
            
            <TabsContent value="maps" className="mt-0">
              <SettingsRightColumn
                title="Mappe e Localizzazione"
                description="Configura le impostazioni per mappe e servizi di localizzazione"
              >
                <MapSettingsCard 
                  mapApiKey={mapSettings.mapApiKey}
                  setMapApiKey={mapSettings.setMapApiKey}
                  enableMapFeature={mapSettings.enableMapFeature}
                  setEnableMapFeature={mapSettings.setEnableMapFeature}
                  enablePayments={mapSettings.enablePayments}
                  setEnablePayments={mapSettings.setEnablePayments}
                  onSubmit={handleSaveMapSettings}
                />
              </SettingsRightColumn>
            </TabsContent>
            
            <TabsContent value="database" className="mt-0">
              <SettingsRightColumn
                title="Database e Dati"
                description="Gestione del database e delle informazioni archiviate"
              >
                <div className="space-y-6">
                  {databaseCards ? databaseCards : (
                    <>
                      <DatabaseCard />
                      <DatabaseMigrationCard />
                      <DataImportExportCard />
                    </>
                  )}
                </div>
              </SettingsRightColumn>
            </TabsContent>
            
            <TabsContent value="ai" className="mt-0">
              <SettingsRightColumn
                title="Intelligenza Artificiale"
                description="Configura i servizi di intelligenza artificiale"
              >
                <div className="space-y-6">
                  <AISettingsCard />
                  <AIIntegrationCard />
                  <AIPackagesCard />
                </div>
              </SettingsRightColumn>
            </TabsContent>
            
            <TabsContent value="export" className="mt-0">
              <SettingsRightColumn
                title="Esportazione Progetto"
                description="Esporta configurazioni e dati per il deploy"
              >
                <div className="space-y-6">
                  <ProjectExportCard />
                  <DeploymentInfoCard />
                </div>
              </SettingsRightColumn>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}

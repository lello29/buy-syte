
import React from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
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

interface DesktopSettingsViewProps {
  isLoading: boolean;
}

export function DesktopSettingsView({ isLoading }: DesktopSettingsViewProps) {
  if (isLoading) {
    return <SettingsLoadingState />;
  }

  return (
    <Tabs defaultValue="general" className="w-full">
      <div className="grid grid-cols-12 gap-6">
        <SettingsLeftColumn />
        
        <TabsContent value="general" className="col-span-9 mt-0 space-y-6">
          <SettingsRightColumn
            title="Impostazioni Generali"
            description="Gestisci le impostazioni di base dell'applicazione"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GeneralSettingsCard />
              <NotificationsCard />
            </div>
          </SettingsRightColumn>
        </TabsContent>
        
        <TabsContent value="maps" className="col-span-9 mt-0 space-y-6">
          <SettingsRightColumn
            title="Mappe e Localizzazione"
            description="Configura le impostazioni per mappe e servizi di localizzazione"
          >
            <MapSettingsCard />
          </SettingsRightColumn>
        </TabsContent>
        
        <TabsContent value="database" className="col-span-9 mt-0 space-y-6">
          <SettingsRightColumn
            title="Database e Dati"
            description="Gestione del database e delle informazioni archiviate"
          >
            <div className="space-y-6">
              <DatabaseCard />
              <DatabaseMigrationCard />
              <DataImportExportCard />
            </div>
          </SettingsRightColumn>
        </TabsContent>
        
        <TabsContent value="ai" className="col-span-9 mt-0 space-y-6">
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
        
        <TabsContent value="export" className="col-span-9 mt-0 space-y-6">
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
    </Tabs>
  );
}

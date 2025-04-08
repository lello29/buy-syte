
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AIPackagesCard } from "./AIPackagesCard";
import { AISettingsCard } from "./AISettingsCard";
import { GeneralSettingsCard } from "./GeneralSettingsCard";
import { MapSettingsCard } from "./MapSettingsCard";
import { SettingsHeader } from "./components/SettingsHeader";
import { NotificationsCard } from "./NotificationsCard";
import { ProjectExportCard } from "./ProjectExportCard";
import { AIIntegrationCard } from "./AIIntegrationCard";
import { DeploymentInfoCard } from "./DeploymentInfoCard";
import { SectionTitle } from "./components/SectionTitle";
import { Database, Bot, MapPin, Bell, Upload, Globe } from "lucide-react";

interface DesktopSettingsViewProps {
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
  databaseCards: React.ReactNode;
}

export const DesktopSettingsView: React.FC<DesktopSettingsViewProps> = ({
  mapSettings,
  handleSaveGeneralSettings,
  handleSaveMapSettings,
  databaseCards
}) => {
  return (
    <div className="container py-6 space-y-6 max-w-7xl">
      <SettingsHeader />
      
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid grid-cols-6 w-full max-w-4xl">
          <TabsTrigger value="general">Generali</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="ai">AI</TabsTrigger>
          <TabsTrigger value="maps">Mappe</TabsTrigger>
          <TabsTrigger value="notifications">Notifiche</TabsTrigger>
          <TabsTrigger value="export">Esportazione</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6">
          <SectionTitle icon={Globe} title="Impostazioni Generali" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <GeneralSettingsCard onSubmit={handleSaveGeneralSettings} />
            </div>
            <div className="space-y-6">
              <DeploymentInfoCard />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="database" className="space-y-6">
          <SectionTitle icon={Database} title="Configurazione Database" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              {databaseCards}
            </div>
            <div className="space-y-6">
              <DeploymentInfoCard />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="ai" className="space-y-6">
          <SectionTitle icon={Bot} title="Configurazione AI" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <AIIntegrationCard />
              <AISettingsCard />
            </div>
            <div className="space-y-6">
              <AIPackagesCard />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="maps" className="space-y-6">
          <SectionTitle icon={MapPin} title="Impostazioni Mappe" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <MapSettingsCard 
                mapApiKey={mapSettings.mapApiKey}
                setMapApiKey={mapSettings.setMapApiKey}
                enableMapFeature={mapSettings.enableMapFeature}
                setEnableMapFeature={mapSettings.setEnableMapFeature}
                enablePayments={mapSettings.enablePayments}
                setEnablePayments={mapSettings.setEnablePayments}
                onSubmit={handleSaveMapSettings}
              />
            </div>
            <div className="space-y-6">
              <DeploymentInfoCard />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <SectionTitle icon={Bell} title="Configurazione Notifiche" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <NotificationsCard />
            </div>
            <div className="space-y-6">
              <DeploymentInfoCard />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="export" className="space-y-6">
          <SectionTitle icon={Upload} title="Esportazione Progetto" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <ProjectExportCard />
            </div>
            <div className="space-y-6">
              <DeploymentInfoCard />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

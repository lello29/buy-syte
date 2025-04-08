
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AIPackagesCard } from "@/components/admin/settings/AIPackagesCard";
import { AISettingsCard } from "@/components/admin/settings/AISettingsCard";
import { GeneralSettingsCard } from "@/components/admin/settings/GeneralSettingsCard";
import { MapSettingsCard } from "@/components/admin/settings/MapSettingsCard";
import { SettingsHeader } from "@/components/admin/settings/components/SettingsHeader";
import { SettingsLoadingState } from "@/components/admin/settings/components/SettingsLoadingState";
import { SupabaseConnectionTest } from "@/components/admin/settings/components/SupabaseConnectionTest";
import { NotificationsCard } from "@/components/admin/settings/NotificationsCard";
import { ProjectExportCard } from "@/components/admin/settings/ProjectExportCard";
import { AIIntegrationCard } from "@/components/admin/settings/AIIntegrationCard";
import { DatabaseMigrationCard } from "@/components/admin/settings/DatabaseMigrationCard";
import { DeploymentInfoCard } from "@/components/admin/settings/DeploymentInfoCard";
import { DatabaseCard } from "@/components/admin/settings/DatabaseCard";
import { DesktopSettingsView } from "@/components/admin/settings/DesktopSettingsView";
import { MobileSettingsView } from "@/components/admin/settings/MobileSettingsView";
import { useIsMobile } from "@/hooks/use-mobile";
import useAdminSettings from "@/hooks/useAdminSettings";

export default function SettingsPage() {
  const isMobile = useIsMobile();
  const { settings, isLoading, saveSettings } = useAdminSettings();
  const [activeTab, setActiveTab] = useState("general");
  
  if (isLoading) {
    return <SettingsLoadingState />;
  }

  // Nuovo componente di test per Supabase aggiunto alle impostazioni del database
  const databaseCards = (
    <div className="space-y-6">
      <SupabaseConnectionTest />
      <DatabaseCard />
      <DatabaseMigrationCard />
    </div>
  );

  if (isMobile) {
    return (
      <MobileSettingsView
        settings={settings}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        saveSettings={saveSettings}
        databaseCards={databaseCards}
      />
    );
  }

  return (
    <DesktopSettingsView 
      settings={settings}
      saveSettings={saveSettings}
      databaseCards={databaseCards}
    />
  );
}

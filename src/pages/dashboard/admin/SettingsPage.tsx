
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
import { useAdminSettings } from "@/hooks/useAdminSettings"; // Fixed import

export default function SettingsPage() {
  const isMobile = useIsMobile();
  const { isLoading, settings, saveSettings, handleSaveGeneralSettings, handleSaveMapSettings } = useAdminSettings();
  const [activeTab, setActiveTab] = useState("general");
  
  if (isLoading) {
    return <SettingsLoadingState />;
  }

  // Database components for testing Supabase connection
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
        isLoading={isLoading}
        mapSettings={settings}
        handleSaveGeneralSettings={handleSaveGeneralSettings}
        handleSaveMapSettings={handleSaveMapSettings}
      />
    );
  }

  return (
    <DesktopSettingsView 
      isLoading={isLoading}
      mapSettings={settings}
      handleSaveGeneralSettings={handleSaveGeneralSettings}
      handleSaveMapSettings={handleSaveMapSettings}
      databaseCards={databaseCards}
    />
  );
}


import React from "react";
import { DesktopSettingsView } from "@/components/admin/settings/DesktopSettingsView";
import { MobileSettingsView } from "@/components/admin/settings/MobileSettingsView";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAdminSettings } from "@/hooks/useAdminSettings";

export default function SettingsPage() {
  const isMobile = useIsMobile();
  const { 
    mapSettings,
    handleSaveGeneralSettings,
    handleSaveMapSettings,
  } = useAdminSettings();

  return (
    <div className="p-4 md:p-8 pt-6 h-full">
      {isMobile === true ? (
        <MobileSettingsView 
          isLoading={false}
          mapSettings={mapSettings}
          handleSaveGeneralSettings={handleSaveGeneralSettings}
          handleSaveMapSettings={handleSaveMapSettings}
        />
      ) : (
        <DesktopSettingsView 
          isLoading={false}
          mapSettings={mapSettings}
          handleSaveGeneralSettings={handleSaveGeneralSettings}
          handleSaveMapSettings={handleSaveMapSettings}
        />
      )}
    </div>
  );
}

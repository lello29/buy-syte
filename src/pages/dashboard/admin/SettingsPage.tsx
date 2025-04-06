
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAdminSettings } from "@/hooks/useAdminSettings";
import { MobileSettingsView } from "@/components/admin/settings/MobileSettingsView";
import { DesktopSettingsView } from "@/components/admin/settings/DesktopSettingsView";

const SettingsPage = () => {
  const { currentUser, isLoading } = useAuth();
  const isMobile = useIsMobile();
  const { 
    mapSettings, 
    handleSaveGeneralSettings, 
    handleSaveMapSettings 
  } = useAdminSettings();

  // Log mounting of the component
  React.useEffect(() => {
    console.log("SettingsPage mounted", { 
      isMobile, 
      isLoading, 
      userRole: currentUser?.role 
    });
  }, [isMobile, isLoading, currentUser]);

  // Check if user is authenticated and has admin role
  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Non sei autorizzato a visualizzare questa pagina.</p>
      </div>
    );
  }

  // Render the appropriate view based on device type
  if (isMobile) {
    return (
      <MobileSettingsView 
        isLoading={isLoading || isMobile === null}
        mapSettings={mapSettings}
        handleSaveGeneralSettings={handleSaveGeneralSettings}
        handleSaveMapSettings={handleSaveMapSettings}
      />
    );
  }

  return (
    <DesktopSettingsView 
      isLoading={isLoading || isMobile === null}
      mapSettings={mapSettings}
      handleSaveGeneralSettings={handleSaveGeneralSettings}
      handleSaveMapSettings={handleSaveMapSettings}
    />
  );
};

export default SettingsPage;

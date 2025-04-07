import React from "react";
import { DesktopSettingsView } from "@/components/admin/settings/DesktopSettingsView";
import { MobileSettingsView } from "@/components/admin/settings/MobileSettingsView";
import { useIsMobile } from "@/hooks/use-mobile";
import { DatabaseCard } from "@/components/admin/settings/DatabaseCard";
import { DatabaseMigrationCard } from "@/components/admin/settings/DatabaseMigrationCard";
import { DeploymentInfoCard } from "@/components/admin/settings/DeploymentInfoCard";
import { ProjectExportCard } from "@/components/admin/settings/ProjectExportCard";

export default function SettingsPage() {
  const isMobile = useIsMobile();

  // Configurazione delle schede di impostazioni per desktop e mobile
  const settingsSections = {
    general: [
      {
        title: "Impostazioni Generali",
        components: [
          
        ],
      },
    ],
    database: [
      {
        title: "Database e Dati",
        components: [
          { id: "database", component: <DatabaseCard /> },
          { id: "database-migration", component: <DatabaseMigrationCard /> },
        ],
      },
    ],
    deployment: [
      {
        title: "Deployment e Export",
        components: [
          { id: "deployment-info", component: <DeploymentInfoCard /> },
          { id: "project-export", component: <ProjectExportCard /> },
        ],
      },
    ],
  };

  return (
    <div className="p-4 md:p-8 pt-6 h-full">
      {isMobile === true ? (
        <MobileSettingsView sections={settingsSections} />
      ) : (
        <DesktopSettingsView sections={settingsSections} />
      )}
    </div>
  );
}

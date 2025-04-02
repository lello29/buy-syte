
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { GeneralSettingsCard } from "@/components/admin/settings/GeneralSettingsCard";
import { MapSettingsCard } from "@/components/admin/settings/MapSettingsCard";
import { NotificationsCard } from "@/components/admin/settings/NotificationsCard";
import { AIPackagesCard } from "@/components/admin/settings/AIPackagesCard";
import { DatabaseCard } from "@/components/admin/settings/DatabaseCard";

const SettingsPage = () => {
  const { currentUser } = useAuth();
  const [mapApiKey, setMapApiKey] = useState("");
  const [enableMapFeature, setEnableMapFeature] = useState(true);
  const [enablePayments, setEnablePayments] = useState(false);

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Non sei autorizzato a visualizzare questa pagina.</p>
      </div>
    );
  }

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the settings to a database
    localStorage.setItem("mapApiKey", mapApiKey);
    localStorage.setItem("enableMapFeature", String(enableMapFeature));
    localStorage.setItem("enablePayments", String(enablePayments));
    toast.success("Impostazioni salvate con successo");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Impostazioni Amministratore</h1>
      <p className="text-gray-600">
        Configura le impostazioni globali della piattaforma.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <GeneralSettingsCard onSubmit={handleSaveSettings} />
        
        <MapSettingsCard 
          mapApiKey={mapApiKey}
          setMapApiKey={setMapApiKey}
          enableMapFeature={enableMapFeature}
          setEnableMapFeature={setEnableMapFeature}
          enablePayments={enablePayments}
          setEnablePayments={setEnablePayments}
          onSubmit={handleSaveSettings}
        />
        
        <NotificationsCard />
        
        <AIPackagesCard />
        
        <DatabaseCard />
      </div>
    </div>
  );
};

export default SettingsPage;

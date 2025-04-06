
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { GeneralSettingsCard } from "@/components/admin/settings/GeneralSettingsCard";
import { MapSettingsCard } from "@/components/admin/settings/MapSettingsCard";
import { NotificationsCard } from "@/components/admin/settings/NotificationsCard";
import { AIPackagesCard } from "@/components/admin/settings/AIPackagesCard";
import { DatabaseCard } from "@/components/admin/settings/DatabaseCard";
import { AISettingsCard } from "@/components/admin/settings/AISettingsCard";
import { AIIntegrationCard } from "@/components/admin/settings/AIIntegrationCard";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileDashboard from "@/components/layout/MobileDashboard";
import { 
  Settings, 
  Map, 
  Bell, 
  CreditCard, 
  Database,
  Sparkles, 
  Loader2
} from "lucide-react";

const SettingsPage = () => {
  const { currentUser, isLoading } = useAuth();
  const [mapApiKey, setMapApiKey] = useState("");
  const [enableMapFeature, setEnableMapFeature] = useState(true);
  const [enablePayments, setEnablePayments] = useState(false);
  const isMobile = useIsMobile();

  // Log component mounting
  useEffect(() => {
    console.log("SettingsPage mounted", { 
      isMobile, 
      isLoading, 
      userRole: currentUser?.role 
    });
  }, [isMobile, isLoading, currentUser]);
  
  // Handle loading states
  if (isLoading || isMobile === null) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span className="text-lg">Caricamento...</span>
      </div>
    );
  }

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Non sei autorizzato a visualizzare questa pagina.</p>
      </div>
    );
  }

  // Per dispositivi mobili, usa il layout mobile unificato
  if (isMobile) {
    return <MobileDashboard />;
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
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Impostazioni Amministratore</h1>
        <p className="text-muted-foreground">
          Configura le impostazioni globali della piattaforma.
        </p>
      </div>
      
      <Separator className="my-6" />
      
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Settings className="h-5 w-5 text-primary" />
            <h2>Configurazione Generale</h2>
          </div>
          <GeneralSettingsCard onSubmit={handleSaveSettings} />
          
          <div className="flex items-center gap-2 text-lg font-semibold mt-8">
            <Map className="h-5 w-5 text-primary" />
            <h2>Configurazione Mappe e Pagamenti</h2>
          </div>
          <MapSettingsCard 
            mapApiKey={mapApiKey}
            setMapApiKey={setMapApiKey}
            enableMapFeature={enableMapFeature}
            setEnableMapFeature={setEnableMapFeature}
            enablePayments={enablePayments}
            setEnablePayments={setEnablePayments}
            onSubmit={handleSaveSettings}
          />
          
          <div className="flex items-center gap-2 text-lg font-semibold mt-8">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2>Configurazione Intelligenza Artificiale</h2>
          </div>
          <AISettingsCard />
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Bell className="h-5 w-5 text-primary" />
            <h2>Sistema di Notifiche</h2>
          </div>
          <NotificationsCard />
          
          <div className="flex items-center gap-2 text-lg font-semibold mt-8">
            <CreditCard className="h-5 w-5 text-primary" />
            <h2>Pacchetti e Crediti</h2>
          </div>
          <AIPackagesCard />
          
          <div className="flex items-center gap-2 text-lg font-semibold mt-8">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2>Integrazione AI Prodotti</h2>
          </div>
          <AIIntegrationCard />
          
          <div className="flex items-center gap-2 text-lg font-semibold mt-8">
            <Database className="h-5 w-5 text-primary" />
            <h2>Gestione Database</h2>
          </div>
          <DatabaseCard />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

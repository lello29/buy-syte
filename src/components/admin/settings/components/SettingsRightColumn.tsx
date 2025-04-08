
import React from "react";
import { Bell, CreditCard, Sparkles, Database } from "lucide-react";
import { SectionTitle } from "./SectionTitle";
import { NotificationsCard } from "@/components/admin/settings/NotificationsCard";
import { AIPackagesCard } from "@/components/admin/settings/AIPackagesCard";
import { AIIntegrationCard } from "@/components/admin/settings/AIIntegrationCard";
import { DatabaseCard } from "@/components/admin/settings/DatabaseCard";

export const SettingsRightColumn = () => {
  return (
    <div className="space-y-6">
      <SectionTitle icon={Bell} title="Sistema di Notifiche" />
      <NotificationsCard />
      
      <SectionTitle icon={CreditCard} title="Pacchetti e Crediti" />
      <AIPackagesCard />
      
      <SectionTitle icon={Sparkles} title="Integrazione AI Prodotti" />
      <AIIntegrationCard />
      
      <SectionTitle icon={Database} title="Gestione Database" />
      <DatabaseCard />
    </div>
  );
};

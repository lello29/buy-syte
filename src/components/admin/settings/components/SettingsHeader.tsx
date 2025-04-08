
import React from "react";
import { Separator } from "@/components/ui/separator";

export const SettingsHeader = () => {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold tracking-tight">Impostazioni Amministratore</h1>
      <p className="text-muted-foreground">
        Configura le impostazioni globali della piattaforma.
      </p>
      <Separator className="my-6" />
    </div>
  );
};

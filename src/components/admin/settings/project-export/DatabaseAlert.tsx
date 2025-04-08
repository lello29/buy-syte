
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabaseConfig } from "@/config/databaseConfig";

export function DatabaseAlert() {
  if (supabaseConfig.isConfigured) {
    return null;
  }

  return (
    <Alert variant="destructive" className="bg-yellow-50 text-yellow-800 border-yellow-200">
      <AlertDescription className="text-yellow-700">
        Supabase non è configurato. Alcune funzionalità di esportazione potrebbero non funzionare correttamente.
      </AlertDescription>
    </Alert>
  );
}

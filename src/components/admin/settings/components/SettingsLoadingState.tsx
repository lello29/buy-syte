
import React from "react";
import { Loader2 } from "lucide-react";

export const SettingsLoadingState = () => {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
      <span className="text-lg">Caricamento...</span>
    </div>
  );
};

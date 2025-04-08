
import React from "react";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { saveExportedDataToFile } from "@/utils/exportDatabase";
import { supabaseConfig } from "@/config/databaseConfig";

export function ConfigExportButton() {
  const handleExportConfig = () => {
    const config = {
      "VITE_SUPABASE_URL": supabaseConfig.url || "",
      "VITE_SUPABASE_ANON_KEY": supabaseConfig.anonKey || ""
    };
    saveExportedDataToFile(config, "env.template");
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full h-24 flex flex-col items-center justify-center gap-2"
            onClick={handleExportConfig}
          >
            <FileText className="h-6 w-6 text-primary" />
            <span>Esporta Config</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Esporta le configurazioni ambientali (.env)</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}


import React from "react";
import { FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { saveExportedDataToFile } from "@/utils/exportDatabase";
import { ProjectExporter } from "@/utils/projectExporter";

export function ImportScriptButton() {
  const handleExportImportScript = () => {
    try {
      const importScript = ProjectExporter.generateDatabaseImportScript();
      saveExportedDataToFile(importScript, "import-database.js");
    } catch (error) {
      console.error("Errore durante l'esportazione dello script di importazione:", error);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full h-24 flex flex-col items-center justify-center gap-2"
            onClick={handleExportImportScript}
          >
            <FileCode className="h-6 w-6 text-primary" />
            <span>Script Import DB</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Esporta lo script per importare il database</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

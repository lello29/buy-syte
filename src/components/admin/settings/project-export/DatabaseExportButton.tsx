
import React, { useState } from "react";
import { FileJson, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DatabaseExporter, saveExportedDataToFile } from "@/utils/exportDatabase";

export function DatabaseExportButton() {
  const [isDatabaseExporting, setIsDatabaseExporting] = useState(false);

  const handleExportDatabase = async () => {
    setIsDatabaseExporting(true);
    try {
      const data = await DatabaseExporter.exportAllData();
      if (data) {
        saveExportedDataToFile(data, "database-export.json");
      }
    } finally {
      setIsDatabaseExporting(false);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full h-24 flex flex-col items-center justify-center gap-2"
            onClick={handleExportDatabase}
            disabled={isDatabaseExporting}
          >
            {isDatabaseExporting ? (
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            ) : (
              <FileJson className="h-6 w-6 text-primary" />
            )}
            <span>Esporta Database</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Esporta tutti i dati del database in formato JSON</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

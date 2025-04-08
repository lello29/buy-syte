
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
import { ProjectExporter } from "@/utils/projectExporter";

export function EnvExampleButton() {
  const handleExportEnvExample = async () => {
    try {
      const config = await ProjectExporter.generateProjectConfig();
      const envExample = ProjectExporter.generateEnvExample(config);
      saveExportedDataToFile(envExample, ".env.example");
    } catch (error) {
      console.error("Errore durante l'esportazione del file .env.example:", error);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full h-24 flex flex-col items-center justify-center gap-2"
            onClick={handleExportEnvExample}
          >
            <FileText className="h-6 w-6 text-primary" />
            <span>Esporta .env.example</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Esporta un template di .env.example con tutte le variabili necessarie</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

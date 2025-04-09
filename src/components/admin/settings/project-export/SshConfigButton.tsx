
import React from "react";
import { Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { saveExportedDataToFile } from "@/utils/exportDatabase";
import { ProjectExporter } from "@/utils/projectExporter";

export function SshConfigButton() {
  const handleExportSshConfig = () => {
    try {
      const sshConfig = ProjectExporter.generateSshConfig();
      saveExportedDataToFile(sshConfig, "ssh_config");
    } catch (error) {
      console.error("Errore durante l'esportazione della configurazione SSH:", error);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full h-24 flex flex-col items-center justify-center gap-2"
            onClick={handleExportSshConfig}
          >
            <Terminal className="h-6 w-6 text-primary" />
            <span>Config SSH</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Esporta configurazione SSH per il deployment</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

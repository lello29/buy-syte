
import React from "react";
import { Server } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { saveExportedDataToFile } from "@/utils/exportDatabase";
import { ProjectExporter } from "@/utils/projectExporter";

export function DeployInstructionsButton() {
  const handleExportDeployInstructions = () => {
    ProjectExporter.generateProjectConfig().then(config => {
      saveExportedDataToFile(config.deploymentInstructions, "deployment-instructions.md");
    });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full h-24 flex flex-col items-center justify-center gap-2"
            onClick={handleExportDeployInstructions}
          >
            <Server className="h-6 w-6 text-primary" />
            <span>Istruzioni Deploy</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Scarica istruzioni dettagliate per il deployment</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

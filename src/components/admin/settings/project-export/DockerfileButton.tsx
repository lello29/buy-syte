
import React from "react";
import { Archive } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { saveExportedDataToFile } from "@/utils/exportDatabase";
import { ProjectExporter } from "@/utils/projectExporter";

export function DockerfileButton() {
  const handleExportDockerfile = () => {
    const dockerConfig = ProjectExporter.generateDockerConfig();
    saveExportedDataToFile(dockerConfig, "Dockerfile");
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full h-24 flex flex-col items-center justify-center gap-2"
            onClick={handleExportDockerfile}
          >
            <Archive className="h-6 w-6 text-primary" />
            <span>Dockerfile</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Scarica configurazione Docker per il deployment</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}


import React from "react";
import { Button } from "@/components/ui/button";
import { Grid2X2 } from "lucide-react";
import { ConfigExportButton } from "./ConfigExportButton";
import { DatabaseExportButton } from "./DatabaseExportButton";
import { DockerfileButton } from "./DockerfileButton";
import { EnvExampleButton } from "./EnvExampleButton";
import { ImportScriptButton } from "./ImportScriptButton";
import { DeployInstructionsButton } from "./DeployInstructionsButton";
import { ExcelExportButton } from "./ExcelExportButton";

export function ExportButtonsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      <ConfigExportButton />
      <DatabaseExportButton />
      <ExcelExportButton />
      <EnvExampleButton />
      <DockerfileButton />
      <ImportScriptButton />
      <DeployInstructionsButton />
    </div>
  );
}

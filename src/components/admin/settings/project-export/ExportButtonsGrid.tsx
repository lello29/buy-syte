
import React from "react";
import { ConfigExportButton } from "./ConfigExportButton";
import { DatabaseExportButton } from "./DatabaseExportButton";
import { DockerfileButton } from "./DockerfileButton";
import { EnvExampleButton } from "./EnvExampleButton";
import { ImportScriptButton } from "./ImportScriptButton";
import { DeployInstructionsButton } from "./DeployInstructionsButton";
import { ExcelExportButton } from "./ExcelExportButton";
import { SshConfigButton } from "./SshConfigButton";

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
      <SshConfigButton />
    </div>
  );
}

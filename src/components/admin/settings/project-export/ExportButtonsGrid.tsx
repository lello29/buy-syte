
import React from "react";
import { DatabaseExportButton } from "./DatabaseExportButton";
import { ConfigExportButton } from "./ConfigExportButton";
import { DeployInstructionsButton } from "./DeployInstructionsButton";
import { DockerfileButton } from "./DockerfileButton";
import { EnvExampleButton } from "./EnvExampleButton";
import { ImportScriptButton } from "./ImportScriptButton";

export function ExportButtonsGrid() {
  return (
    <>
      <div className="grid gap-3 grid-cols-2">
        <DatabaseExportButton />
        <ConfigExportButton />
        <DeployInstructionsButton />
        <DockerfileButton />
      </div>

      <div className="grid gap-3 grid-cols-2">
        <EnvExampleButton />
        <ImportScriptButton />
      </div>
    </>
  );
}

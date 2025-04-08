
import React, { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProjectExporter } from "@/utils/projectExporter";
import { ExportOptions } from "@/utils/project-export/types";

export function FullExportButton() {
  const [isExporting, setIsExporting] = useState(false);

  // Opzioni di esportazione completa
  const fullExportOptions: ExportOptions = {
    includeDatabase: true,
    includeConfig: true,
    includeDocker: true,
    includeNginx: true,
    includeSetupScript: true,
    includeDocs: true
  };

  const handleExportProject = async () => {
    setIsExporting(true);
    try {
      await ProjectExporter.exportProject(fullExportOptions);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <Separator className="my-2" />
      
      <Button
        variant="default"
        className="w-full h-16 flex items-center justify-center gap-2"
        onClick={handleExportProject}
        disabled={isExporting}
      >
        {isExporting ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Download className="h-5 w-5" />
        )}
        {isExporting ? "Esportazione in corso..." : "Esporta Progetto Completo"}
      </Button>
      
      <p className="text-xs text-gray-500 mt-2">
        Questa operazione esporterà l'intero progetto, inclusi database, configurazioni e script di deploy.
        Tutti i file necessari verranno scaricati automaticamente.
      </p>
    </>
  );
}

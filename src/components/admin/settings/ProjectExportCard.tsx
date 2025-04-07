
import React, { useState } from "react";
import { Package, Download, Archive, Server, FileJson, FileText, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProjectExporter } from "@/utils/projectExporter";
import { DatabaseExporter, saveExportedDataToFile } from "@/utils/exportDatabase";
import { supabaseConfig } from "@/config/databaseConfig";
import { ExportOptions } from "@/utils/project-export/types";

export function ProjectExportCard() {
  const [isExporting, setIsExporting] = useState(false);
  const [isDatabaseExporting, setIsDatabaseExporting] = useState(false);

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
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-xl gap-2">
          <Package className="h-5 w-5 text-primary" />
          Esportazione Progetto
        </CardTitle>
        <CardDescription>
          Strumenti per l'esportazione e il deployment del progetto
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {!supabaseConfig.isConfigured && (
            <Alert variant="destructive" className="bg-yellow-50 text-yellow-800 border-yellow-200">
              <AlertDescription className="text-yellow-700">
                Supabase non è configurato. Alcune funzionalità di esportazione potrebbero non funzionare correttamente.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="grid gap-3 grid-cols-2">
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

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full h-24 flex flex-col items-center justify-center gap-2"
                    onClick={() => {
                      const config = {
                        "VITE_SUPABASE_URL": supabaseConfig.url || "",
                        "VITE_SUPABASE_ANON_KEY": supabaseConfig.anonKey || ""
                      };
                      saveExportedDataToFile(config, "env.template");
                    }}
                  >
                    <FileText className="h-6 w-6 text-primary" />
                    <span>Esporta Config</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Esporta le configurazioni ambientali (.env)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full h-24 flex flex-col items-center justify-center gap-2"
                    onClick={() => {
                      ProjectExporter.generateProjectConfig().then(config => {
                        saveExportedDataToFile(config.deploymentInstructions, "deployment-instructions.md");
                      });
                    }}
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
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full h-24 flex flex-col items-center justify-center gap-2"
                    onClick={() => {
                      const dockerConfig = ProjectExporter.generateDockerConfig();
                      saveExportedDataToFile(dockerConfig, "Dockerfile");
                    }}
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
          </div>
          
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
        </div>
      </CardContent>
    </Card>
  );
}

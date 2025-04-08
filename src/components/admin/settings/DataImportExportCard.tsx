
import React, { useState, useRef } from "react";
import { Download, Upload, FileSpreadsheet, FileCheck, Database } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExcelDataHandler } from "@/utils/excelDataHandler";
import { toast } from "sonner";

export function DataImportExportCard() {
  const [isImporting, setIsImporting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      toast.error("Seleziona un file Excel valido (.xlsx o .xls)");
      return;
    }

    setIsImporting(true);
    try {
      const success = await ExcelDataHandler.importExcelToDatabase(file);
      if (success) {
        toast.success("Dati importati con successo nel database");
      }
    } catch (error) {
      console.error("Errore durante l'importazione:", error);
      toast.error("Si è verificato un errore durante l'importazione");
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleExportToExcel = async () => {
    setIsExporting(true);
    try {
      await ExcelDataHandler.exportToExcel();
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadTemplate = () => {
    ExcelDataHandler.generateImportTemplate();
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-xl gap-2">
          <FileSpreadsheet className="h-5 w-5 text-primary" />
          Importazione/Esportazione Dati
        </CardTitle>
        <CardDescription>
          Strumenti per importare ed esportare dati in formato Excel
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Esportazione Dati</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Esporta tutti i dati del database in un file Excel per il backup o l'analisi offline.
            </p>
            <Button 
              onClick={handleExportToExcel} 
              className="w-full sm:w-auto"
              disabled={isExporting}
            >
              {isExporting ? (
                <>Esportazione in corso...</>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" /> Esporta in Excel
                </>
              )}
            </Button>
          </div>

          <Separator />

          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Importazione Dati</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Importa dati da un file Excel nel formato corretto. Scarica prima il template per assicurarti che i dati siano formattati correttamente.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                variant="outline" 
                onClick={handleDownloadTemplate} 
                className="w-full sm:w-auto"
              >
                <FileCheck className="mr-2 h-4 w-4" /> Scarica Template
              </Button>
              
              <Button 
                onClick={() => fileInputRef.current?.click()} 
                className="w-full sm:w-auto"
                disabled={isImporting}
              >
                {isImporting ? (
                  <>Importazione in corso...</>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" /> Importa da Excel
                  </>
                )}
              </Button>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                accept=".xlsx,.xls"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

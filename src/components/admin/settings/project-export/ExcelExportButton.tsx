
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet } from "lucide-react";
import { ExcelDataHandler } from "@/utils/excelDataHandler";

export function ExcelExportButton() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await ExcelDataHandler.exportToExcel();
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="h-20 flex flex-col items-center justify-center gap-1"
      onClick={handleExport}
      disabled={isExporting}
    >
      <FileSpreadsheet className="h-4 w-4" />
      <span className="text-xs">
        {isExporting ? "Esportazione..." : "Esporta Excel"}
      </span>
    </Button>
  );
}

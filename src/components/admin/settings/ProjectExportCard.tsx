
import React from "react";
import { Package } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DatabaseAlert } from "./project-export/DatabaseAlert";
import { ExportButtonsGrid } from "./project-export/ExportButtonsGrid";
import { FullExportButton } from "./project-export/FullExportButton";

export function ProjectExportCard() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-xl gap-2">
          <Package className="h-5 w-5 text-primary" />
          Esportazione Progetto
        </CardTitle>
        <CardDescription>
          Strumenti per l'esportazione e il deployment completo del progetto
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <DatabaseAlert />
          <ExportButtonsGrid />
          <FullExportButton />
        </div>
      </CardContent>
    </Card>
  );
}

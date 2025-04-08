
import React, { useState } from "react";
import { Database, Server, FileSpreadsheet } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { migrateAllData } from "@/utils/migrateData";
import { Separator } from "@/components/ui/separator";
import { SupabaseConnectionTest } from "./components/SupabaseConnectionTest";
import { Link } from "react-router-dom";

export function DatabaseMigrationCard() {
  const [isMigrating, setIsMigrating] = useState(false);

  const handleMigrateData = async () => {
    setIsMigrating(true);
    try {
      await migrateAllData();
    } finally {
      setIsMigrating(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-xl gap-2">
          <Server className="h-5 w-5 text-primary" />
          Database e Migrazione
        </CardTitle>
        <CardDescription>
          Gestione del database e migrazione dei dati di test
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Test Connessione Database</h3>
            <SupabaseConnectionTest />
          </div>

          <Separator />

          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Migrazione Dati di Test</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Popolamento del database con dati di esempio per test e sviluppo
            </p>
            <Button 
              onClick={handleMigrateData} 
              className="w-full sm:w-auto"
              disabled={isMigrating}
            >
              <Database className="mr-2 h-4 w-4" />
              {isMigrating ? "Migrazione in corso..." : "Migra Dati di Esempio"}
            </Button>
          </div>

          <Separator />

          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Gestione Avanzata Dati</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Per funzionalità di importazione ed esportazione avanzate, utilizza lo strumento dedicato:
            </p>
            <Button 
              asChild
              variant="outline"
              className="w-full sm:w-auto"
            >
              <Link to="/dashboard/admin/settings">
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Strumenti Import/Export
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

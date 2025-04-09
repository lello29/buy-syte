import React, { useState, useEffect } from "react";
import { Database, Server, FileSpreadsheet, Loader2, Trash } from "lucide-react";
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
import { verifyRequiredTables } from "@/lib/supabase";
import { toast } from "sonner";
import { deleteAllDemoData } from "@/pages/api/delete-demo-data";

export function DatabaseMigrationCard() {
  const [isMigrating, setIsMigrating] = useState(false);
  const [missingTables, setMissingTables] = useState<string[]>([]);
  const [isChecking, setIsChecking] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const checkTables = async () => {
      try {
        setIsChecking(true);
        const { allTablesExist, missingTables } = await verifyRequiredTables();
        setMissingTables(missingTables);
      } catch (error) {
        console.error("Error checking tables:", error);
        setMissingTables(["Errore durante la verifica delle tabelle"]);
      } finally {
        setIsChecking(false);
      }
    };

    checkTables();
  }, []);

  const handleMigrateData = async () => {
    setIsMigrating(true);
    try {
      await migrateAllData();
      const { allTablesExist, missingTables } = await verifyRequiredTables();
      setMissingTables(missingTables);
      
      if (allTablesExist) {
        toast.success("Tutte le tabelle sono state migrate correttamente!");
      } else {
        toast.warning(`Alcune tabelle non sono state migrate: ${missingTables.join(', ')}`);
      }
    } catch (error) {
      console.error("Migration error:", error);
      toast.error("Si è verificato un errore durante la migrazione");
    } finally {
      setIsMigrating(false);
    }
  };

  const handleDeleteAllData = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteAllDemoData();
      
      if (result.success) {
        toast.success("Tutti i dati demo sono stati eliminati con successo!");
      } else {
        toast.error(result.error || "Errore durante l'eliminazione dei dati");
      }
    } catch (error) {
      console.error("Data deletion error:", error);
      toast.error("Si è verificato un errore durante l'eliminazione dei dati demo");
    } finally {
      setIsDeleting(false);
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
            <h3 className="font-medium mb-2">Stato Tabelle Database</h3>
            {isChecking ? (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Verificando le tabelle...</span>
              </div>
            ) : missingTables.length > 0 ? (
              <div className="mb-3">
                <p className="text-sm text-amber-600 mb-2">
                  <strong>Tabelle mancanti:</strong>
                </p>
                <ul className="text-xs text-muted-foreground list-disc pl-5 space-y-1">
                  {missingTables.map((table, index) => (
                    <li key={index}>{table}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-sm text-green-600 mb-3">
                Tutte le tabelle richieste sono presenti nel database. ✓
              </p>
            )}
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

          <Separator />

          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Eliminazione Dati Demo</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Eliminazione dei dati di esempio per test e sviluppo
            </p>
            <Button 
              onClick={handleDeleteAllData} 
              className="w-full sm:w-auto"
              disabled={isDeleting}
            >
              <Trash className="mr-2 h-4 w-4" />
              {isDeleting ? "Eliminazione in corso..." : "Elimina Dati Demo"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

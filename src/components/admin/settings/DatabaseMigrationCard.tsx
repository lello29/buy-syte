
import React, { useState, useEffect } from "react";
import { Database, Upload, RefreshCw, AlertTriangle, Check, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { migrateAllData } from "@/utils/migrateData";
import { verifyRequiredTables, requiredTables, isSupabaseConfigured } from "@/lib/supabase";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export function DatabaseMigrationCard() {
  const [isMigrating, setIsMigrating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [tableStatus, setTableStatus] = useState<{
    checked: boolean;
    allExist: boolean;
    missingTables: string[];
  }>({
    checked: false,
    allExist: false,
    missingTables: []
  });

  useEffect(() => {
    // Verifica lo stato delle tabelle quando il componente viene montato
    if (isSupabaseConfigured) {
      checkTablesStatus();
    }
  }, []);

  const checkTablesStatus = async () => {
    try {
      const { allTablesExist, missingTables } = await verifyRequiredTables();
      setTableStatus({
        checked: true,
        allExist: allTablesExist,
        missingTables
      });
      
      if (allTablesExist) {
        console.log("Tutte le tabelle richieste sono presenti nel database");
      } else {
        console.warn(`Tabelle mancanti: ${missingTables.join(', ')}`);
      }
    } catch (error) {
      console.error("Errore durante la verifica delle tabelle:", error);
      toast.error("Errore durante la verifica delle tabelle");
    }
  };

  const handleMigrateData = async () => {
    try {
      setIsMigrating(true);
      setProgress(10);
      
      // Verifica lo stato delle tabelle prima di procedere
      if (!tableStatus.checked) {
        await checkTablesStatus();
      }
      
      // Informazioni per l'utente
      toast.info("Migrazione dati in corso. L'operazione potrebbe richiedere alcuni minuti...");
      
      // Simula una progressione della barra di avanzamento
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 500);

      // Esegui la migrazione
      const success = await migrateAllData();
      
      clearInterval(progressInterval);
      
      if (success) {
        setProgress(100);
        setIsComplete(true);
        // Verifica nuovamente lo stato delle tabelle
        await checkTablesStatus();
        toast.success("Migrazione dati completata");
      } else {
        setProgress(0);
        toast.error("Migrazione dati fallita");
      }
    } catch (error) {
      console.error("Errore durante la migrazione:", error);
      toast.error("Errore durante la migrazione dati");
      setProgress(0);
    } finally {
      setIsMigrating(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-xl gap-2">
          <Database className="h-5 w-5 text-primary" />
          Migrazione Database
        </CardTitle>
        <CardDescription>
          Trasferisci i dati di mock in un database Supabase
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Stato delle tabelle */}
          {isSupabaseConfigured && tableStatus.checked && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Stato Tabelle Richieste:</h3>
              
              {tableStatus.allExist ? (
                <Alert className="bg-green-50 text-green-800 border-green-200">
                  <Check className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-700">
                    Tutte le tabelle richieste sono presenti nel database.
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert variant="destructive" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-700">
                    Alcune tabelle richieste potrebbero essere mancanti o inaccessibili.
                  </AlertDescription>
                </Alert>
              )}
              
              {tableStatus.missingTables.length > 0 && (
                <div className="mt-2 bg-gray-50 p-3 rounded-md border text-sm">
                  <p className="font-medium mb-1">Tabelle non rilevate:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {tableStatus.missingTables.map(table => (
                      <li key={table} className="text-red-600">{table}</li>
                    ))}
                  </ul>
                  <p className="mt-2 text-gray-600">Puoi procedere comunque con la migrazione - il sistema tenterà di creare le tabelle mancanti o di adattarsi a quelle esistenti.</p>
                </div>
              )}
              
              <Separator className="my-2" />
            </div>
          )}

          {!isComplete && (
            <Alert variant="destructive" className="bg-yellow-50 text-yellow-800 border-yellow-200">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-700">
                Questa operazione inserirà tutti i dati di mock nelle corrispondenti tabelle Supabase.
                <br />
                <strong className="font-semibold">
                  INCLUSO UTENTE ADMIN: service.online.italy@gmail.com (password demo: 200812)
                </strong>
              </AlertDescription>
            </Alert>
          )}
          
          {isSupabaseConfigured && !tableStatus.checked && (
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
              onClick={checkTablesStatus}
              disabled={isMigrating}
            >
              <RefreshCw className="h-4 w-4" />
              Verifica Tabelle
            </Button>
          )}
          
          {isMigrating && (
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Migrazione in corso...</p>
              <Progress value={progress} />
            </div>
          )}
          
          {isComplete && (
            <Alert className="bg-green-50 text-green-800 border-green-200">
              <Check className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">
                Migrazione completata con successo! I dati sono stati trasferiti nel database Supabase.
                <br />
                <strong className="font-semibold">
                  Puoi accedere con l'utente admin: service.online.italy@gmail.com (password: 200812)
                </strong>
              </AlertDescription>
            </Alert>
          )}
          
          <Button
            variant="default"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleMigrateData}
            disabled={isMigrating}
          >
            <Upload className="h-4 w-4" />
            {isMigrating ? "Migrazione in corso..." : isComplete ? "Migrazione completata" : "Migra Dati a Supabase"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}


import React, { useState } from "react";
import { Database, Upload, RefreshCw, AlertTriangle } from "lucide-react";
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

export function DatabaseMigrationCard() {
  const [isMigrating, setIsMigrating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleMigrateData = async () => {
    try {
      setIsMigrating(true);
      setProgress(10);
      
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
      } else {
        setProgress(0);
      }
    } catch (error) {
      console.error("Errore durante la migrazione:", error);
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
          {!isComplete && (
            <Alert variant="destructive" className="bg-yellow-50 text-yellow-800 border-yellow-200">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-700">
                Questa operazione inserirà tutti i dati di mock nelle corrispondenti tabelle Supabase.
                Assicurati che le tabelle esistano nel database.
              </AlertDescription>
            </Alert>
          )}
          
          {isMigrating && (
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Migrazione in corso...</p>
              <Progress value={progress} />
            </div>
          )}
          
          {isComplete && (
            <Alert className="bg-green-50 text-green-800 border-green-200">
              <RefreshCw className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">
                Migrazione completata con successo! I dati sono stati trasferiti nel database Supabase.
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

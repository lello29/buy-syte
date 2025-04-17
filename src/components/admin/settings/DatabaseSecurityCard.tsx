
import React, { useState } from "react";
import { Shield, Lock, DatabaseBackup, AlertTriangle, ClipboardCheck } from "lucide-react";
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
import { DatabaseExporter, saveExportedDataToFile } from "@/utils/exportDatabase";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export function DatabaseSecurityCard() {
  const [isExportingPolicies, setIsExportingPolicies] = useState(false);

  const handleExportRlsPolicies = async () => {
    setIsExportingPolicies(true);
    try {
      const policies = await DatabaseExporter.exportRlsPolicies();
      if (policies) {
        saveExportedDataToFile(policies, "rls-policies.json");
        toast.success("Policies RLS esportate con successo");
      } else {
        toast.error("Impossibile esportare le policies RLS");
      }
    } catch (error) {
      console.error("Errore durante l'esportazione delle policies:", error);
      toast.error("Si è verificato un errore durante l'esportazione delle policies");
    } finally {
      setIsExportingPolicies(false);
    }
  };

  return (
    <Card className="shadow-sm mt-6">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-xl gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Sicurezza Database
        </CardTitle>
        <CardDescription>
          Gestione delle policies di sicurezza e controllo degli accessi
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Alert variant="default" className="bg-blue-50 text-blue-800 border-blue-200">
            <ClipboardCheck className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-700">
              Le Row Level Security (RLS) policies proteggono i dati garantendo accessi sicuri in base al ruolo dell'utente.
            </AlertDescription>
          </Alert>
          
          <Separator className="my-2" />
          
          <Button 
            variant="outline" 
            className="w-full hover:bg-primary/5 flex items-center justify-center gap-2"
            onClick={handleExportRlsPolicies}
            disabled={isExportingPolicies}
          >
            {isExportingPolicies ? (
              <Skeleton className="h-4 w-4 rounded-full" />
            ) : (
              <Lock className="h-4 w-4" />
            )}
            Esporta RLS Policies
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full hover:bg-primary/5 flex items-center justify-center gap-2"
          >
            <DatabaseBackup className="h-4 w-4" />
            Verifica Integrità Permessi
          </Button>
          
          <Alert variant="destructive" className="bg-yellow-50 text-yellow-800 border-yellow-200">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-700">
              Attenzione: le modifiche alle politiche di sicurezza richiedono attenzione per evitare problemi di accesso.
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  );
}

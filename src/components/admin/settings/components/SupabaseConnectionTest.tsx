
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Check, Database } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase, isSupabaseConfigured, verifyRequiredTables } from "@/lib/supabase";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export function SupabaseConnectionTest() {
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "success" | "error">("idle");
  const [tablesStatus, setTablesStatus] = useState<{
    checked: boolean;
    allExist: boolean;
    missingTables: string[];
  }>({
    checked: false,
    allExist: false,
    missingTables: []
  });

  useEffect(() => {
    // Verifica lo stato di configurazione iniziale
    if (isSupabaseConfigured) {
      checkTablesStatus();
    }
  }, []);

  const checkTablesStatus = async () => {
    try {
      const { allTablesExist, missingTables } = await verifyRequiredTables();
      setTablesStatus({
        checked: true,
        allExist: allTablesExist,
        missingTables
      });
    } catch (error) {
      console.error("Errore durante la verifica delle tabelle:", error);
    }
  };

  const testConnection = async () => {
    setIsTestingConnection(true);
    setConnectionStatus("idle");
    
    try {
      if (!isSupabaseConfigured) {
        toast.error("Supabase non è configurato. Verifica le variabili d'ambiente.");
        setConnectionStatus("error");
        return;
      }
      
      // Test di una query semplice su Supabase
      const { data, error } = await supabase.from('users').select('count').limit(1);
      
      if (error) {
        console.error("Errore durante il test della connessione:", error);
        toast.error(`Errore di connessione: ${error.message}`);
        setConnectionStatus("error");
      } else {
        toast.success("Connessione a Supabase stabilita con successo!");
        setConnectionStatus("success");
        // Aggiorna lo stato delle tabelle
        await checkTablesStatus();
      }
    } catch (error) {
      console.error("Errore durante il test della connessione:", error);
      toast.error("Si è verificato un errore durante il test della connessione");
      setConnectionStatus("error");
    } finally {
      setIsTestingConnection(false);
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-xl gap-2">
          <Database className="h-5 w-5 text-primary" />
          Test Connessione Supabase
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isSupabaseConfigured ? (
            <Alert className="bg-green-50 text-green-800 border-green-200">
              <Check className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">
                Supabase è configurato correttamente con le variabili d'ambiente.
              </AlertDescription>
            </Alert>
          ) : (
            <Alert variant="destructive" className="bg-yellow-50 text-yellow-800 border-yellow-200">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-700">
                Supabase non è configurato. Verifica le variabili d'ambiente VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.
              </AlertDescription>
            </Alert>
          )}
          
          {connectionStatus === "success" && (
            <Alert className="bg-green-50 text-green-800 border-green-200">
              <Check className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">
                Test della connessione completato con successo! Il database Supabase è raggiungibile.
              </AlertDescription>
            </Alert>
          )}
          
          {connectionStatus === "error" && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Impossibile connettersi al database Supabase. Verifica le credenziali e la connessione di rete.
              </AlertDescription>
            </Alert>
          )}
          
          {tablesStatus.checked && (
            <>
              <Separator className="my-2" />
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Stato Tabelle Database:</h3>
                
                {tablesStatus.allExist ? (
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
                      Alcune tabelle richieste sono mancanti nel database.
                    </AlertDescription>
                  </Alert>
                )}
                
                {tablesStatus.missingTables.length > 0 && (
                  <div className="mt-2 bg-gray-50 p-3 rounded-md border text-sm">
                    <p className="font-medium mb-1">Tabelle mancanti:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      {tablesStatus.missingTables.map(table => (
                        <li key={table} className="text-red-600">{table}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
          
          <Button
            variant="default"
            className="w-full"
            onClick={testConnection}
            disabled={isTestingConnection}
          >
            {isTestingConnection ? "Test in corso..." : "Testa Connessione Supabase"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

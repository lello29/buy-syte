
import React from "react";
import { Database, Lock, AlertTriangle } from "lucide-react";
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
import { DatabaseMigrationCard } from "./DatabaseMigrationCard";
import { DatabaseSecurityCard } from "./DatabaseSecurityCard";

export function DatabaseCard() {
  return (
    <>
      <DatabaseMigrationCard />
      <DatabaseSecurityCard />
      
      <Card className="shadow-sm mt-6">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-xl gap-2">
            <Database className="h-5 w-5 text-primary" />
            Database
          </CardTitle>
          <CardDescription>
            Opzioni manutenzione del database
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert variant="destructive" className="bg-yellow-50 text-yellow-800 border-yellow-200">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-700">
                Attenzione: le operazioni di database sono irreversibili. Procedi con cautela.
              </AlertDescription>
            </Alert>
            
            <Separator className="my-2" />
            
            <Button variant="outline" className="w-full hover:bg-primary/5 flex items-center justify-center gap-2">
              <Database className="h-4 w-4" />
              Backup Database
            </Button>
            
            <Button variant="outline" className="w-full hover:bg-primary/5 flex items-center justify-center gap-2">
              <Database className="h-4 w-4" />
              Ottimizza Database
            </Button>
            
            <Button variant="outline" className="w-full text-destructive hover:bg-destructive/5 flex items-center justify-center gap-2">
              <Lock className="h-4 w-4" />
              Elimina Dati Inattivi
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

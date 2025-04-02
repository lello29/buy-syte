
import React from "react";
import { Database, Lock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function DatabaseCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          Database
        </CardTitle>
        <CardDescription>
          Opzioni manutenzione del database
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-3 bg-yellow-50 text-yellow-700 rounded-md text-sm">
            Attenzione: le operazioni di database sono irreversibili. Procedi con cautela.
          </div>
          
          <Button variant="outline" className="w-full">
            Backup Database
          </Button>
          
          <Button variant="outline" className="w-full">
            Ottimizza Database
          </Button>
          
          <Button variant="outline" className="w-full text-destructive hover:bg-destructive/10">
            <Lock className="mr-2 h-4 w-4" />
            Elimina Dati Inattivi
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

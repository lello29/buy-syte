
import React from "react";
import { Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export function AIIntegrationCard() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-xl gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Integrazione AI Prodotti
        </CardTitle>
        <CardDescription>
          Configura l'utilizzo dell'AI per la generazione di prodotti
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Attiva Generazione Prodotti AI</Label>
              <p className="text-sm text-gray-500">
                Consente ai negozianti di generare descrizioni e dettagli dei prodotti con l'AI
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-3">
            <Label className="font-medium">Limiti Generazione</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 border rounded-md">
                <Label className="text-sm font-normal text-gray-500">Negozianti Basic</Label>
                <p className="text-lg font-semibold">25 prodotti/mese</p>
              </div>
              <div className="p-3 border rounded-md">
                <Label className="text-sm font-normal text-gray-500">Negozianti Premium</Label>
                <p className="text-lg font-semibold">100 prodotti/mese</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="font-medium">Costo per Pacchetto Extra</Label>
            <div className="flex items-center text-lg">
              <span className="font-medium mr-2">€5,99</span>
              <span className="text-sm text-gray-500">per 20 prodotti aggiuntivi</span>
            </div>
          </div>
          
          <Button className="w-full">Salva Impostazioni</Button>
        </div>
      </CardContent>
    </Card>
  );
}

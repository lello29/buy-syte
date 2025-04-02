
import React from "react";
import { Sparkles, Coins, Store } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AIIntegrationCard() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-xl gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Integrazione AI e Promozioni
        </CardTitle>
        <CardDescription>
          Configura l'utilizzo dell'AI per i prodotti e gestisci i pacchetti promozionali
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="ai" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="ai">AI Prodotti</TabsTrigger>
            <TabsTrigger value="promotions">Pacchetti Promozionali</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ai" className="space-y-4">
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
          </TabsContent>
          
          <TabsContent value="promotions" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Attiva Sistema Promozioni</Label>
                <p className="text-sm text-gray-500">
                  Permette ai negozianti di acquistare pacchetti per essere promossi in homepage
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-3">
              <Label className="font-medium">Pacchetti Promozionali</Label>
              <div className="space-y-3">
                <div className="p-4 border rounded-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold flex items-center gap-1">
                        <Store className="h-4 w-4" /> Pacchetto Base
                      </h4>
                      <p className="text-sm text-gray-500">7 giorni di promozione in homepage</p>
                    </div>
                    <div className="text-lg font-semibold">€9,99</div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold flex items-center gap-1">
                        <Store className="h-4 w-4" /> Pacchetto Premium
                      </h4>
                      <p className="text-sm text-gray-500">30 giorni di promozione in homepage</p>
                    </div>
                    <div className="text-lg font-semibold">€29,99</div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold flex items-center gap-1">
                        <Coins className="h-4 w-4" /> Pacchetto Gratuito
                      </h4>
                      <p className="text-sm text-gray-500">3 giorni di promozione (solo da admin)</p>
                    </div>
                    <div className="text-lg font-semibold">€0,00</div>
                  </div>
                </div>
              </div>
            </div>
            
            <Button className="w-full">Aggiungi Nuovo Pacchetto</Button>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Salva Impostazioni</Button>
      </CardFooter>
    </Card>
  );
}

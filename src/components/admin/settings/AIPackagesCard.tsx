
import React from "react";
import { CreditCard } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function AIPackagesCard() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-xl gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          Pacchetti AI
        </CardTitle>
        <CardDescription>
          Gestisci i pacchetti di crediti AI disponibili per i negozi
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="base-credits">Crediti Base (Nuovi Negozi)</Label>
            <Input
              id="base-credits"
              type="number"
              defaultValue="100"
              className="focus:border-primary"
            />
          </div>
          
          <Separator className="my-2" />
          
          <div className="space-y-2">
            <Label htmlFor="base-package-price">Prezzo Pacchetto Base (100 crediti)</Label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                €
              </span>
              <Input
                id="base-package-price"
                type="number"
                className="rounded-l-none focus:border-primary"
                defaultValue="19.99"
              />
            </div>
          </div>
          
          <div className="space-y-2 mt-2">
            <Label htmlFor="premium-package-price">Prezzo Pacchetto Premium (500 crediti)</Label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                €
              </span>
              <Input
                id="premium-package-price"
                type="number"
                className="rounded-l-none focus:border-primary"
                defaultValue="79.99"
              />
            </div>
          </div>
          
          <Button className="w-full mt-2">Aggiorna Pacchetti</Button>
        </div>
      </CardContent>
    </Card>
  );
}

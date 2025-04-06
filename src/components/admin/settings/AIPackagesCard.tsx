
import React, { useState, useEffect } from "react";
import { CreditCard } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// Funzione per caricare le impostazioni dal localStorage
const loadPackageSettings = () => {
  try {
    const settings = localStorage.getItem('packageSettings');
    return settings ? JSON.parse(settings) : {
      baseCredits: "100",
      basePackagePrice: "19.99",
      premiumPackagePrice: "79.99"
    };
  } catch (error) {
    console.error("Errore nel caricare le impostazioni dei pacchetti:", error);
    return {
      baseCredits: "100",
      basePackagePrice: "19.99",
      premiumPackagePrice: "79.99"
    };
  }
};

export function AIPackagesCard() {
  const [settings, setSettings] = useState(loadPackageSettings());

  // Carica le impostazioni all'avvio
  useEffect(() => {
    setSettings(loadPackageSettings());
  }, []);

  // Gestisce il cambiamento degli input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const key = id === "base-credits" 
      ? "baseCredits" 
      : id === "base-package-price" 
        ? "basePackagePrice" 
        : "premiumPackagePrice";
    
    setSettings({ ...settings, [key]: value });
  };

  // Salva le impostazioni
  const handleSavePackages = () => {
    localStorage.setItem('packageSettings', JSON.stringify(settings));
    toast.success("Pacchetti aggiornati con successo");
  };

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
              value={settings.baseCredits}
              onChange={handleInputChange}
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
                value={settings.basePackagePrice}
                onChange={handleInputChange}
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
                value={settings.premiumPackagePrice}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full mt-2" onClick={handleSavePackages}>Aggiorna Pacchetti</Button>
      </CardFooter>
    </Card>
  );
}

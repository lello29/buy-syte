
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BaseCreditsInput } from "./BaseCreditsInput";
import { PriceInput } from "./PriceInput";
import { usePackageSettings } from "./hooks/usePackageSettings";

export const AIPackagesCardContent = () => {
  const { settings, handleInputChange, handleSavePackages } = usePackageSettings();

  return (
    <div className="space-y-4">
      <BaseCreditsInput 
        value={settings.baseCredits} 
        onChange={handleInputChange} 
      />
      
      <Separator className="my-2" />
      
      <PriceInput 
        id="base-package-price"
        label="Prezzo Pacchetto Base (100 crediti)"
        value={settings.basePackagePrice}
        onChange={handleInputChange}
      />
      
      <PriceInput 
        id="premium-package-price"
        label="Prezzo Pacchetto Premium (500 crediti)"
        value={settings.premiumPackagePrice}
        onChange={handleInputChange}
      />
      
      <Button className="w-full mt-2" onClick={handleSavePackages}>
        Aggiorna Pacchetti
      </Button>
    </div>
  );
};

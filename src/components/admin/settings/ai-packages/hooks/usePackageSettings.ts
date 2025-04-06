
import { useState, useEffect } from "react";
import { toast } from "sonner";

export interface PackageSettings {
  baseCredits: string;
  basePackagePrice: string;
  premiumPackagePrice: string;
}

// Function to load settings from localStorage
const loadPackageSettings = (): PackageSettings => {
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

export const usePackageSettings = () => {
  const [settings, setSettings] = useState<PackageSettings>(loadPackageSettings());

  // Load settings on component mount
  useEffect(() => {
    setSettings(loadPackageSettings());
  }, []);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const key = id === "base-credits" 
      ? "baseCredits" 
      : id === "base-package-price" 
        ? "basePackagePrice" 
        : "premiumPackagePrice";
    
    setSettings({ ...settings, [key]: value });
  };

  // Save settings
  const handleSavePackages = () => {
    localStorage.setItem('packageSettings', JSON.stringify(settings));
    toast.success("Pacchetti aggiornati con successo");
  };

  return {
    settings,
    handleInputChange,
    handleSavePackages
  };
};

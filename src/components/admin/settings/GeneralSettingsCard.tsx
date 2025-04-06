
import React, { useState, useEffect } from "react";
import { Settings } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface GeneralSettingsFormData {
  platformName: string;
  contactEmail: string;
  supportPhone: string;
  siteDescription: string;
  maintenanceMode: boolean;
}

interface GeneralSettingsCardProps {
  onSubmit: (e: React.FormEvent, formData: GeneralSettingsFormData) => void;
}

export function GeneralSettingsCard({ onSubmit }: GeneralSettingsCardProps) {
  const [formData, setFormData] = useState<GeneralSettingsFormData>({
    platformName: "ShopHubConnect",
    contactEmail: "admin@shophubconnect.com",
    supportPhone: "+39 02 1234567",
    siteDescription: "Piattaforma per la gestione dei negozi e delle attività commerciali",
    maintenanceMode: false
  });

  // Carica i dati dal localStorage
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('generalSettings');
      if (savedSettings) {
        setFormData(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error("Errore nel caricare le impostazioni generali:", error);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id.replace("general-", "")]: value
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      maintenanceMode: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Salva nel localStorage
    localStorage.setItem('generalSettings', JSON.stringify(formData));
    onSubmit(e, formData);
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-xl gap-2">
          <Settings className="h-5 w-5 text-primary" />
          Impostazioni Generali
        </CardTitle>
        <CardDescription>
          Configura il comportamento generale della piattaforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="general-platformName">Nome Piattaforma</Label>
            <Input
              id="general-platformName"
              value={formData.platformName}
              onChange={handleInputChange}
              className="focus:border-primary"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="general-siteDescription">Descrizione Sito</Label>
            <Textarea
              id="general-siteDescription"
              value={formData.siteDescription}
              onChange={handleInputChange}
              placeholder="Inserisci una breve descrizione del sito"
              className="focus:border-primary"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="general-contactEmail">Email di Contatto</Label>
            <Input
              id="general-contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={handleInputChange}
              className="focus:border-primary"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="general-supportPhone">Telefono Supporto</Label>
            <Input
              id="general-supportPhone"
              value={formData.supportPhone}
              onChange={handleInputChange}
              className="focus:border-primary"
            />
          </div>

          <div className="flex items-center justify-between space-x-2 py-2 border-t border-gray-100 mt-4 pt-4">
            <Label htmlFor="general-maintenanceMode">Modalità Manutenzione</Label>
            <Switch 
              id="general-maintenanceMode" 
              checked={formData.maintenanceMode}
              onCheckedChange={handleSwitchChange}
            />
          </div>
          
          <Button type="submit" className="w-full mt-4">Salva Impostazioni</Button>
        </form>
      </CardContent>
    </Card>
  );
}

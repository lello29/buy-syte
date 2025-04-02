
import React from "react";
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

interface GeneralSettingsCardProps {
  onSubmit: (e: React.FormEvent) => void;
}

export function GeneralSettingsCard({ onSubmit }: GeneralSettingsCardProps) {
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
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="platform-name">Nome Piattaforma</Label>
            <Input
              id="platform-name"
              defaultValue="ShopHubConnect"
              className="focus:border-primary"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contact-email">Email di Contatto</Label>
            <Input
              id="contact-email"
              type="email"
              defaultValue="admin@shophubconnect.com"
              className="focus:border-primary"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="support-phone">Telefono Supporto</Label>
            <Input
              id="support-phone"
              defaultValue="+39 02 1234567"
              className="focus:border-primary"
            />
          </div>

          <div className="flex items-center justify-between space-x-2 py-2 border-t border-gray-100 mt-4 pt-4">
            <Label htmlFor="maintenance-mode">Modalità Manutenzione</Label>
            <Switch id="maintenance-mode" />
          </div>
          
          <Button type="submit" className="w-full mt-4">Salva Impostazioni</Button>
        </form>
      </CardContent>
    </Card>
  );
}

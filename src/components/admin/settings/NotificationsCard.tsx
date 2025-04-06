
import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";
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
import { toast } from "sonner";

// Funzione per caricare le impostazioni dal localStorage
const loadNotificationSettings = () => {
  try {
    const settings = localStorage.getItem('notificationSettings');
    return settings ? JSON.parse(settings) : {
      newUsers: true,
      newShops: true,
      inactiveShops: false,
      weeklyReport: true
    };
  } catch (error) {
    console.error("Errore nel caricare le impostazioni delle notifiche:", error);
    return {
      newUsers: true,
      newShops: true,
      inactiveShops: false,
      weeklyReport: true
    };
  }
};

export function NotificationsCard() {
  const [settings, setSettings] = useState(loadNotificationSettings());

  // Carica le impostazioni all'avvio
  useEffect(() => {
    setSettings(loadNotificationSettings());
  }, []);

  // Gestisce il cambiamento di uno switch
  const handleSwitchChange = (setting: string) => {
    const newSettings = { ...settings, [setting]: !settings[setting] };
    setSettings(newSettings);
    
    // Salva nel localStorage
    localStorage.setItem('notificationSettings', JSON.stringify(newSettings));
  };

  // Invia notifiche di test
  const handleSendTestNotifications = () => {
    toast.success("Notifiche di test inviate con successo");
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-xl gap-2">
          <Bell className="h-5 w-5 text-primary" />
          Notifiche
        </CardTitle>
        <CardDescription>
          Configura le notifiche automatiche della piattaforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between space-x-2 py-2">
            <Label htmlFor="notify-new-users" className="font-medium">Notifica Nuovi Utenti</Label>
            <Switch 
              id="notify-new-users" 
              checked={settings.newUsers}
              onCheckedChange={() => handleSwitchChange('newUsers')}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between space-x-2 py-2">
            <Label htmlFor="notify-new-shops" className="font-medium">Notifica Nuovi Negozi</Label>
            <Switch 
              id="notify-new-shops" 
              checked={settings.newShops}
              onCheckedChange={() => handleSwitchChange('newShops')}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between space-x-2 py-2">
            <Label htmlFor="notify-inactive-shops" className="font-medium">Notifica Negozi Inattivi</Label>
            <Switch 
              id="notify-inactive-shops" 
              checked={settings.inactiveShops}
              onCheckedChange={() => handleSwitchChange('inactiveShops')}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between space-x-2 py-2">
            <Label htmlFor="weekly-report" className="font-medium">Report Settimanale</Label>
            <Switch 
              id="weekly-report" 
              checked={settings.weeklyReport}
              onCheckedChange={() => handleSwitchChange('weeklyReport')}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full mt-2"
          onClick={handleSendTestNotifications}
        >
          Invia Notifiche di Test
        </Button>
      </CardFooter>
    </Card>
  );
}

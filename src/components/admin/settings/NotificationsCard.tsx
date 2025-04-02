
import React from "react";
import { Bell } from "lucide-react";
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

export function NotificationsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          Notifiche
        </CardTitle>
        <CardDescription>
          Configura le notifiche automatiche della piattaforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="notify-new-users">Notifica Nuovi Utenti</Label>
            <Switch id="notify-new-users" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="notify-new-shops">Notifica Nuovi Negozi</Label>
            <Switch id="notify-new-shops" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="notify-inactive-shops">Notifica Negozi Inattivi</Label>
            <Switch id="notify-inactive-shops" />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="weekly-report">Report Settimanale</Label>
            <Switch id="weekly-report" defaultChecked />
          </div>
          
          <Button variant="outline" className="w-full">Invia Notifiche di Test</Button>
        </div>
      </CardContent>
    </Card>
  );
}

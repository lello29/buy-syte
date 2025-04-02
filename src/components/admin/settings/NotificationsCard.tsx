
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
import { Separator } from "@/components/ui/separator";

export function NotificationsCard() {
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
            <Switch id="notify-new-users" defaultChecked />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between space-x-2 py-2">
            <Label htmlFor="notify-new-shops" className="font-medium">Notifica Nuovi Negozi</Label>
            <Switch id="notify-new-shops" defaultChecked />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between space-x-2 py-2">
            <Label htmlFor="notify-inactive-shops" className="font-medium">Notifica Negozi Inattivi</Label>
            <Switch id="notify-inactive-shops" />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between space-x-2 py-2">
            <Label htmlFor="weekly-report" className="font-medium">Report Settimanale</Label>
            <Switch id="weekly-report" defaultChecked />
          </div>
          
          <Button variant="outline" className="w-full mt-2">Invia Notifiche di Test</Button>
        </div>
      </CardContent>
    </Card>
  );
}

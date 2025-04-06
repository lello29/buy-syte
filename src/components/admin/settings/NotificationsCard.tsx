
import React from "react";
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
import { useNotificationSettings } from "@/hooks/useNotificationSettings";
import { NotificationItem } from "./notifications/NotificationItem";

export function NotificationsCard() {
  const { settings, handleSwitchChange, handleSendTestNotifications } = useNotificationSettings();

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
          <NotificationItem
            id="notify-new-users"
            label="Notifica Nuovi Utenti"
            checked={settings.newUsers}
            onChange={() => handleSwitchChange('newUsers')}
          />
          
          <NotificationItem
            id="notify-new-shops"
            label="Notifica Nuovi Negozi"
            checked={settings.newShops}
            onChange={() => handleSwitchChange('newShops')}
          />
          
          <NotificationItem
            id="notify-inactive-shops"
            label="Notifica Negozi Inattivi"
            checked={settings.inactiveShops}
            onChange={() => handleSwitchChange('inactiveShops')}
          />
          
          <NotificationItem
            id="weekly-report"
            label="Report Settimanale"
            checked={settings.weeklyReport}
            onChange={() => handleSwitchChange('weeklyReport')}
            showSeparator={false}
          />
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

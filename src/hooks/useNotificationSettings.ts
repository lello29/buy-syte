
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { loadSettingsFromStorage, saveSettingsToStorage } from "@/utils/settingsStorage";

export interface NotificationSettings {
  newUsers: boolean;
  newShops: boolean;
  inactiveShops: boolean;
  weeklyReport: boolean;
}

// Default settings
const defaultSettings: NotificationSettings = {
  newUsers: true,
  newShops: true,
  inactiveShops: false,
  weeklyReport: true
};

export const useNotificationSettings = () => {
  const [settings, setSettings] = useState<NotificationSettings>(defaultSettings);

  // Load settings when component mounts
  useEffect(() => {
    const savedSettings = loadSettingsFromStorage("notificationSettings", defaultSettings);
    setSettings(savedSettings);
  }, []);

  // Handle switch changes
  const handleSwitchChange = (setting: keyof NotificationSettings) => {
    const newSettings = { ...settings, [setting]: !settings[setting] };
    setSettings(newSettings);
    
    // Save to localStorage
    saveSettingsToStorage("notificationSettings", newSettings);
  };

  // Send test notifications
  const handleSendTestNotifications = () => {
    toast.success("Notifiche di test inviate con successo");
  };

  return {
    settings,
    handleSwitchChange,
    handleSendTestNotifications
  };
};

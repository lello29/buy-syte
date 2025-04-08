
import { useState, useEffect } from "react";
import { loadSettingsFromStorage } from "@/utils/settingsStorage";
import { isSupabaseConfigured } from "@/lib/supabase";

interface GeneralSettingsFormData {
  platformName: string;
  contactEmail: string;
  supportPhone: string;
  siteDescription: string;
  maintenanceMode: boolean;
}

// Export the hook directly (not as default)
export const useAdminSettings = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mapApiKey, setMapApiKey] = useState("");
  const [enableMapFeature, setEnableMapFeature] = useState(true);
  const [enablePayments, setEnablePayments] = useState(false);

  // Load settings from storage when component mounts
  useEffect(() => {
    try {
      setMapApiKey(loadSettingsFromStorage("mapApiKey", ""));
      setEnableMapFeature(loadSettingsFromStorage("enableMapFeature", true));
      setEnablePayments(loadSettingsFromStorage("enablePayments", false));
      
      console.log("Admin settings loaded");
    } catch (error) {
      console.error("Error loading admin settings:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Function to save individual settings
  const saveSettings = (key: string, value: any) => {
    localStorage.setItem(key, typeof value === 'boolean' ? value.toString() : value);
  };

  // Handler for saving general settings
  const handleSaveGeneralSettings = (e: React.FormEvent, data: GeneralSettingsFormData) => {
    e.preventDefault();
    // Data is already saved to localStorage in the GeneralSettingsCard component
    
    // If Supabase is configured, we could save to the database
    if (isSupabaseConfigured) {
      console.log("Saving to Supabase:", data);
      // Here would be the implementation for saving to Supabase
    }
  };
  
  // Handler for saving map settings
  const handleSaveMapSettings = (e: React.FormEvent) => {
    e.preventDefault();
    // The map settings are saved in the MapSettingsCard component
    
    // If Supabase is configured, we could save to the database
    if (isSupabaseConfigured) {
      const mapSettings = {
        mapApiKey,
        enableMapFeature,
        enablePayments
      };
      console.log("Saving to Supabase:", mapSettings);
      // Here would be the implementation for saving to Supabase
    }
  };

  return {
    isLoading,
    settings: {
      mapApiKey,
      setMapApiKey,
      enableMapFeature,
      setEnableMapFeature,
      enablePayments,
      setEnablePayments,
    },
    saveSettings,
    handleSaveGeneralSettings,
    handleSaveMapSettings,
  };
};

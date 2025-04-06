
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

export const useAdminSettings = () => {
  const [mapApiKey, setMapApiKey] = useState("");
  const [enableMapFeature, setEnableMapFeature] = useState(true);
  const [enablePayments, setEnablePayments] = useState(false);

  // Load settings from storage when component mounts
  useEffect(() => {
    setMapApiKey(loadSettingsFromStorage("mapApiKey", ""));
    setEnableMapFeature(loadSettingsFromStorage("enableMapFeature", true));
    setEnablePayments(loadSettingsFromStorage("enablePayments", false));
    
    console.log("Admin settings loaded");
  }, []);

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
    mapSettings: {
      mapApiKey,
      setMapApiKey,
      enableMapFeature,
      setEnableMapFeature,
      enablePayments,
      setEnablePayments,
    },
    handleSaveGeneralSettings,
    handleSaveMapSettings,
  };
};

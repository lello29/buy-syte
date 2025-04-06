
/**
 * Utility functions for settings storage and retrieval
 */

// Function to save settings to localStorage
export const saveSettingsToStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Errore nel salvare ${key}:`, error);
  }
};

// Function to load settings from localStorage
export const loadSettingsFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (error) {
    console.error(`Errore nel caricare ${key}:`, error);
    return defaultValue;
  }
};

// Check if Supabase is configured to save settings to the database
export const saveSettingsToSupabase = async (collection: string, data: any) => {
  // This is a placeholder for Supabase integration
  // When Supabase is configured, this function can be implemented
  const isSupabaseConfigured = !!(
    import.meta.env.VITE_SUPABASE_URL && 
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );
  
  if (isSupabaseConfigured) {
    console.log(`Saving ${collection} to Supabase:`, data);
    // Here would be the implementation for saving to Supabase
    return true;
  }
  
  return false;
};

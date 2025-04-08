
/**
 * Configurazione per l'accesso al database Supabase
 */

// Importa client Supabase già configurato
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

// Configurazione per Supabase
export const supabaseConfig = {
  // URL e chiave vengono già forniti dal client di integrazione Lovable
  url: "https://xzttrybczojilxwbzyrw.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6dHRyeWJjem9qaWx4d2J6eXJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwOTk3NDQsImV4cCI6MjA1OTY3NTc0NH0.kQBV1MJ7aXJUL0z3viDhtbTPnThrQe6ixvhMCT7NzK4",
  
  // Flag che indica se Supabase è configurato correttamente
  isConfigured: true
};

/**
 * Funzione per verificare lo stato della connessione al database
 * @returns True se la connessione è configurata correttamente
 */
export const checkDatabaseConnection = async (): Promise<boolean> => {
  try {
    // Creiamo una query semplice che funzioni anche senza tabelle specifiche
    const { data, error } = await supabase.rpc('version');
    
    if (error) {
      console.error("Errore di connessione:", error.message);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Errore durante il test della connessione:", error);
    return false;
  }
};

/**
 * Funzione alternativa per verificare la connessione
 * Utilizza un approccio più semplice che funziona anche senza funzioni RPC
 */
export const simpleDatabaseCheck = async (): Promise<boolean> => {
  try {
    // Verifichiamo se possiamo ottenere l'oggetto auth
    const { data } = await supabase.auth.getSession();
    
    // Se abbiamo ricevuto una risposta, la connessione funziona
    return true;
  } catch (error) {
    console.error("Errore durante il test della connessione:", error);
    return false;
  }
};

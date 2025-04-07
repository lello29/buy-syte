
/**
 * Configurazione per l'accesso al database Supabase
 * File da utilizzare per esportare l'applicazione su hosting o VPS
 */

// Variabili di ambiente per Supabase
export const supabaseConfig = {
  // URL di Supabase (può essere sovrascritto dalle variabili d'ambiente)
  url: import.meta.env.VITE_SUPABASE_URL || '',
  
  // Chiave anonima di Supabase (può essere sovrascritta dalle variabili d'ambiente)
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  
  // Flag che indica se Supabase è configurato correttamente
  isConfigured: !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)
};

/**
 * Istruzioni per il deployment dell'applicazione su hosting o VPS:
 * 
 * 1. Creare un file .env nella root del progetto con le seguenti variabili:
 *    VITE_SUPABASE_URL=https://tuo-progetto.supabase.co
 *    VITE_SUPABASE_ANON_KEY=chiave-anonima-supabase
 * 
 * 2. Per il deployment, assicurarsi che il server di hosting abbia accesso a queste variabili.
 *    In molti servizi di hosting è possibile configurare variabili d'ambiente direttamente
 *    nel pannello di controllo.
 * 
 * 3. Se stai utilizzando Docker, puoi passare queste variabili d'ambiente al container.
 */

/**
 * Funzione per verificare lo stato della connessione al database
 * @returns True se la connessione è configurata correttamente
 */
export const checkDatabaseConnection = (): boolean => {
  if (!supabaseConfig.isConfigured) {
    console.error("Supabase non è configurato. Imposta le variabili d'ambiente VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.");
    return false;
  }
  
  // Qui potresti implementare un controllo più dettagliato della connessione
  
  return true;
};

/**
 * Istruzioni per l'export dell'applicazione:
 * 
 * 1. Esegui `npm run build` per creare una versione ottimizzata dell'applicazione
 * 2. La cartella 'dist' conterrà i file da caricare sul server
 * 3. Configura le variabili d'ambiente sul server di hosting
 * 4. Per un VPS, puoi utilizzare Nginx o Apache come web server
 */


import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Get environment variables from Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a mock client if credentials are missing
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

let supabaseClient;

if (isSupabaseConfigured) {
  // Only create the client if we have valid credentials
  supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey);
} else {
  console.error('Supabase URL o chiave anonima mancante. Verifica le variabili d\'ambiente.');
  // Create a mock client that won't perform actual operations
  supabaseClient = {
    from: () => ({
      upsert: () => ({ error: new Error('Supabase not configured') }),
      select: () => ({ error: new Error('Supabase not configured') }),
    }),
    // Add other methods we might need to mock
  } as any;
}

export const supabase = supabaseClient;

// Lista delle tabelle richieste dall'applicazione
export const requiredTables = [
  'users',
  'shops',
  'products',
  'categories',
  'orders',
  'offers',
  'collaborators',
  'tasks'
];

// Funzione per verificare l'esistenza di tutte le tabelle richieste
export const verifyRequiredTables = async (): Promise<{
  allTablesExist: boolean;
  missingTables: string[];
}> => {
  if (!isSupabaseConfigured) {
    return { 
      allTablesExist: false, 
      missingTables: requiredTables 
    };
  }

  try {
    // Query per ottenere la lista delle tabelle esistenti
    const { data: existingTables, error } = await supabase
      .from('pg_tables')
      .select('tablename')
      .eq('schemaname', 'public');

    if (error) {
      console.error('Errore durante la verifica delle tabelle:', error);
      return { 
        allTablesExist: false, 
        missingTables: requiredTables 
      };
    }

    // Estrai i nomi delle tabelle
    const tableNames = existingTables?.map(table => table.tablename) || [];
    
    // Verifica quali tabelle sono mancanti
    const missingTables = requiredTables.filter(
      tableName => !tableNames.includes(tableName)
    );

    return {
      allTablesExist: missingTables.length === 0,
      missingTables
    };
  } catch (error) {
    console.error('Errore durante la verifica delle tabelle:', error);
    return { 
      allTablesExist: false, 
      missingTables: requiredTables 
    };
  }
};

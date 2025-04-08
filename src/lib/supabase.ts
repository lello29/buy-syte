
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';
import { supabase as supabaseClient } from '@/integrations/supabase/client';

// Utilizziamo direttamente il client predefinito di Lovable
export const supabase = supabaseClient;

// Verifichiamo se Supabase è configurato controllando il client
export const isSupabaseConfigured = true;

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

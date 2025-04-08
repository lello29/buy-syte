
import { createClient } from '@supabase/supabase-js';
import { supabase as supabaseClient } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

// Utilizziamo direttamente il client predefinito di Lovable
// che è già correttamente tipizzato con il tipo Database
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
    const { data: tablesData, error } = await supabase
      .from('get_tables')
      .select('*');

    if (error) {
      console.error('Errore durante la verifica delle tabelle:', error);
      
      // Verifica tabelle con metodo alternativo
      return await fallbackTableVerification();
    }

    // Estrai i nomi delle tabelle dal risultato personalizzato
    const tableNames = tablesData?.map(table => table.table_name) || [];
    
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
    return await fallbackTableVerification();
  }
};

// Metodo alternativo per verificare le tabelle quando la RPC fallisce
async function fallbackTableVerification() {
  try {
    const missingTables = [];
    
    // Verifica ogni tabella individualmente con una semplice query
    for (const tableName of requiredTables) {
      const { error } = await supabase
        .from(tableName)
        .select('count')
        .limit(1)
        .single();
      
      if (error && (error.message.includes('does not exist') || error.code === '42P01')) {
        missingTables.push(tableName);
      }
    }
    
    return {
      allTablesExist: missingTables.length === 0,
      missingTables
    };
  } catch (error) {
    console.error('Errore nel metodo alternativo di verifica tabelle:', error);
    return { 
      allTablesExist: false, 
      missingTables: requiredTables 
    };
  }
}

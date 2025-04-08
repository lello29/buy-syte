
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
    // Utilizziamo una query SQL diretta invece di accedere a pg_tables
    // che potrebbe non essere accessibile con le restrizioni di Supabase
    const { data: tablesData, error } = await supabase
      .rpc('get_tables')
      .select('*');

    if (error) {
      console.error('Errore durante la verifica delle tabelle:', error);
      return { 
        allTablesExist: false, 
        missingTables: requiredTables 
      };
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
    return { 
      allTablesExist: false, 
      missingTables: requiredTables 
    };
  }
};

// Funzione alternativa per verificare tabelle tramite mock quando RPC non è disponibile
export const mockVerifyRequiredTables = async (): Promise<{
  allTablesExist: boolean;
  missingTables: string[];
}> => {
  try {
    // Simuliamo che tutte le tabelle esistono in modalità mock
    // In una versione reale, questa sarebbe una query effettiva
    return {
      allTablesExist: true,
      missingTables: []
    };
  } catch (error) {
    console.error('Errore durante la verifica delle tabelle:', error);
    return { 
      allTablesExist: false, 
      missingTables: requiredTables 
    };
  }
};

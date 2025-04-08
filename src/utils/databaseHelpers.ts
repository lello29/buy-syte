
import { supabase } from '@/lib/supabase';

/**
 * Verifica l'esistenza di una tabella nel database
 * @param tableName Nome della tabella da verificare
 * @returns true se la tabella esiste, false altrimenti
 */
export const checkTableExists = async (tableName: string): Promise<boolean> => {
  try {
    // Utilizziamo una query generica che fallirà se la tabella non esiste
    const { error } = await supabase
      .from(tableName)
      .select('count')
      .limit(1)
      .single();
    
    // Se non c'è errore, la tabella esiste
    return !error;
  } catch (error) {
    console.error(`Errore durante la verifica della tabella ${tableName}:`, error);
    return false;
  }
};

/**
 * Funzione di utilità per ottenere dati dal database o usare dati mock come fallback
 * @param tableName Nome della tabella
 * @param mockData Dati mock da utilizzare in caso di errore
 * @returns Dati dal database o mock
 */
export const getDataWithMockFallback = async (tableName: string, mockData: any[]) => {
  try {
    // Verifica se la tabella esiste
    const tableExists = await checkTableExists(tableName);
    
    if (!tableExists) {
      console.log(`Tabella ${tableName} non trovata, utilizzo dati mock`);
      return mockData;
    }
    
    // Ottieni i dati dalla tabella
    const { data, error } = await supabase
      .from(tableName)
      .select('*');
      
    if (error) {
      console.error(`Errore durante il recupero dei dati da ${tableName}:`, error);
      return mockData;
    }
    
    return data;
  } catch (error) {
    console.error(`Errore durante l'accesso ai dati di ${tableName}:`, error);
    return mockData;
  }
};

/**
 * Verifica se una tabella esiste, crea una funzione SQL personalizzata per questo scopo
 */
export const createTableVerificationFunction = async (): Promise<boolean> => {
  try {
    // Crea una funzione RPC che restituisce le tabelle pubbliche
    const { error } = await supabase.rpc('create_table_verification_function');
    
    if (error) {
      console.error('Errore durante la creazione della funzione di verifica tabelle:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Errore durante la creazione della funzione di verifica tabelle:', error);
    return false;
  }
};

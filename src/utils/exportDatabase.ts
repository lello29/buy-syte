
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { toast } from "sonner";

/**
 * Classe per gestire l'esportazione del database
 */
export class DatabaseExporter {
  /**
   * Esporta tutti i dati delle tabelle in formato JSON
   * @returns Un oggetto con tutti i dati delle tabelle
   */
  static async exportAllData(): Promise<Record<string, any[]> | null> {
    try {
      if (!isSupabaseConfigured) {
        toast.error("Supabase non è configurato. Impossibile esportare il database.");
        console.error("Supabase non configurato. Configurare le variabili d'ambiente.");
        return null;
      }

      // Lista delle tabelle da esportare
      const tables = [
        'users',
        'shops',
        'products',
        'categories',
        'orders',
        'offers',
        'collaborators',
        'tasks'
      ];

      const exportedData: Record<string, any[]> = {};

      // Esportazione di ciascuna tabella
      for (const table of tables) {
        const { data, error } = await supabase
          .from(table)
          .select('*');

        if (error) {
          console.error(`Errore durante l'esportazione della tabella ${table}:`, error);
          continue;
        }

        exportedData[table] = data || [];
      }

      return exportedData;
    } catch (error) {
      console.error("Errore durante l'esportazione del database:", error);
      toast.error("Si è verificato un errore durante l'esportazione del database");
      return null;
    }
  }

  /**
   * Genera uno script SQL per ricreare le tabelle
   * @returns Script SQL come stringa
   */
  static async generateDatabaseSchema(): Promise<string | null> {
    try {
      if (!isSupabaseConfigured) {
        return null;
      }

      // Ottieni lo schema del database
      const { data, error } = await supabase.rpc('get_schema');

      if (error) {
        console.error("Errore durante l'esportazione dello schema:", error);
        return null;
      }

      return data || null;
    } catch (error) {
      console.error("Errore durante la generazione dello schema:", error);
      return null;
    }
  }

  /**
   * Esporta le RLS policies per ogni tabella
   * @returns Oggetto con le policies per ogni tabella
   */
  static async exportRlsPolicies(): Promise<Record<string, any[]> | null> {
    try {
      if (!isSupabaseConfigured) {
        return null;
      }

      const { data, error } = await supabase.rpc('get_rls_policies');
      
      if (error) {
        console.error("Errore durante l'esportazione delle RLS policies:", error);
        return null;
      }

      // Organizziamo le policies per tabella
      const policiesByTable: Record<string, any[]> = {};
      
      if (data && Array.isArray(data)) {
        data.forEach(policy => {
          const tableName = policy.table_name;
          if (!policiesByTable[tableName]) {
            policiesByTable[tableName] = [];
          }
          policiesByTable[tableName].push(policy);
        });
      }
      
      return policiesByTable;
    } catch (error) {
      console.error("Errore durante l'esportazione delle RLS policies:", error);
      return null;
    }
  }
}

/**
 * Classe per gestire l'importazione del database
 */
export class DatabaseImporter {
  /**
   * Importa i dati nel database
   * @param data Dati da importare
   * @returns True se l'importazione è andata a buon fine
   */
  static async importData(data: Record<string, any[]>): Promise<boolean> {
    try {
      if (!isSupabaseConfigured) {
        toast.error("Supabase non è configurato. Impossibile importare i dati.");
        return false;
      }

      // Importa in ogni tabella
      for (const [table, records] of Object.entries(data)) {
        if (records.length === 0) continue;

        const { error } = await supabase
          .from(table)
          .upsert(records, {
            onConflict: 'id',
            ignoreDuplicates: false
          });

        if (error) {
          console.error(`Errore durante l'importazione nella tabella ${table}:`, error);
          toast.error(`Errore durante l'importazione della tabella ${table}`);
          continue;
        }
      }

      toast.success("Dati importati con successo");
      return true;
    } catch (error) {
      console.error("Errore durante l'importazione dei dati:", error);
      toast.error("Si è verificato un errore durante l'importazione dei dati");
      return false;
    }
  }

  /**
   * Importa uno schema SQL
   * @param sqlSchema Schema SQL da importare
   * @returns True se l'importazione è andata a buon fine
   */
  static async importSchema(sqlSchema: string): Promise<boolean> {
    try {
      if (!isSupabaseConfigured || !sqlSchema) {
        return false;
      }

      // Split dello schema in singoli comandi
      const commands = sqlSchema.split(';').filter(cmd => cmd.trim().length > 0);
      
      for (const command of commands) {
        const { error } = await supabase.rpc('execute_sql', { 
          sql_command: command.trim() + ';' 
        });
        
        if (error) {
          console.error(`Errore esecuzione comando SQL:`, error);
          continue;
        }
      }
      
      toast.success("Schema importato con successo");
      return true;
    } catch (error) {
      console.error("Errore durante l'importazione dello schema:", error);
      toast.error("Si è verificato un errore durante l'importazione dello schema");
      return false;
    }
  }
}

/**
 * Funzione per salvare i dati esportati in un file
 * @param data Dati da salvare
 * @param filename Nome del file
 * @param fileType Tipo MIME del file (opzionale, default: 'application/json')
 */
export function saveExportedDataToFile(data: any, filename: string, fileType: string = 'application/json'): void {
  try {
    // Converti i dati in formato stringa se non lo sono già
    const content = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
    
    // Crea un blob con i dati
    const blob = new Blob([content], { type: fileType });
    
    // Crea un URL per il blob
    const url = URL.createObjectURL(blob);
    
    // Crea un elemento <a> per il download
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    
    // Aggiungi l'elemento al documento e simula un click
    document.body.appendChild(a);
    a.click();
    
    // Pulisci
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success(`File ${filename} scaricato con successo`);
  } catch (error) {
    console.error("Errore durante il salvataggio del file:", error);
    toast.error("Si è verificato un errore durante il salvataggio del file");
  }
}

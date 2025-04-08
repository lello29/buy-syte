
/**
 * Genera lo script per l'importazione del database
 * @returns Script di importazione
 */
export function generateDatabaseImportScript(): string {
  return `// Script per l'importazione del database in Supabase
const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

// Funzione principale
async function importDatabase() {
  console.log('Inizializzazione importazione database...');
  
  // Verifica la presenza delle variabili d'ambiente
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
    console.log('Variabili d\\'ambiente mancanti. Per favore imposta:');
    console.log('- SUPABASE_URL: URL del tuo progetto Supabase');
    console.log('- SUPABASE_KEY: Chiave di servizio (service_role key) del tuo progetto Supabase');
    console.log('\\nEsempio: SUPABASE_URL=xyz SUPABASE_KEY=abc node import-database.js');
    process.exit(1);
  }
  
  // Inizializza il client Supabase con la chiave di servizio
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );
  
  try {
    // Leggi il file di esportazione
    console.log('Lettura del file database-export.json...');
    const data = JSON.parse(fs.readFileSync('database-export.json', 'utf8'));
    
    // Esegui l'importazione per ogni tabella
    const tables = Object.keys(data);
    console.log(\`Trovate \${tables.length} tabelle da importare.\`);
    
    for (const table of tables) {
      const records = data[table];
      console.log(\`Importazione tabella "\${table}" (\${records.length} record)...\`);
      
      if (records.length === 0) {
        console.log(\`Tabella "\${table}" vuota, saltata.\`);
        continue;
      }
      
      // Opzione 1: Cancella tutti i dati esistenti e inserisci i nuovi
      // Decommentare se si desidera questo comportamento
      // await supabase.from(table).delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      // Opzione 2: Upsert (aggiorna se esiste, inserisce se non esiste)
      const { error } = await supabase
        .from(table)
        .upsert(records, {
          onConflict: 'id',
          ignoreDuplicates: false
        });
      
      if (error) {
        console.error(\`Errore durante l'importazione della tabella "\${table}": \${error.message}\`);
      } else {
        console.log(\`Tabella "\${table}" importata con successo.\`);
      }
    }
    
    console.log('\\nImportazione completata!');
    
  } catch (error) {
    console.error('Errore durante l\\'importazione:', error.message);
    process.exit(1);
  }
}

// Esecuzione
importDatabase();
`;
}

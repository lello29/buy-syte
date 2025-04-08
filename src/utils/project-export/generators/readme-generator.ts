
import { ProjectConfig } from "../types";

/**
 * Genera il README con le istruzioni del progetto
 * @param config Configurazione del progetto
 * @returns Contenuto del README
 */
export function generateReadme(config: ProjectConfig): string {
  return `# ${config.name} v${config.version}

## Descrizione del Progetto
Buy-Syte è una piattaforma e-commerce che permette ai negozi di creare la propria presenza online.

## Requisiti di Sistema
- Node.js ${config.requirements.node}
- NPM ${config.requirements.npm}
- Supabase (per il backend)

## Installazione

1. Clona questo repository
2. Installa le dipendenze con \`npm install\`
3. Configura le variabili d'ambiente in un file \`.env\` nella root del progetto:
   \`\`\`
   VITE_SUPABASE_URL=URL_DEL_TUO_PROGETTO_SUPABASE
   VITE_SUPABASE_ANON_KEY=CHIAVE_ANONIMA_SUPABASE
   \`\`\`
4. Avvia il server di sviluppo con \`npm run dev\`

## Deployment

${config.deploymentInstructions}

## Struttura del Database

${config.databaseSchema 
  ? `Il database contiene le seguenti tabelle:
${config.databaseSchema.tables.map(table => `- ${table}`).join('\n')}

${config.databaseSchema.relationships 
  ? 'Relazioni tra le tabelle:\n' + 
    Object.entries(config.databaseSchema.relationships)
      .map(([table, relations]) => `- ${table} è collegato a: ${relations.join(', ')}`)
      .join('\n')
  : ''}`
  : 'Informazioni sullo schema del database non disponibili.'}

## Componenti Frontend

${config.frontendComponents
  ? config.frontendComponents.map(component => `- ${component}`).join('\n')
  : 'Informazioni sui componenti non disponibili.'}

## File Personalizzati

${config.customFiles
  ? config.customFiles.map(file => `- ${file}`).join('\n')
  : 'Nessun file personalizzato elencato.'}

## Licenza
Copyright © ${new Date().getFullYear()} - Tutti i diritti riservati
`;
}


import { ProjectConfig } from "./types";

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

/**
 * Genera la configurazione Docker
 * @returns Configurazione Docker
 */
export function generateDockerConfig(): string {
  return `# Dockerfile per l'applicazione
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`;
}

/**
 * Genera la configurazione Nginx
 * @returns Configurazione Nginx
 */
export function generateNginxConfig(): string {
  return `server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache control for static assets
    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}`;
}

/**
 * Genera lo script di setup
 * @returns Script di setup
 */
export function generateSetupScript(): string {
  return `#!/bin/bash

# Colori per l'output
GREEN='\x1b[0;32m'
RED='\x1b[0;31m'
YELLOW='\x1b[0;33m'
NC='\x1b[0m' # No Color

echo -e "${GREEN}Script di setup per Buy-Syte${NC}"
echo "------------------------------"

# Verifica Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js non è installato. Installalo per continuare.${NC}"
    exit 1
fi

# Verifica NPM
if ! command -v npm &> /dev/null; then
    echo -e "${RED}NPM non è installato. Installalo per continuare.${NC}"
    exit 1
fi

# Verifica versione Node.js
NODE_VERSION=$(node -v | cut -d 'v' -f 2)
echo -e "${YELLOW}Versione Node.js: $NODE_VERSION${NC}"
echo -e "${YELLOW}Versione NPM: $(npm -v)${NC}"

# Installa dipendenze
echo -e "${YELLOW}Installazione dipendenze...${NC}"
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}Dipendenze installate con successo!${NC}"
else
    echo -e "${RED}Errore durante l'installazione delle dipendenze.${NC}"
    exit 1
fi

# Verifica esistenza file .env
if [ ! -f .env ]; then
    echo -e "${YELLOW}File .env non trovato. Creazione di un template...${NC}"
    echo "VITE_SUPABASE_URL=" > .env
    echo "VITE_SUPABASE_ANON_KEY=" >> .env
    echo -e "${GREEN}File .env creato. Compila con le tue credenziali Supabase.${NC}"
else
    echo -e "${GREEN}File .env trovato.${NC}"
fi

# Istruzioni per l'importazione del database
echo -e "${YELLOW}Per importare il database, esegui:${NC}"
echo -e "${YELLOW}node import-database.js${NC}"

# Build del progetto
echo -e "${YELLOW}Vuoi compilare il progetto ora? (s/n)${NC}"
read -r BUILD_CHOICE
if [[ $BUILD_CHOICE =~ ^[Ss]$ ]]; then
    echo -e "${YELLOW}Compilazione del progetto...${NC}"
    npm run build
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}Progetto compilato con successo!${NC}"
        echo -e "${GREEN}I file compilati sono nella cartella 'dist'.${NC}"
    else
        echo -e "${RED}Errore durante la compilazione.${NC}"
    fi
fi

echo -e "${GREEN}Setup completato!${NC}"
echo -e "${YELLOW}Per avviare il server di sviluppo:${NC} npm run dev"
echo -e "${YELLOW}Per compilare per la produzione:${NC} npm run build"
echo -e "${YELLOW}Per importare il database:${NC} node import-database.js"
`;
}

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
    console.log('Variabili d\'ambiente mancanti. Per favore imposta:');
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
    console.error('Errore durante l\'importazione:', error.message);
    process.exit(1);
  }
}

// Esecuzione
importDatabase();
`;
}


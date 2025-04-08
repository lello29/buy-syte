
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

echo -e "\\x1b[0;32mScript di setup per Buy-Syte\\x1b[0m"
echo "------------------------------"

# Verifica Node.js
if ! command -v node &> /dev/null; then
    echo -e "\\x1b[0;31mNode.js non è installato. Installalo per continuare.\\x1b[0m"
    exit 1
fi

# Verifica NPM
if ! command -v npm &> /dev/null; then
    echo -e "\\x1b[0;31mNPM non è installato. Installalo per continuare.\\x1b[0m"
    exit 1
fi

# Verifica versione Node.js
NODE_VERSION=$(node -v | cut -d 'v' -f 2)
echo -e "\\x1b[0;33mVersione Node.js: $NODE_VERSION\\x1b[0m"
echo -e "\\x1b[0;33mVersione NPM: $(npm -v)\\x1b[0m"

# Installa dipendenze
echo -e "\\x1b[0;33mInstallazione dipendenze...\\x1b[0m"
npm install
if [ $? -eq 0 ]; then
    echo -e "\\x1b[0;32mDipendenze installate con successo!\\x1b[0m"
else
    echo -e "\\x1b[0;31mErrore durante l'installazione delle dipendenze.\\x1b[0m"
    exit 1
fi

# Verifica esistenza file .env
if [ ! -f .env ]; then
    echo -e "\\x1b[0;33mFile .env non trovato. Creazione di un template...\\x1b[0m"
    echo "VITE_SUPABASE_URL=" > .env
    echo "VITE_SUPABASE_ANON_KEY=" >> .env
    echo -e "\\x1b[0;32mFile .env creato. Compila con le tue credenziali Supabase.\\x1b[0m"
else
    echo -e "\\x1b[0;32mFile .env trovato.\\x1b[0m"
fi

# Istruzioni per l'importazione del database
echo -e "\\x1b[0;33mPer importare il database, esegui:\\x1b[0m"
echo -e "\\x1b[0;33mnode import-database.js\\x1b[0m"

# Build del progetto
echo -e "\\x1b[0;33mVuoi compilare il progetto ora? (s/n)\\x1b[0m"
read -r BUILD_CHOICE
if [[ $BUILD_CHOICE =~ ^[Ss]$ ]]; then
    echo -e "\\x1b[0;33mCompilazione del progetto...\\x1b[0m"
    npm run build
    if [ $? -eq 0 ]; then
        echo -e "\\x1b[0;32mProgetto compilato con successo!\\x1b[0m"
        echo -e "\\x1b[0;32mI file compilati sono nella cartella 'dist'.\\x1b[0m"
    else
        echo -e "\\x1b[0;31mErrore durante la compilazione.\\x1b[0m"
    fi
fi

echo -e "\\x1b[0;32mSetup completato!\\x1b[0m"
echo -e "\\x1b[0;33mPer avviare il server di sviluppo:\\x1b[0m npm run dev"
echo -e "\\x1b[0;33mPer compilare per la produzione:\\x1b[0m npm run build"
echo -e "\\x1b[0;33mPer importare il database:\\x1b[0m node import-database.js"
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

/**
 * Genera un file .env.example con le variabili d'ambiente necessarie
 * @param config Configurazione del progetto
 * @returns Contenuto del file .env.example
 */
export function generateEnvExample(config: ProjectConfig): string {
  const envVars = [
    '# Configurazione Supabase',
    'VITE_SUPABASE_URL=https://your-project.supabase.co',
    'VITE_SUPABASE_ANON_KEY=your-anon-key',
    '',
    '# Variabili per lo script di importazione del database',
    'SUPABASE_URL=https://your-project.supabase.co',
    'SUPABASE_KEY=your-service-role-key', 
    '',
    '# Configurazione del server',
    'PORT=3000',
    '',
    '# Configurazione dell\'applicazione',
    'VITE_APP_NAME=Buy-Syte',
    'VITE_API_TIMEOUT=30000',
    '',
    '# Opzioni di deployment',
    'NODE_ENV=development # Cambia in "production" per il deployment'
  ];

  // Aggiungi eventuali variabili d'ambiente specifiche del progetto
  if (config.environments && config.environments.development) {
    const devEnv = config.environments.development;
    Object.keys(devEnv).forEach(key => {
      if (!envVars.some(line => line.startsWith(key + '='))) {
        envVars.push(`${key}=${devEnv[key] || 'your-value-here'}`);
      }
    });
  }

  return envVars.join('\n');
}

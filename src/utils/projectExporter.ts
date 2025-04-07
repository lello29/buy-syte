
import { saveExportedDataToFile, DatabaseExporter } from "./exportDatabase";
import { supabaseConfig } from "@/config/databaseConfig";
import { toast } from "sonner";

/**
 * Interfaccia che rappresenta il package.json
 */
interface PackageJson {
  name: string;
  version: string;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  scripts: Record<string, string>;
  [key: string]: any;
}

/**
 * Interfaccia per la configurazione del progetto
 */
export interface ProjectConfig {
  name: string;
  version: string;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  environments: {
    development: Record<string, string>;
    production: Record<string, string>;
  };
  deploymentInstructions: string;
  requirements: {
    node: string;
    npm: string;
  };
}

/**
 * Classe per gestire l'esportazione del progetto
 */
export class ProjectExporter {
  /**
   * Genera la configurazione del progetto
   * @returns La configurazione del progetto
   */
  static async generateProjectConfig(): Promise<ProjectConfig> {
    // Questa è una configurazione di base, in un'app reale
    // dovrebbe essere recuperata da qualche fonte di configurazione
    return {
      name: "buy-syte",
      version: "1.0.0",
      supabaseUrl: supabaseConfig.url || undefined,
      supabaseAnonKey: supabaseConfig.anonKey || undefined,
      environments: {
        development: {
          "VITE_SUPABASE_URL": supabaseConfig.url || "",
          "VITE_SUPABASE_ANON_KEY": supabaseConfig.anonKey || ""
        },
        production: {
          "VITE_SUPABASE_URL": "URL_PRODUZIONE_SUPABASE",
          "VITE_SUPABASE_ANON_KEY": "CHIAVE_ANONIMA_PRODUZIONE"
        }
      },
      deploymentInstructions: `
# Istruzioni per il Deployment

## Requisiti
- Node.js >= 14.x
- NPM o Yarn
- Accesso a Supabase (account e progetto creato)

## Passaggi per il Deployment

1. **Preparazione del Build**
   \`\`\`
   npm run build
   \`\`\`
   Questo comando creerà una cartella \`dist\` con l'applicazione ottimizzata.

2. **Configurazione Variabili d'Ambiente**
   Crea un file \`.env\` nella root del progetto con:
   \`\`\`
   VITE_SUPABASE_URL=https://tuo-progetto.supabase.co
   VITE_SUPABASE_ANON_KEY=chiave-pubblica-supabase
   \`\`\`

3. **Deployment su Hosting**
   - Carica i contenuti della cartella \`dist\` sul tuo hosting.
   - Configura le variabili d'ambiente sul server.
   - Assicurati che tutte le richieste vengano reindirizzate a \`index.html\` per il routing client-side.

4. **Configurazione Server (VPS)**
   - Installa Nginx o Apache
   - Configura il web server per servire i file statici
   - Esempio di configurazione Nginx:
   \`\`\`nginx
   server {
     listen 80;
     server_name tuodominio.com;
     root /percorso/alla/cartella/dist;
     index index.html;
     
     location / {
       try_files $uri $uri/ /index.html;
     }
   }
   \`\`\`

5. **Importazione dei Dati**
   - Usa la funzionalità di importazione dati nell'app admin per caricare il database
   - Oppure importa direttamente in Supabase i dati esportati

6. **Verifica dell'Installazione**
   - Accedi all'URL del tuo sito
   - Verifica che tutte le funzionalità funzionino correttamente
   - Controlla i log per eventuali errori
      `,
      requirements: {
        node: ">=14.x",
        npm: ">=6.x"
      }
    };
  }

  /**
   * Esporta il progetto completo
   */
  static async exportProject(): Promise<void> {
    try {
      toast.info("Inizio esportazione del progetto...");

      // 1. Esportazione dati database
      const dbData = await DatabaseExporter.exportAllData();
      if (dbData) {
        saveExportedDataToFile(dbData, "database-export.json");
      }

      // 2. Generazione configurazione progetto
      const projectConfig = await this.generateProjectConfig();
      saveExportedDataToFile(projectConfig, "project-config.json");

      // 3. Generazione README con istruzioni
      const readmeContent = this.generateReadme(projectConfig);
      saveExportedDataToFile(readmeContent, "README.md");

      // 4. Generazione file Docker
      const dockerConfig = this.generateDockerConfig();
      saveExportedDataToFile(dockerConfig, "Dockerfile");

      // 5. Generazione configurazione nginx
      const nginxConfig = this.generateNginxConfig();
      saveExportedDataToFile(nginxConfig, "nginx.conf");

      // 6. Generazione script di setup
      const setupScript = this.generateSetupScript();
      saveExportedDataToFile(setupScript, "setup.sh");

      toast.success("Esportazione del progetto completata con successo!");
    } catch (error) {
      console.error("Errore durante l'esportazione del progetto:", error);
      toast.error("Si è verificato un errore durante l'esportazione del progetto");
    }
  }

  /**
   * Genera il README del progetto
   * @param config Configurazione del progetto
   * @returns Contenuto del README
   */
  private static generateReadme(config: ProjectConfig): string {
    return `# ${config.name} v${config.version}

## Descrizione
Applicazione web per la gestione di negozi, prodotti e ordini.

## Requisiti Tecnici
- Node.js ${config.requirements.node}
- NPM ${config.requirements.npm}
- Accesso a Supabase (database PostgreSQL)

## Configurazione Ambiente

### Variabili d'Ambiente
Crea un file \`.env\` nella root del progetto con le seguenti variabili:

\`\`\`
VITE_SUPABASE_URL=https://tuo-progetto.supabase.co
VITE_SUPABASE_ANON_KEY=chiave-anonima-supabase
\`\`\`

## Installazione

1. Clona il repository
   \`\`\`bash
   git clone <url-repository>
   cd ${config.name}
   \`\`\`

2. Installa le dipendenze
   \`\`\`bash
   npm install
   \`\`\`

3. Avvia il server di sviluppo
   \`\`\`bash
   npm run dev
   \`\`\`

4. Per il build di produzione
   \`\`\`bash
   npm run build
   \`\`\`

## Struttura del Database
Il progetto utilizza Supabase come backend. Importa il file \`database-export.json\` usando l'interfaccia di amministrazione o gli script forniti.

## Deployment

${config.deploymentInstructions}

## Docker
È disponibile un Dockerfile per containerizzare l'applicazione. Usa i seguenti comandi:

\`\`\`bash
# Build dell'immagine
docker build -t ${config.name} .

# Avvio del container
docker run -p 80:80 -e VITE_SUPABASE_URL=url -e VITE_SUPABASE_ANON_KEY=chiave ${config.name}
\`\`\`

## Supporto
Per problemi o domande, contatta l'amministratore del sistema.
`;
  }

  /**
   * Genera la configurazione Docker
   * @returns Contenuto del Dockerfile
   */
  private static generateDockerConfig(): string {
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
CMD ["nginx", "-g", "daemon off;"]
`;
  }

  /**
   * Genera la configurazione nginx
   * @returns Contenuto del file nginx.conf
   */
  private static generateNginxConfig(): string {
    return `server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;
    
    # Compressione gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # Gestione cache
    location ~* \\.(js|css|png|jpg|jpeg|gif|ico)$ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000";
    }
    
    # Gestione routing SPA
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Configurazione sicurezza
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";
    add_header Referrer-Policy "no-referrer-when-downgrade";
}
`;
  }

  /**
   * Genera lo script di setup
   * @returns Contenuto dello script setup.sh
   */
  private static generateSetupScript(): string {
    return `#!/bin/bash
# Script di setup per il progetto

# Colori per output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Inizializzazione setup del progetto...${NC}"

# Verifica Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js non trovato. Installalo prima di continuare.${NC}"
    exit 1
fi

# Verifica npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}npm non trovato. Installalo prima di continuare.${NC}"
    exit 1
fi

# Verifica versione Node.js
NODE_VERSION=$(node -v | cut -d "v" -f 2)
echo -e "${YELLOW}Versione Node.js: $NODE_VERSION${NC}"

# Installa dipendenze
echo -e "${YELLOW}Installazione dipendenze...${NC}"
npm install

# Creazione file .env se non esiste
if [ ! -f .env ]; then
    echo -e "${YELLOW}Creazione file .env...${NC}"
    echo "VITE_SUPABASE_URL=inserisci-url-supabase" > .env
    echo "VITE_SUPABASE_ANON_KEY=inserisci-chiave-anonima-supabase" >> .env
    echo -e "${GREEN}File .env creato. Modifica le variabili con i tuoi valori.${NC}"
else
    echo -e "${GREEN}File .env già esistente.${NC}"
fi

# Build del progetto
echo -e "${YELLOW}Creazione build di produzione...${NC}"
npm run build

# Verifica se il build è andato a buon fine
if [ -d "dist" ]; then
    echo -e "${GREEN}Build completato con successo!${NC}"
    echo -e "${GREEN}I file di build sono disponibili nella cartella 'dist'.${NC}"
else
    echo -e "${RED}Errore durante il build.${NC}"
    exit 1
fi

echo -e "${GREEN}Setup completato con successo!${NC}"
echo -e "${YELLOW}Per avviare l'app in modalità sviluppo: ${NC}npm run dev"
echo -e "${YELLOW}Per servire l'app di produzione, copia la cartella 'dist' sul server web.${NC}"
`;
  }
}


/**
 * Generators for various configuration files
 */

/**
 * Genera il README del progetto
 * @param config Configurazione del progetto
 * @returns Contenuto del README
 */
export function generateReadme(config: import('./types').ProjectConfig): string {
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
CMD ["nginx", "-g", "daemon off;"]
`;
}

/**
 * Genera la configurazione nginx
 * @returns Contenuto del file nginx.conf
 */
export function generateNginxConfig(): string {
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
export function generateSetupScript(): string {
  return `#!/bin/bash
# Script di setup per il progetto

# Colori per output
GREEN='\\x1b[0;32m'
RED='\\x1b[0;31m'
YELLOW='\\x1b[0;33m'
NC='\\x1b[0m' # No Color

echo -e "\${GREEN}Inizializzazione setup del progetto...\${NC}"

# Verifica Node.js
if ! command -v node &> /dev/null; then
    echo -e "\${RED}Node.js non trovato. Installalo prima di continuare.\${NC}"
    exit 1
fi

# Verifica npm
if ! command -v npm &> /dev/null; then
    echo -e "\${RED}npm non trovato. Installalo prima di continuare.\${NC}"
    exit 1
fi

# Verifica versione Node.js
NODE_VERSION=$(node -v | cut -d "v" -f 2)
echo -e "\${YELLOW}Versione Node.js: $NODE_VERSION\${NC}"

# Installa dipendenze
echo -e "\${YELLOW}Installazione dipendenze...\${NC}"
npm install

# Creazione file .env se non esiste
if [ ! -f .env ]; then
    echo -e "\${YELLOW}Creazione file .env...\${NC}"
    echo "VITE_SUPABASE_URL=inserisci-url-supabase" > .env
    echo "VITE_SUPABASE_ANON_KEY=inserisci-chiave-anonima-supabase" >> .env
    echo -e "\${GREEN}File .env creato. Modifica le variabili con i tuoi valori.\${NC}"
else
    echo -e "\${GREEN}File .env già esistente.\${NC}"
fi

# Build del progetto
echo -e "\${YELLOW}Creazione build di produzione...\${NC}"
npm run build

# Verifica se il build è andato a buon fine
if [ -d "dist" ]; then
    echo -e "\${GREEN}Build completato con successo!\${NC}"
    echo -e "\${GREEN}I file di build sono disponibili nella cartella 'dist'.\${NC}"
else
    echo -e "\${RED}Errore durante il build.\${NC}"
    exit 1
fi

echo -e "\${GREEN}Setup completato con successo!\${NC}"
echo -e "\${YELLOW}Per avviare l'app in modalità sviluppo: \${NC}npm run dev"
echo -e "\${YELLOW}Per servire l'app di produzione, copia la cartella 'dist' sul server web.\${NC}"
`;
}

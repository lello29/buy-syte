
/**
 * Utility per il deployment dell'applicazione su hosting o VPS
 */
import { supabaseConfig, checkDatabaseConnection } from '@/config/databaseConfig';

/**
 * Verifica la configurazione di deployment prima dell'avvio dell'applicazione
 * @returns True se l'applicazione è configurata correttamente per il deployment
 */
export const checkDeploymentConfig = async (): Promise<{
  isReady: boolean;
  issues: string[];
}> => {
  const issues: string[] = [];
  
  // Verifica connessione al database
  if (!checkDatabaseConnection()) {
    issues.push("Database non configurato correttamente. Controlla le variabili d'ambiente.");
  }
  
  // Verifica altre configurazioni necessarie per il deployment
  // Per esempio, API keys, configurazioni di servizi esterni, ecc.
  
  return {
    isReady: issues.length === 0,
    issues
  };
};

/**
 * Genera le istruzioni per il deployment in base alla configurazione attuale
 */
export const getDeploymentInstructions = (): string => {
  const instructions = [
    '# Istruzioni per il Deployment',
    '',
    '## Requisiti',
    '- Node.js >= 14.x',
    '- NPM o Yarn',
    '- Accesso a Supabase (account e progetto creato)',
    '',
    '## Passaggi per il Deployment',
    '',
    '1. **Preparazione del Build**',
    '   ```',
    '   npm run build',
    '   ```',
    '   Questo comando creerà una cartella `dist` con l\'applicazione ottimizzata.',
    '',
    '2. **Configurazione Variabili d\'Ambiente**',
    '   Crea un file `.env` nella root del progetto con:',
    '   ```',
    '   VITE_SUPABASE_URL=https://tuo-progetto.supabase.co',
    '   VITE_SUPABASE_ANON_KEY=chiave-pubblica-supabase',
    '   ```',
    '',
    '3. **Deployment su Hosting**',
    '   - Carica i contenuti della cartella `dist` sul tuo hosting.',
    '   - Configura le variabili d\'ambiente sul server.',
    '   - Assicurati che tutte le richieste vengano reindirizzate a `index.html` per il routing client-side.',
    '',
    '4. **Configurazione Server (VPS)**',
    '   - Installa Nginx o Apache',
    '   - Configura il web server per servire i file statici',
    '   - Esempio di configurazione Nginx:',
    '   ```nginx',
    '   server {',
    '     listen 80;',
    '     server_name tuodominio.com;',
    '     root /percorso/alla/cartella/dist;',
    '     index index.html;',
    '     ',
    '     location / {',
    '       try_files $uri $uri/ /index.html;',
    '     }',
    '   }',
    '   ```',
    '',
    '5. **Verifica dell\'Installazione**',
    '   - Accedi all\'URL del tuo sito',
    '   - Verifica che tutte le funzionalità funzionino correttamente',
    '   - Controlla i log per eventuali errori',
  ].join('\n');
  
  return instructions;
};

/**
 * Utile per generare un file di configurazione per Docker
 */
export const generateDockerConfig = (): string => {
  return `# Dockerfile per l'applicazione
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY deployment/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Per utilizzare questo Dockerfile:
# 1. Crea una cartella 'deployment' e aggiungi un file nginx.conf
# 2. Esegui: docker build -t nome-app .
# 3. Esegui: docker run -p 80:80 -e VITE_SUPABASE_URL=url -e VITE_SUPABASE_ANON_KEY=chiave nome-app
`;
};


import { ProjectConfig } from "../types";

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

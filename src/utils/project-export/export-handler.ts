
import { saveExportedDataToFile, DatabaseExporter } from "../exportDatabase";
import { toast } from "sonner";
import { generateProjectConfig } from "./config-generator";
import { 
  generateReadme, 
  generateDockerConfig, 
  generateNginxConfig, 
  generateSetupScript,
  generateDatabaseImportScript,
  generateEnvExample,
  generateSshConfig
} from "./document-generators";
import { ExportOptions, defaultExportOptions } from "./types";
import JSZip from "jszip";

/**
 * Gestisce l'esportazione del progetto completo
 * @param options Opzioni di esportazione personalizzate
 */
export async function exportProject(
  options: ExportOptions = defaultExportOptions
): Promise<void> {
  try {
    toast.info("Inizio esportazione del progetto...");
    
    // Creiamo un nuovo oggetto ZIP
    const zip = new JSZip();
    
    // 1. Esportazione dati database
    if (options.includeDatabase) {
      const dbData = await DatabaseExporter.exportAllData();
      if (dbData) {
        // Aggiungiamo i dati del database al file ZIP
        zip.file("database/database-export.json", JSON.stringify(dbData, null, 2));
        
        // Script per l'importazione del database
        const importScript = generateDatabaseImportScript();
        zip.file("scripts/import-database.js", importScript);
      }
    }

    // 2. Generazione configurazione progetto
    const projectConfig = await generateProjectConfig();
    zip.file("project-config.json", JSON.stringify(projectConfig, null, 2));

    // 3. Generazione README con istruzioni
    if (options.includeDocs) {
      const readmeContent = generateReadme(projectConfig);
      zip.file("README.md", readmeContent);
    }

    // 4. Generazione file Docker
    if (options.includeDocker) {
      const dockerConfig = generateDockerConfig();
      zip.file("Dockerfile", dockerConfig);
      
      // Aggiungiamo anche il docker-compose.yml
      zip.file("docker-compose.yml", `version: '3'
services:
  app:
    build: .
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
      - VITE_SUPABASE_URL=\${VITE_SUPABASE_URL}
      - VITE_SUPABASE_ANON_KEY=\${VITE_SUPABASE_ANON_KEY}
    volumes:
      - ./logs:/app/logs
    restart: unless-stopped
    networks:
      - app-network

  # Database di sviluppo se necessario
  db-dev:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_USER: postgres
      POSTGRES_DB: app
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  pgdata:`);
    }

    // 5. Generazione configurazione nginx
    if (options.includeNginx) {
      const nginxConfig = generateNginxConfig();
      zip.file("config/nginx.conf", nginxConfig);
    }

    // 6. Generazione script di setup
    if (options.includeSetupScript) {
      const setupScript = generateSetupScript();
      zip.file("scripts/setup.sh", setupScript);
      
      // Aggiungiamo anche uno script per il deploy
      zip.file("scripts/deploy.sh", `#!/bin/bash

# Script per il deployment automatico
echo -e "\\x1b[0;32mAvvio script di deployment\\x1b[0m"

# Verifica git
if ! command -v git &> /dev/null; then
    echo -e "\\x1b[0;31mGit non è installato. Installalo per continuare.\\x1b[0m"
    exit 1
fi

# Pull dal repository
echo -e "\\x1b[0;33mAggiornamento codice dal repository...\\x1b[0m"
git pull origin main

# Installa dipendenze
echo -e "\\x1b[0;33mInstallazione dipendenze...\\x1b[0m"
npm install --production

# Build applicazione
echo -e "\\x1b[0;33mCompilazione applicazione...\\x1b[0m"
npm run build

# Riavvia servizi (se necessario)
echo -e "\\x1b[0;33mRiavvio servizi...\\x1b[0m"
# Esempio con PM2
if command -v pm2 &> /dev/null; then
    pm2 restart app
else
    echo -e "\\x1b[0;33mPM2 non trovato. Riavvia manualmente l'applicazione.\\x1b[0m"
fi

echo -e "\\x1b[0;32mDeployment completato!\\x1b[0m"
`);
    }

    // 7. Generazione file .env.example
    const envExample = generateEnvExample(projectConfig);
    zip.file(".env.example", envExample);
    
    // 8. Aggiungiamo configurazione SSH
    if (options.includeSshConfig) {
      const sshConfig = generateSshConfig();
      zip.file("config/ssh_config", sshConfig);
      zip.file("config/deploy-keys/README.md", `# Chiavi di deployment

Questa cartella è destinata a contenere le chiavi SSH per il deployment.

## Istruzioni
1. Genera una coppia di chiavi SSH con \`ssh-keygen -t rsa -b 4096 -C "deploy@buysyte.com"\`
2. Salva la chiave privata come \`id_rsa\` in questa cartella
3. Aggiungi la chiave pubblica (\`id_rsa.pub\`) ai server di destinazione

**Nota importante**: Non includere mai chiavi private nei repository Git. Questo file serve solo come promemoria.`);
    }
    
    // 9. Copia della struttura del codice sorgente
    // Struttura principale dell'applicazione
    zip.file("src/main.tsx", `import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { ThemeProvider } from './components/theme-provider'
import { Toaster } from './components/ui/toaster'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="buysyte-theme">
        <App />
        <Toaster />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)`);

    zip.file("src/App.tsx", `import { Routes, Route } from 'react-router-dom'
import { PublicRoutes } from './routes/PublicRoutes'
import { DashboardRoutes } from './routes/DashboardRoutes'
import { AuthProvider } from './contexts/auth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SupabaseWrapper } from './components/supabase/SupabaseWrapper'

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SupabaseWrapper>
          <Routes>
            <Route path="/*" element={<PublicRoutes />} />
            <Route path="/dashboard/*" element={<DashboardRoutes />} />
          </Routes>
        </SupabaseWrapper>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App`);

    zip.file("src/index.css", `@tailwind base;
@tailwind components;
@tailwind utilities;
 
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
 
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
 
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
 
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
 
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
 
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
 
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
 
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
 
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
 
    --radius: 0.5rem;
  }
 
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
 
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
 
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
 
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
 
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
 
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
 
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
 
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
 
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}
 
@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}`);
    
    // Aggiungiamo cartelle e file di base per le varie sezioni
    const srcFolders = [
      "components", "hooks", "pages", "utils", "services", 
      "contexts", "lib", "types", "data"
    ];
    
    srcFolders.forEach(folder => {
      zip.file(`src/${folder}/.gitkeep`, "");
    });
    
    // 10. Struttura delle cartelle principali
    const mainFolders = [
      "public", "dist", "logs", "config", "scripts", "database"
    ];
    
    mainFolders.forEach(folder => {
      zip.file(`${folder}/.gitkeep`, "");
    });
    
    // 11. Aggiungiamo file di configurazione di base
    zip.file("tsconfig.json", JSON.stringify({
      "compilerOptions": {
        "target": "ES2020",
        "useDefineForClassFields": true,
        "lib": ["ES2020", "DOM", "DOM.Iterable"],
        "module": "ESNext",
        "skipLibCheck": true,
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true,
        "moduleResolution": "bundler",
        "allowImportingTsExtensions": true,
        "resolveJsonModule": true,
        "isolatedModules": true,
        "noEmit": true,
        "jsx": "react-jsx",
        "strict": true,
        "noUnusedLocals": false,
        "noUnusedParameters": false,
        "noFallthroughCasesInSwitch": true,
        "baseUrl": ".",
        "paths": {
          "@/*": ["./src/*"]
        }
      },
      "include": ["src"],
      "references": [{ "path": "./tsconfig.node.json" }]
    }, null, 2));
    
    zip.file("vite.config.ts", `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})`);
    
    zip.file("package.json", JSON.stringify({
      "name": projectConfig.name,
      "private": true,
      "version": projectConfig.version,
      "type": "module",
      "scripts": {
        "dev": "vite",
        "build": "tsc && vite build",
        "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
        "preview": "vite preview",
        "setup": "bash scripts/setup.sh",
        "deploy": "bash scripts/deploy.sh"
      },
      "dependencies": {
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "react-router-dom": "^6.14.0",
        "@supabase/supabase-js": "^2.22.0",
        "@tanstack/react-query": "^5.14.0",
        "@hookform/resolvers": "^3.3.2",
        "react-hook-form": "^7.48.2",
        "zod": "^3.22.4",
        "clsx": "^2.0.0",
        "tailwind-merge": "^2.1.0",
        "class-variance-authority": "^0.7.0",
        "lucide-react": "^0.294.0",
        "sonner": "^1.2.4",
        "date-fns": "^3.0.0",
        "jszip": "^3.10.1",
        "xlsx": "^0.18.5",
        "recharts": "^2.10.3"
      },
      "devDependencies": {
        "@types/node": "^20.10.4",
        "@types/react": "^18.2.14",
        "@types/react-dom": "^18.2.6",
        "@typescript-eslint/eslint-plugin": "^6.14.0",
        "@typescript-eslint/parser": "^6.14.0",
        "@vitejs/plugin-react": "^4.2.1",
        "autoprefixer": "^10.4.16",
        "eslint": "^8.55.0",
        "eslint-plugin-react-hooks": "^4.6.0",
        "eslint-plugin-react-refresh": "^0.4.5",
        "postcss": "^8.4.32",
        "tailwindcss": "^3.3.6",
        "tailwindcss-animate": "^1.0.7",
        "typescript": "^5.3.3",
        "vite": "^5.0.7"
      }
    }, null, 2));
    
    zip.file(".eslintrc.cjs", `module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}`);

    zip.file("postcss.config.js", `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`);

    zip.file("tailwind.config.js", `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}`);

    zip.file(".gitignore", `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local
.env
.env.*
!.env.example

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Deployment keys
config/deploy-keys/*
!config/deploy-keys/README.md
`);

    // 12. Generiamo ed esportiamo il file ZIP
    const content = await zip.generateAsync({
      type: "blob",
      compression: "DEFLATE",
      compressionOptions: {
        level: 9
      }
    });
    
    // Salva il file ZIP
    const url = URL.createObjectURL(content);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${projectConfig.name}-export.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success("Esportazione del progetto completata con successo!");
  } catch (error) {
    console.error("Errore durante l'esportazione del progetto:", error);
    toast.error("Si è verificato un errore durante l'esportazione del progetto");
  }
}

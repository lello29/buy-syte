
import { saveExportedDataToFile, DatabaseExporter } from "../exportDatabase";
import { toast } from "sonner";
import { generateProjectConfig } from "./config-generator";
import { 
  generateReadme, 
  generateDockerConfig, 
  generateNginxConfig, 
  generateSetupScript,
  generateDatabaseImportScript,
  generateEnvExample
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
        zip.file("database-export.json", JSON.stringify(dbData, null, 2));
        
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
      - VITE_SUPABASE_ANON_KEY=\${VITE_SUPABASE_ANON_KEY}`);
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
    }

    // 7. Generazione file .env.example
    const envExample = generateEnvExample(projectConfig);
    zip.file(".env.example", envExample);
    
    // 8. Copia della struttura del codice sorgente (simulazione)
    zip.file("src/main.tsx", "// Contenuto del file main.tsx");
    zip.file("src/App.tsx", "// Contenuto del file App.tsx");
    zip.file("src/index.css", "/* Contenuto del file index.css */");
    
    // Aggiungiamo cartelle e file di base per le varie sezioni
    const srcFolders = [
      "components", "hooks", "pages", "utils", "services", 
      "contexts", "lib", "types", "data"
    ];
    
    srcFolders.forEach(folder => {
      zip.file(`src/${folder}/.gitkeep`, "");
    });
    
    // 9. Aggiungiamo file di configurazione di base
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
        "preview": "vite preview"
      },
      "dependencies": {
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "react-router-dom": "^6.14.0",
        "@supabase/supabase-js": "^2.22.0"
      },
      "devDependencies": {
        "@types/react": "^18.2.14",
        "@types/react-dom": "^18.2.6",
        "@typescript-eslint/eslint-plugin": "^5.61.0",
        "@typescript-eslint/parser": "^5.61.0",
        "@vitejs/plugin-react": "^4.0.1",
        "autoprefixer": "^10.4.14",
        "eslint": "^8.44.0",
        "eslint-plugin-react-hooks": "^4.6.0",
        "eslint-plugin-react-refresh": "^0.4.1",
        "postcss": "^8.4.25",
        "tailwindcss": "^3.3.2",
        "typescript": "^5.0.2",
        "vite": "^4.4.0"
      }
    }, null, 2));
    
    // 10. Generiamo ed esportiamo il file ZIP
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

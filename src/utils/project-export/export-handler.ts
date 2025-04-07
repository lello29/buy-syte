
import { saveExportedDataToFile, DatabaseExporter } from "../exportDatabase";
import { toast } from "sonner";
import { generateProjectConfig } from "./config-generator";
import { 
  generateReadme, 
  generateDockerConfig, 
  generateNginxConfig, 
  generateSetupScript,
  generateDatabaseImportScript
} from "./document-generators";
import { ExportOptions, defaultExportOptions } from "./types";

/**
 * Gestisce l'esportazione del progetto completo
 * @param options Opzioni di esportazione personalizzate
 */
export async function exportProject(
  options: ExportOptions = defaultExportOptions
): Promise<void> {
  try {
    toast.info("Inizio esportazione del progetto...");

    // 1. Esportazione dati database
    if (options.includeDatabase) {
      const dbData = await DatabaseExporter.exportAllData();
      if (dbData) {
        saveExportedDataToFile(dbData, "database-export.json");
        
        // Script per l'importazione del database
        const importScript = generateDatabaseImportScript();
        saveExportedDataToFile(importScript, "import-database.js");
      }
    }

    // 2. Generazione configurazione progetto
    const projectConfig = await generateProjectConfig();
    saveExportedDataToFile(projectConfig, "project-config.json");

    // 3. Generazione README con istruzioni
    if (options.includeDocs) {
      const readmeContent = generateReadme(projectConfig);
      saveExportedDataToFile(readmeContent, "README.md");
    }

    // 4. Generazione file Docker
    if (options.includeDocker) {
      const dockerConfig = generateDockerConfig();
      saveExportedDataToFile(dockerConfig, "Dockerfile");
    }

    // 5. Generazione configurazione nginx
    if (options.includeNginx) {
      const nginxConfig = generateNginxConfig();
      saveExportedDataToFile(nginxConfig, "nginx.conf");
    }

    // 6. Generazione script di setup
    if (options.includeSetupScript) {
      const setupScript = generateSetupScript();
      saveExportedDataToFile(setupScript, "setup.sh");
    }

    toast.success("Esportazione del progetto completata con successo!");
  } catch (error) {
    console.error("Errore durante l'esportazione del progetto:", error);
    toast.error("Si è verificato un errore durante l'esportazione del progetto");
  }
}


import { saveExportedDataToFile, DatabaseExporter } from "../exportDatabase";
import { toast } from "sonner";
import { generateProjectConfig } from "./config-generator";
import { 
  generateReadme, 
  generateDockerConfig, 
  generateNginxConfig, 
  generateSetupScript 
} from "./document-generators";

/**
 * Gestisce l'esportazione del progetto completo
 */
export async function exportProject(): Promise<void> {
  try {
    toast.info("Inizio esportazione del progetto...");

    // 1. Esportazione dati database
    const dbData = await DatabaseExporter.exportAllData();
    if (dbData) {
      saveExportedDataToFile(dbData, "database-export.json");
    }

    // 2. Generazione configurazione progetto
    const projectConfig = await generateProjectConfig();
    saveExportedDataToFile(projectConfig, "project-config.json");

    // 3. Generazione README con istruzioni
    const readmeContent = generateReadme(projectConfig);
    saveExportedDataToFile(readmeContent, "README.md");

    // 4. Generazione file Docker
    const dockerConfig = generateDockerConfig();
    saveExportedDataToFile(dockerConfig, "Dockerfile");

    // 5. Generazione configurazione nginx
    const nginxConfig = generateNginxConfig();
    saveExportedDataToFile(nginxConfig, "nginx.conf");

    // 6. Generazione script di setup
    const setupScript = generateSetupScript();
    saveExportedDataToFile(setupScript, "setup.sh");

    toast.success("Esportazione del progetto completata con successo!");
  } catch (error) {
    console.error("Errore durante l'esportazione del progetto:", error);
    toast.error("Si è verificato un errore durante l'esportazione del progetto");
  }
}

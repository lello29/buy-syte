
import { exportProject, generateProjectConfig, ProjectConfig, ExportOptions } from './project-export';
import { 
  generateDockerConfig, 
  generateReadme, 
  generateNginxConfig, 
  generateSetupScript, 
  generateDatabaseImportScript,
  generateEnvExample,
  generateSshConfig
} from './project-export/document-generators';

/**
 * Classe per gestire l'esportazione del progetto
 */
export class ProjectExporter {
  /**
   * Genera la configurazione del progetto
   * @returns La configurazione del progetto
   */
  static generateProjectConfig = generateProjectConfig;

  /**
   * Esporta il progetto completo come file ZIP
   * @param options Opzioni di esportazione personalizzate
   */
  static exportProject = exportProject;

  /**
   * Genera la configurazione Docker
   * @returns Configurazione Docker come stringa
   */
  static generateDockerConfig = generateDockerConfig;

  /**
   * Genera il README con le istruzioni del progetto
   * @param config Configurazione del progetto
   * @returns Contenuto del README
   */
  static generateReadme = generateReadme;

  /**
   * Genera la configurazione Nginx
   * @returns Configurazione Nginx come stringa
   */
  static generateNginxConfig = generateNginxConfig;

  /**
   * Genera lo script di setup
   * @returns Script di setup come stringa
   */
  static generateSetupScript = generateSetupScript;
  
  /**
   * Genera lo script per l'importazione del database
   * @returns Script di importazione come stringa
   */
  static generateDatabaseImportScript = generateDatabaseImportScript;

  /**
   * Genera un file .env.example con le variabili d'ambiente necessarie
   * @param config Configurazione del progetto
   * @returns Contenuto del file .env.example
   */
  static generateEnvExample = generateEnvExample;

  /**
   * Genera configurazione SSH per il deployment
   * @returns Configurazione SSH come stringa
   */
  static generateSshConfig = generateSshConfig;
}

// Re-export types
export type { ProjectConfig, ExportOptions } from './project-export';

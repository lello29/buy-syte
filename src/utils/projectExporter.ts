
import { exportProject, generateProjectConfig, ProjectConfig } from './project-export';

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
   * Esporta il progetto completo
   */
  static exportProject = exportProject;
}

// Re-export types
export type { ProjectConfig } from './project-export';

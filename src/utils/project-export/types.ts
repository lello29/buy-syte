
/**
 * Interface that represents package.json
 */
export interface PackageJson {
  name: string;
  version: string;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  scripts: Record<string, string>;
  [key: string]: any;
}

/**
 * Interface for project configuration
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
  databaseSchema?: {
    tables: string[];
    relationships?: Record<string, string[]>;
  };
  frontendComponents?: string[];
  customFiles?: string[];
}

/**
 * Interface for export options
 */
export interface ExportOptions {
  includeDatabase: boolean;
  includeConfig: boolean;
  includeDocker: boolean;
  includeNginx: boolean;
  includeSetupScript: boolean;
  includeDocs: boolean;
  includeSshConfig?: boolean;
}

/**
 * Default export options
 */
export const defaultExportOptions: ExportOptions = {
  includeDatabase: true,
  includeConfig: true,
  includeDocker: true,
  includeNginx: true,
  includeSetupScript: true,
  includeDocs: true,
  includeSshConfig: true
};

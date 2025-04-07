
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
}

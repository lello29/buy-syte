
import { shopCreationService } from './shopCreationService';
import { shopMigrationService } from './shopMigrationService';

/**
 * Combined shop services for Supabase operations
 */
export const shopService = {
  ...shopCreationService,
  ...shopMigrationService
};

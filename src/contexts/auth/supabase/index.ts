
import { supabaseAuth } from './auth';
import { userProfileService } from './userProfile';
import { shopService } from './shop';

/**
 * Combined Supabase services
 */
export const supabaseServices = {
  auth: supabaseAuth,
  userProfile: userProfileService,
  shop: shopService
};

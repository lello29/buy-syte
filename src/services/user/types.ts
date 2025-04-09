
import { User, UserRole } from "@/types";

/**
 * Data format for inserting a new user into the database
 */
export interface UserInsertData {
  name: string;
  email: string;
  role: UserRole;
  favorites?: string[];
  loyalty_points?: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
  fiscal_code?: string | null;
  vat_number?: string | null;
  password?: string;
}

/**
 * Data format for updating an existing user in the database
 */
export interface UserUpdateData {
  name?: string;
  email?: string;
  role?: UserRole;
  fiscal_code?: string | null;
  vat_number?: string | null;
  is_active?: boolean;
  updated_at?: string;
}

/**
 * Service response interface
 */
export interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

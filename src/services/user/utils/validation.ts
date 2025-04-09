
import { UserInsertData, UserUpdateData } from "../types";
import { User } from "@/types";

/**
 * Validates user data before insertion
 */
export const validateUserData = (userData: Partial<User>): string | null => {
  if (!userData.name) {
    return "Il nome è obbligatorio";
  }
  
  if (!userData.email) {
    return "L'email è obbligatoria";
  }
  
  if (!userData.role) {
    return "Il ruolo è obbligatorio";
  }

  return null;
};

/**
 * Maps User type to UserInsertData for database operations
 */
export const mapToInsertData = (userData: Omit<User, "id" | "createdAt" | "updatedAt"> & { password?: string }): UserInsertData => {
  return {
    name: userData.name,
    email: userData.email,
    role: userData.role,
    favorites: userData.favorites || [],
    loyalty_points: userData.loyaltyPoints || 0,
    is_active: userData.isActive,
    fiscal_code: userData.fiscalCode || null,
    vat_number: userData.vatNumber || null,
    password: userData.password
  };
};

/**
 * Maps User type to UserUpdateData for database operations
 */
export const mapToUpdateData = (userData: Partial<User>): UserUpdateData => {
  return {
    name: userData.name,
    email: userData.email,
    role: userData.role,
    fiscal_code: userData.fiscalCode || null,
    vat_number: userData.vatNumber || null,
    is_active: userData.isActive,
    updated_at: new Date().toISOString(),
  };
};

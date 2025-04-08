
import { Shop } from '@/types';
import { toast } from "sonner";

/**
 * Updates a shop object with new field values from form inputs
 */
export const updateShopField = (
  shop: Shop | null,
  name: string,
  value: string | boolean
): Shop | null => {
  if (!shop) return shop;
  
  // Handle special fields
  if (name === 'latitude' || name === 'longitude') {
    const location = shop.location || { latitude: 0, longitude: 0 };
    const newLocation = {
      ...location,
      [name]: parseFloat(value.toString()) || 0
    };
    
    return {
      ...shop,
      location: newLocation
    };
  }
  
  // Handle boolean values like isApproved
  if (name === 'isApproved') {
    return {
      ...shop,
      [name]: value === 'true' || (typeof value === 'boolean' && value === true)
    };
  }
  
  // Handle regular string inputs
  return {
    ...shop,
    [name]: value
  };
};

/**
 * Validates required shop fields
 */
export const validateShopFields = (shop: Shop | null): boolean => {
  if (!shop) return false;
  
  if (!shop.name || !shop.address || 
      !shop.phone || !shop.email || !shop.fiscalCode || 
      !shop.vatNumber) {
    toast.error('Compila tutti i campi obbligatori');
    return false;
  }
  
  return true;
};

/**
 * Creates a new shop object from form data
 */
export const createNewShopObject = (shopData: {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  fiscalCode: string;
  vatNumber: string;
  category: string;
}): Shop => {
  const now = new Date().toISOString();
  
  return {
    id: `shop-${Date.now()}`,
    userId: `user-${Date.now()}`,
    name: shopData.name,
    description: shopData.description || '',
    address: shopData.address,
    phone: shopData.phone,
    email: shopData.email,
    products: [],
    offers: [],
    aiCredits: 100, // Default credits
    isActive: true,
    isApproved: false, // New shops are not approved by default
    lastUpdated: now,
    createdAt: now,
    fiscalCode: shopData.fiscalCode,
    vatNumber: shopData.vatNumber,
    category: shopData.category,
    location: null // Adding required location property
  };
};

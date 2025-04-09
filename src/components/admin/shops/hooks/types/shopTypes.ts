
export interface ShopFormData {
  name: string;
  description?: string;  // Changed to optional to match Shop type
  address?: string;
  phone?: string;
  email?: string;
  category?: string;
  fiscalCode?: string;
  vatNumber?: string;
  userId?: string;  // Added userId property
  isActive?: boolean;
  isApproved?: boolean;
  latitude?: number;  // Added direct latitude property
  longitude?: number;  // Added direct longitude property
  location?: {
    latitude: number | null;
    longitude: number | null;
  } | null;
}

export interface ShopLocation {
  latitude: number | null;
  longitude: number | null;
}

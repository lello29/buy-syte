
export interface ShopFormData {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  category: string;
  fiscalCode: string;
  vatNumber: string;
  isActive?: boolean;
  isApproved?: boolean;
  location?: {
    latitude: number | null;
    longitude: number | null;
  } | null;
}

export interface ShopLocation {
  latitude: number | null;
  longitude: number | null;
}


export interface ShopFormData {
  shopName: string;
  description: string;
  address: string;
  phone: string;
  fiscalCode: string;
  vatNumber: string;
  latitude?: number;
  longitude?: number;
  category?: string;
}

export interface ShopFormErrors {
  [key: string]: string;
}

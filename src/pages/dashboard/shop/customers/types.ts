
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  points: number;
  orders: number;
  lastPurchase?: string;
  notes?: string;
  address?: string;
}

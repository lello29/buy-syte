
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
  
  // Adding the missing properties that are referenced in components
  orderCount?: number;
  totalSpent?: number;
  lastOrderDate?: string;
}

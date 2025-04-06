
export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string; // Added this property
  address?: string;
  orderCount?: number;
  totalSpent?: number;
  lastOrderDate?: string;
  notes?: string;
  createdAt: string;
}


import { Customer } from "../types";

export const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "Mario Rossi",
    email: "mario.rossi@example.com",
    phone: "+39 333 1234567",
    points: 120,
    orders: 5,
    lastPurchase: "2023-04-01",
    orderCount: 5,
    totalSpent: 350.50,
    lastOrderDate: "2023-04-01"
  },
  {
    id: "2",
    name: "Giulia Bianchi",
    email: "giulia.bianchi@example.com",
    phone: "+39 333 7654321",
    points: 80,
    orders: 3,
    lastPurchase: "2023-03-15",
    orderCount: 3,
    totalSpent: 180.20,
    lastOrderDate: "2023-03-15"
  },
  {
    id: "3",
    name: "Luca Verdi",
    email: "luca.verdi@example.com",
    phone: "+39 333 9876543",
    points: 50,
    orders: 2,
    lastPurchase: "2023-02-20",
    orderCount: 2,
    totalSpent: 120.75,
    lastOrderDate: "2023-02-20"
  }
];

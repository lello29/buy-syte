
import { Customer } from "../types";

export const mockCustomers: Customer[] = [
  {
    id: "cust1",
    name: "Mario Rossi",
    email: "mario.rossi@example.com",
    orderCount: 5,
    totalSpent: 350.50,
    lastOrderDate: new Date("2023-03-15"),
  },
  {
    id: "cust2",
    name: "Giulia Bianchi",
    email: "giulia.bianchi@example.com",
    orderCount: 3,
    totalSpent: 220.75,
    lastOrderDate: new Date("2023-04-20"),
  },
  {
    id: "cust3",
    name: "Luca Verdi",
    email: "luca.verdi@example.com",
    orderCount: 8,
    totalSpent: 560.25,
    lastOrderDate: new Date("2023-05-10"),
  },
];

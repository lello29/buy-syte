
import { User } from "@/types";

// Dati mock per gli utenti
export const users: User[] = [
  {
    id: "admin-1",
    name: "Admin User",
    email: "service.online.italy@gmail.com",
    role: "admin",
    favorites: [],
    loyaltyPoints: 0,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "user-1",
    name: "Mario Rossi",
    email: "mario@example.com",
    role: "user",
    favorites: [],
    loyaltyPoints: 0,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "user-2", 
    name: "Giulia Bianchi",
    email: "giulia@example.com",
    role: "shop",
    favorites: [],
    loyaltyPoints: 0,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    fiscalCode: "BNCGLI80A01H501E",
    vatNumber: "12345678901"
  },
  {
    id: "user-3",
    name: "Luca Verdi",
    email: "luca@example.com",
    role: "collaborator",
    favorites: [],
    loyaltyPoints: 0,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

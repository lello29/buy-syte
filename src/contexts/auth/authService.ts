
import { User, UserRole } from "../../types";
import { users } from "../../data/mockData";
import { toast } from "sonner";
import { ShopData } from "./types";

/**
 * Handles user authentication
 */
export const authService = {
  /**
   * Simulates a login request
   */
  login: async (email: string, password: string): Promise<User | null> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (email === "cliente@test.com") {
      const testUser: User = {
        id: "test-user",
        name: "Cliente Test",
        email: "cliente@test.com",
        role: "user",
        favorites: ["shop1", "shop3"],
        loyaltyPoints: 150,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      toast.success("Login effettuato con successo!");
      return testUser;
    } 
    
    if (email === "negozio@test.com") {
      const testUser: User = {
        id: "test-shop",
        name: "Negozio Test",
        email: "negozio@test.com",
        role: "shop",
        favorites: [],
        loyaltyPoints: 0,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      toast.success("Login effettuato con successo!");
      return testUser;
    }
    
    if (email === "admin@test.com") {
      const testUser: User = {
        id: "test-admin",
        name: "Amministratore Test",
        email: "admin@test.com",
        role: "admin",
        favorites: [],
        loyaltyPoints: 0,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      toast.success("Login effettuato con successo!");
      return testUser;
    }
    
    if (email === "info@gelateriaartigianale.it") {
      const testUser: User = {
        id: "gelateria-user",
        name: "Gelateria Artigianale",
        email: "info@gelateriaartigianale.it",
        role: "shop",
        favorites: [],
        loyaltyPoints: 0,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      toast.success("Login effettuato con successo!");
      return testUser;
    }
    
    const user = users.find(u => u.email === email);
    if (user) {
      toast.success("Login effettuato con successo!");
      return user;
    }
    
    toast.error("Email o password non validi");
    return null;
  },

  /**
   * Simulates a registration request
   */
  register: async (name: string, email: string, password: string): Promise<User | null> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const userExists = users.some(u => u.email === email);
    if (userExists) {
      toast.error("Email già in uso");
      return null;
    }
    
    const newUser: User = {
      id: `u${users.length + 1}`,
      name,
      email,
      role: "user",
      favorites: [],
      loyaltyPoints: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    toast.success("Registrazione completata con successo!");
    return newUser;
  },

  /**
   * Updates user role
   */
  updateUserRole: (user: User, role: UserRole, shopData?: ShopData): User => {
    const updatedUser = { 
      ...user, 
      role,
      ...(shopData ? {
        fiscalCode: shopData.fiscalCode,
        vatNumber: shopData.vatNumber
      } : {})
    };
    
    if (role === "shop" && shopData) {
      toast.success(`Profilo convertito in ${role} con successo! Codice Fiscale e Partita IVA registrati.`);
    } else {
      toast.success(`Profilo convertito in ${role} con successo!`);
    }
    
    return updatedUser;
  }
};

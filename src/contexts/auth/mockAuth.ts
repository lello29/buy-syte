
import { User, UserRole } from "../../types";
import { toast } from "sonner";

/**
 * Handles mock login for demo purposes
 */
export const handleMockLogin = (email: string, password: string): User | null => {
  // Check password for test users (except for the special admin)
  if (email !== "service.online.italy@gmail.com" && password !== "12345") {
    if (!(email === "admin@test.com" && password === "admin")) {
      toast.error("Password non valida per l'utente di test");
      return null;
    }
  }
  
  // Special check for admin user
  if (email === "service.online.italy@gmail.com" && password !== "200812") {
    toast.error("Password non valida per l'amministratore");
    return null;
  }
  
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
  
  if (email === "service.online.italy@gmail.com") {
    const adminUser: User = {
      id: "real-admin",
      name: "Admin Service Online Italy",
      email: "service.online.italy@gmail.com",
      role: "admin",
      favorites: [],
      loyaltyPoints: 0,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    toast.success("Login amministratore effettuato con successo!");
    return adminUser;
  }
  
  return null;
};

/**
 * Helper function to check if an email is a test account
 */
export const isTestAccount = (email: string): boolean => {
  const testAccounts = [
    "cliente@test.com", 
    "negozio@test.com", 
    "admin@test.com", 
    "info@gelateriaartigianale.it",
    "service.online.italy@gmail.com"
  ];
  
  return testAccounts.includes(email);
};

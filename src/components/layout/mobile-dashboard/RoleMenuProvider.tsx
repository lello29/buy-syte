
import React from "react";
import { UserCircle, Heart, ShoppingBag, Award, Store, Package, CreditCard, 
  BellRing, Users, Briefcase, Calendar, BarChart3, Settings, FilePlus, User,
  UserCog, ShoppingCart, MapPin, Database } from "lucide-react";

// The hook to get menu options based on role
export const useRoleMenu = (role, isAdminDashboard = false) => {
  console.log("useRoleMenu called with role:", role, "isAdminDashboard:", isAdminDashboard);
  
  // Default user menu
  const dashboardOptions = [];
  const additionalOptions = [];
  let actionButton = {
    label: "",
    path: "",
    available: true
  };

  // Set options based on role
  if (role === "admin" && isAdminDashboard) {
    // Admin dashboard options when in admin area
    dashboardOptions.push(
      { label: "Dashboard", icon: BarChart3, path: "/dashboard/admin", available: true },
      { label: "Utenti", icon: Users, path: "/dashboard/admin/users", available: true },
      { label: "Negozi", icon: Store, path: "/dashboard/admin/shops", available: true },
      { label: "Prodotti", icon: Package, path: "/dashboard/admin/products", available: true }
    );
    
    additionalOptions.push(
      { label: "Collaboratori", path: "/dashboard/admin/collaborators", available: true },
      { label: "Impostazioni", path: "/dashboard/admin/settings", available: true }
    );
    
    actionButton = {
      label: "Aggiungi Prodotto",
      path: "/dashboard/admin/products/add",
      available: true
    };
  } else {
    // Normal role-based options
    switch (role) {
      case "user":
        dashboardOptions.push(
          { label: "Preferiti", icon: Heart, path: "/dashboard/favorites", available: true },
          { label: "I Miei Ordini", icon: ShoppingBag, path: "/dashboard/orders", available: true },
          { label: "Punti Fedeltà", icon: Award, path: "/dashboard/loyalty", available: true },
          { label: "Negozi Vicini", icon: MapPin, path: "/shops/nearest", available: true }
        );
        
        additionalOptions.push(
          { label: "Diventa Negozio", path: "/dashboard/convert-to-shop", available: true },
          { label: "Diventa Collaboratore", path: "/dashboard/convert-to-collaborator", available: true },
          { label: "Impostazioni", path: "/dashboard/settings", available: true }
        );
        
        actionButton = {
          label: "Esplora Offerte",
          path: "/offers",
          available: true
        };
        break;
      
      case "shop":
        dashboardOptions.push(
          { label: "Prodotti", icon: Package, path: "/dashboard/products", available: true },
          { label: "Ordini", icon: CreditCard, path: "/dashboard/shop-orders", available: true },
          { label: "Offerte", icon: ShoppingCart, path: "/dashboard/offers", available: true },
          { label: "Notifiche", icon: BellRing, path: "/dashboard/notifications", available: true }
        );
        
        additionalOptions.push(
          { label: "Clienti", path: "/dashboard/customers", available: true },
          { label: "Collaboratori", path: "/dashboard/collaborators", available: true },
          { label: "Impostazioni Negozio", path: "/dashboard/shop/settings", available: true }
        );
        
        actionButton = {
          label: "Aggiungi Prodotto",
          path: "/dashboard/products/add",
          available: true
        };
        break;
      
      case "collaborator":
        dashboardOptions.push(
          { label: "Incarichi", icon: Briefcase, path: "/dashboard/tasks", available: true },
          { label: "Disponibilità", icon: Calendar, path: "/dashboard/availability", available: true },
          { label: "Recensioni", icon: Award, path: "/dashboard/reviews", available: true },
          { label: "Pagamenti", icon: CreditCard, path: "/dashboard/payments", available: false }
        );
        
        additionalOptions.push(
          { label: "Documenti", path: "/dashboard/documents", available: false },
          { label: "Impostazioni", path: "/dashboard/settings", available: true }
        );
        
        actionButton = {
          label: "Cerca Incarichi",
          path: "/dashboard/find-tasks",
          available: false
        };
        break;
      
      case "admin": // Admin outside of admin area gets a special menu
        dashboardOptions.push(
          { label: "Dashboard Admin", icon: BarChart3, path: "/dashboard/admin", available: true },
          { label: "Utenti", icon: Users, path: "/dashboard/admin/users", available: true },
          { label: "Negozi", icon: Store, path: "/dashboard/admin/shops", available: true },
          { label: "Prodotti", icon: Package, path: "/dashboard/admin/products", available: true }
        );
        
        additionalOptions.push(
          { label: "Collaboratori", path: "/dashboard/admin/collaborators", available: true },
          { label: "Impostazioni", path: "/dashboard/admin/settings", available: true },
          { label: "Database", path: "/dashboard/admin/database", available: false }
        );
        
        actionButton = {
          label: "Dashboard Admin",
          path: "/dashboard/admin",
          available: true
        };
        break;
        
      default:
        dashboardOptions.push(
          { label: "Profilo", icon: UserCircle, path: "/dashboard", available: true },
          { label: "Impostazioni", icon: Settings, path: "/dashboard/settings", available: true }
        );
        
        actionButton = {
          label: "Esplora Negozi",
          path: "/shops",
          available: true
        };
    }
  }

  return { dashboardOptions, additionalOptions, actionButton };
};

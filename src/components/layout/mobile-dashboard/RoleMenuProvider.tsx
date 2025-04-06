
import React from "react";
import { UserCircle, Heart, ShoppingBag, Award, Store, Package, CreditCard, 
  BellRing, Users, Briefcase, Calendar, BarChart3, Settings, FilePlus, User,
  UserCog, ShoppingCart, MapPin } from "lucide-react";

// The hook to get menu options based on role
export const useRoleMenu = (role) => {
  // Default user menu
  let dashboardOptions = [];
  let additionalOptions = [];
  let actionButton = {
    label: "",
    path: "",
    available: true
  };

  // Set options based on role
  switch (role) {
    case "user":
      dashboardOptions = [
        { label: "Preferiti", icon: Heart, path: "/dashboard/favorites", available: true },
        { label: "I Miei Ordini", icon: ShoppingBag, path: "/dashboard/orders", available: true },
        { label: "Punti Fedeltà", icon: Award, path: "/dashboard/loyalty", available: true },
        { label: "Negozi Vicini", icon: MapPin, path: "/shops/nearest", available: true }
      ];
      
      additionalOptions = [
        { label: "Diventa Negozio", path: "/dashboard/convert-to-shop", available: true },
        { label: "Diventa Collaboratore", path: "/dashboard/convert-to-collaborator", available: true },
        { label: "Impostazioni", path: "/dashboard/settings", available: true }
      ];
      
      actionButton = {
        label: "Esplora Offerte",
        path: "/offers",
        available: true
      };
      break;
    
    case "shop":
      dashboardOptions = [
        { label: "Prodotti", icon: Package, path: "/dashboard/products", available: true },
        { label: "Ordini", icon: CreditCard, path: "/dashboard/shop-orders", available: true },
        { label: "Offerte", icon: ShoppingCart, path: "/dashboard/offers", available: true },
        { label: "Notifiche", icon: BellRing, path: "/dashboard/notifications", available: true }
      ];
      
      additionalOptions = [
        { label: "Clienti", path: "/dashboard/customers", available: true },
        { label: "Collaboratori", path: "/dashboard/collaborators", available: true },
        { label: "Impostazioni Negozio", path: "/dashboard/shop/settings", available: true }
      ];
      
      actionButton = {
        label: "Aggiungi Prodotto",
        path: "/dashboard/products/add",
        available: true
      };
      break;
    
    case "collaborator":
      dashboardOptions = [
        { label: "Incarichi", icon: Briefcase, path: "/dashboard/tasks", available: true },
        { label: "Disponibilità", icon: Calendar, path: "/dashboard/availability", available: true },
        { label: "Recensioni", icon: Award, path: "/dashboard/reviews", available: true },
        { label: "Impostazioni", icon: Settings, path: "/dashboard/settings", available: true }
      ];
      
      additionalOptions = [
        { label: "Documenti", path: "/dashboard/documents", available: false },
        { label: "Pagamenti", path: "/dashboard/payments", available: false }
      ];
      
      actionButton = {
        label: "Cerca Incarichi",
        path: "/dashboard/find-tasks",
        available: false
      };
      break;
    
    case "admin":
      dashboardOptions = [
        { label: "Utenti", icon: Users, path: "/dashboard/admin/users", available: true },
        { label: "Negozi", icon: Store, path: "/dashboard/admin/shops", available: true },
        { label: "Prodotti", icon: Package, path: "/dashboard/admin/products", available: true },
        { label: "Collaboratori", icon: Briefcase, path: "/dashboard/admin/collaborators", available: true }
      ];
      
      additionalOptions = [
        { label: "Statistiche", path: "/dashboard/admin", available: true },
        { label: "Impostazioni", path: "/dashboard/admin/settings", available: true }
      ];
      
      actionButton = {
        label: "Aggiungi Negozio",
        path: "/dashboard/admin/shops/add",
        available: false
      };
      break;
      
    default:
      // Default options if role not recognized
      dashboardOptions = [
        { label: "Profilo", icon: UserCircle, path: "/dashboard", available: true },
        { label: "Impostazioni", icon: Settings, path: "/dashboard/settings", available: true }
      ];
      
      actionButton = {
        label: "Esplora Negozi",
        path: "/shops",
        available: true
      };
  }

  return { dashboardOptions, additionalOptions, actionButton };
};

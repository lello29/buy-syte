
import React from "react";
import { 
  Store, Users, User, Package, Plus, BarChart3, Heart, 
  ShoppingBag, Award, Calendar, Bell, CreditCard, Briefcase 
} from "lucide-react";

interface MenuOption {
  label: string;
  icon: React.ReactNode;
  path: string;
  available: boolean;
}

interface ActionButton {
  label: string;
  path: string;
  available: boolean;
}

interface AdditionalOption {
  label: string;
  path: string;
  available: boolean;
}

interface RoleMenuItems {
  dashboardOptions: MenuOption[];
  additionalOptions: AdditionalOption[];
  actionButton: ActionButton;
}

export const useRoleMenu = (role: string): RoleMenuItems => {
  // Dashboard options based on role
  const getDashboardOptions = (): MenuOption[] => {
    switch (role) {
      case "admin":
        return [
          { 
            label: "Dashboard", 
            icon: <BarChart3 className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard/admin",
            available: true
          },
          { 
            label: "Utenti", 
            icon: <Users className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard/users",
            available: true
          },
          { 
            label: "Negozi", 
            icon: <Store className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard/admin-shops",
            available: true
          },
          { 
            label: "Collaboratori", 
            icon: <User className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard/admin-collaborators",
            available: true
          },
          { 
            label: "Prodotti", 
            icon: <Package className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard/admin-products",
            available: true
          }
        ];
      case "shop":
        return [
          { 
            label: "Dashboard", 
            icon: <Store className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard",
            available: true
          },
          { 
            label: "Prodotti", 
            icon: <Package className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard/products",
            available: true
          },
          { 
            label: "Ordini", 
            icon: <CreditCard className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard/shop-orders",
            available: true
          },
          { 
            label: "Offerte", 
            icon: <Calendar className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard/offers",
            available: false
          }
        ];
      case "collaborator":
        return [
          { 
            label: "Profilo", 
            icon: <User className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard",
            available: true
          },
          { 
            label: "Incarichi", 
            icon: <Briefcase className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard/tasks",
            available: false
          },
          { 
            label: "Disponibilità", 
            icon: <Calendar className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard/availability",
            available: false
          },
          { 
            label: "Recensioni", 
            icon: <Award className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard/reviews",
            available: false
          }
        ];
      case "user":
      default:
        return [
          { 
            label: "Profilo", 
            icon: <User className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard",
            available: true
          },
          { 
            label: "Preferiti", 
            icon: <Heart className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard/favorites",
            available: true
          },
          { 
            label: "Ordini", 
            icon: <ShoppingBag className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard/orders",
            available: true
          },
          { 
            label: "Punti Fedeltà", 
            icon: <Award className="h-16 w-16 text-[#0a3276]" />, 
            path: "/dashboard/loyalty",
            available: false
          }
        ];
    }
  };

  // Additional options based on role
  const getAdditionalOptions = (): AdditionalOption[] => {
    switch (role) {
      case "admin":
        return [
          { label: "Impostazioni", path: "/dashboard/admin/settings", available: true },
          { label: "Gestione Sistema", path: "/dashboard/admin/system", available: false }
        ];
      case "shop":
        return [
          { label: "Notifiche", path: "/dashboard/notifications", available: false },
          { label: "Collaboratori", path: "/dashboard/collaborators", available: false },
          { label: "Impostazioni", path: "/dashboard/shop-settings", available: true }
        ];
      case "collaborator":
        return [
          { label: "Notifiche", path: "/dashboard/notifications", available: false },
          { label: "Impostazioni", path: "/dashboard/settings", available: false }
        ];
      case "user":
      default:
        return [
          { label: "Diventa Negozio", path: "/dashboard/convert-shop", available: true },
          { label: "Diventa Collaboratore", path: "/dashboard/convert-collaborator", available: true },
          { label: "Impostazioni", path: "/dashboard/settings", available: false }
        ];
    }
  };

  // Main action button based on role
  const getActionButton = (): ActionButton => {
    switch (role) {
      case "admin":
        return {
          label: "Aggiungi negozio",
          path: "/dashboard/admin-shops/add",
          available: false
        };
      case "shop":
        return {
          label: "Aggiungi prodotto",
          path: "/dashboard/products/add",
          available: true
        };
      case "collaborator":
        return {
          label: "Aggiungi disponibilità",
          path: "/dashboard/availability/add",
          available: false
        };
      case "user":
      default:
        return {
          label: "Esplora negozi",
          path: "/shops",
          available: true
        };
    }
  };

  return {
    dashboardOptions: getDashboardOptions(),
    additionalOptions: getAdditionalOptions(),
    actionButton: getActionButton()
  };
};

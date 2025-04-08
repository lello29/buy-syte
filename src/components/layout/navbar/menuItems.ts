
import { User } from "@/types";
import { 
  User as UserIcon, Store, Users, Package, BarChart3, Heart, ShoppingCart, 
  Briefcase, Settings, BarChart
} from "lucide-react";

export interface MenuItem {
  icon: typeof UserIcon;
  label: string;
  path: string;
}

export const getMenuItems = (currentUser: User): MenuItem[] => {
  const role = currentUser.role;
  
  switch (role) {
    case "user":
      return [
        { icon: UserIcon, label: "Profilo", path: "/dashboard" },
        { icon: Heart, label: "Preferiti", path: "/dashboard/favorites" },
        { icon: ShoppingCart, label: "Ordini", path: "/dashboard/orders" },
        { icon: Store, label: "Diventa Negozio", path: "/dashboard/convert-to-shop" },
        { icon: Briefcase, label: "Diventa Collaboratore", path: "/dashboard/convert-to-collaborator" },
      ];
    case "shop":
      return [
        { icon: Store, label: "Negozio", path: "/dashboard" },
        { icon: Package, label: "Prodotti", path: "/dashboard/products" },
        { icon: ShoppingCart, label: "Ordini", path: "/dashboard/orders-management" },
        { icon: BarChart, label: "Statistiche", path: "/dashboard/analytics" },
        { icon: Users, label: "Clienti", path: "/dashboard/customers" },
        { icon: Settings, label: "Impostazioni", path: "/dashboard/shop-settings" },
      ];
    case "collaborator":
      return [
        { icon: UserIcon, label: "Profilo", path: "/dashboard" },
        { icon: Briefcase, label: "Incarichi", path: "/dashboard/tasks" },
        { icon: Users, label: "Disponibilità", path: "/dashboard/availability" },
        { icon: ShoppingCart, label: "Recensioni", path: "/dashboard/reviews" },
      ];
    case "admin":
      return [
        { icon: BarChart3, label: "Dashboard", path: "/dashboard/admin" },
        { icon: Users, label: "Utenti", path: "/dashboard/admin/users" },
        { icon: Store, label: "Negozi", path: "/dashboard/admin/shops" },
        { icon: Briefcase, label: "Collaboratori", path: "/dashboard/admin/collaborators" },
        { icon: Package, label: "Prodotti", path: "/dashboard/admin/products" },
        { icon: Settings, label: "Impostazioni", path: "/dashboard/admin/settings" },
      ];
    default:
      return [];
  }
};

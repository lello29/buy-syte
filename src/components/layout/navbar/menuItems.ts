
import { User } from "@/types";
import { 
  User as UserIcon, Store, Users, Package, BarChart3, Heart, ShoppingCart
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
      ];
    case "shop":
      return [
        { icon: Store, label: "Negozio", path: "/dashboard" },
        { icon: Package, label: "Prodotti", path: "/dashboard/products" },
        { icon: Users, label: "Clienti", path: "/dashboard/customers" },
      ];
    case "collaborator":
      return [
        { icon: UserIcon, label: "Profilo", path: "/dashboard" },
        { icon: Package, label: "Incarichi", path: "/dashboard/tasks" },
      ];
    case "admin":
      return [
        { icon: BarChart3, label: "Dashboard", path: "/dashboard/admin" },
        { icon: Users, label: "Utenti", path: "/dashboard/users" },
        { icon: Store, label: "Negozi", path: "/dashboard/admin-shops" },
      ];
    default:
      return [];
  }
};

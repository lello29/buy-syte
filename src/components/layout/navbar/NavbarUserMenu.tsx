
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { 
  User, Store, Users, Package, BarChart3, Heart, ShoppingCart
} from "lucide-react";

const NavbarUserMenu = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  
  if (!currentUser) return null;

  const getMenuItems = () => {
    const role = currentUser.role;
    
    switch (role) {
      case "user":
        return [
          { icon: User, label: "Profilo", path: "/dashboard" },
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
          { icon: User, label: "Profilo", path: "/dashboard" },
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

  const menuItems = getMenuItems();

  return (
    <div className="flex items-center space-x-2">
      {menuItems.map((item, index) => (
        <Link key={index} to={item.path}>
          <Button 
            variant="ghost" 
            size="sm"
            className={cn(
              "flex items-center",
              location.pathname === item.path && "bg-primary/10"
            )}
          >
            <item.icon className="h-4 w-4 mr-1" />
            {item.label}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default NavbarUserMenu;

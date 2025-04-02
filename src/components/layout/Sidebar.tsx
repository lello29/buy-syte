
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { 
  User, Store, Package, Heart, ShoppingBag, Award, 
  Settings, Users, BarChart3, UserCog, Briefcase,
  Calendar, Bell, CreditCard
} from "lucide-react";

interface SidebarProps {
  isMobile: boolean;
  setMobileMenuOpen?: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobile, setMobileMenuOpen }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) return null;

  const handleLinkClick = () => {
    if (isMobile && setMobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  const getSidebarLinks = () => {
    const role = currentUser.role;

    switch (role) {
      case "user":
        return [
          { icon: User, label: "Profilo", path: "/dashboard/profile" },
          { icon: Heart, label: "Preferiti", path: "/dashboard/favorites" },
          { icon: ShoppingBag, label: "Ordini", path: "/dashboard/orders" },
          { icon: Award, label: "Punti Fedeltà", path: "/dashboard/loyalty" },
          { icon: Store, label: "Diventa Negozio", path: "/dashboard/convert-shop" },
          { icon: Briefcase, label: "Diventa Collaboratore", path: "/dashboard/convert-collaborator" },
          { icon: Settings, label: "Impostazioni", path: "/dashboard/settings" }
        ];
      case "shop":
        return [
          { icon: Store, label: "Dashboard Negozio", path: "/dashboard/shop" },
          { icon: Package, label: "Gestione Prodotti", path: "/dashboard/products" },
          { icon: CreditCard, label: "Ordini Ricevuti", path: "/dashboard/shop-orders" },
          { icon: Calendar, label: "Offerte", path: "/dashboard/offers" },
          { icon: Bell, label: "Notifiche", path: "/dashboard/notifications" },
          { icon: Users, label: "Collaboratori", path: "/dashboard/collaborators" },
          { icon: Settings, label: "Impostazioni", path: "/dashboard/settings" }
        ];
      case "collaborator":
        return [
          { icon: User, label: "Profilo Collaboratore", path: "/dashboard/profile" },
          { icon: Briefcase, label: "Incarichi", path: "/dashboard/tasks" },
          { icon: Calendar, label: "Disponibilità", path: "/dashboard/availability" },
          { icon: Award, label: "Recensioni", path: "/dashboard/reviews" },
          { icon: Settings, label: "Impostazioni", path: "/dashboard/settings" }
        ];
      case "admin":
        return [
          { icon: BarChart3, label: "Dashboard Admin", path: "/dashboard/admin" },
          { icon: Users, label: "Utenti", path: "/dashboard/users" },
          { icon: Store, label: "Negozi", path: "/dashboard/shops" },
          { icon: Briefcase, label: "Collaboratori", path: "/dashboard/admin-collaborators" },
          { icon: Package, label: "Prodotti", path: "/dashboard/admin-products" },
          { icon: UserCog, label: "Impostazioni", path: "/dashboard/admin-settings" }
        ];
      default:
        return [];
    }
  };

  const links = getSidebarLinks();

  return (
    <aside className="bg-gray-50 h-full w-64 border-r">
      <div className="flex flex-col p-4">
        <div className="flex items-center justify-center mb-6 border-b pb-4">
          <Store className="h-6 w-6 text-primary mr-2" />
          <span className="text-xl font-semibold">{currentUser.name}</span>
        </div>
        <nav className="space-y-1">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={cn(
                "flex items-center px-4 py-2 text-sm rounded-md transition-colors",
                location.pathname === link.path
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-200"
              )}
              onClick={handleLinkClick}
            >
              <link.icon className="h-5 w-5 mr-2" />
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;

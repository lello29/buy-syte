
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Sidebar, 
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator
} from "@/components/ui/sidebar";
import {
  User, Store, Package, Heart, ShoppingBag, Award, 
  Settings, Users, BarChart3, Briefcase,
  Calendar, Bell, CreditCard, Home, LogOut
} from "lucide-react";
import { toast } from "sonner";

const DashboardSidebar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!currentUser) return null;

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      toast.success("Logout effettuato con successo");
    } catch (error) {
      console.error("Errore durante il logout:", error);
      toast.error("Errore durante il logout");
    }
  };

  const handleNotAvailable = (feature: string) => {
    toast.error(`La funzionalità "${feature}" non è ancora disponibile`);
  };

  const getSidebarLinks = () => {
    const role = currentUser.role;
    let links = [];

    switch (role) {
      case "user":
        links = [
          { icon: User, label: "Profilo", path: "/dashboard" },
          { icon: Heart, label: "Preferiti", path: "/dashboard/favorites" },
          { icon: ShoppingBag, label: "Ordini", path: "/dashboard/orders" },
          { icon: Award, label: "Punti Fedeltà", path: "/dashboard/loyalty" },
          { icon: Store, label: "Diventa Negozio", path: "/dashboard/convert-to-shop" },
          { icon: Briefcase, label: "Diventa Collaboratore", path: "/dashboard/convert-to-collaborator" },
        ];
        break;
      case "shop":
        links = [
          { icon: Store, label: "Dashboard Negozio", path: "/dashboard" },
          { icon: Package, label: "Gestione Prodotti", path: "/dashboard/products" },
          { icon: CreditCard, label: "Ordini Ricevuti", path: "/dashboard/orders-management" },
          { icon: Calendar, label: "Offerte", path: "/dashboard/offers", onClick: () => handleNotAvailable("Offerte") },
          { icon: Bell, label: "Notifiche", path: "/dashboard/notifications", onClick: () => handleNotAvailable("Notifiche") },
          { icon: Users, label: "Collaboratori", path: "/dashboard/collaborators", onClick: () => handleNotAvailable("Collaboratori") },
        ];
        break;
      case "collaborator":
        links = [
          { icon: User, label: "Profilo Collaboratore", path: "/dashboard" },
          { icon: Briefcase, label: "Incarichi", path: "/dashboard/tasks" },
          { icon: Calendar, label: "Disponibilità", path: "/dashboard/availability", onClick: () => handleNotAvailable("Disponibilità") },
          { icon: Award, label: "Recensioni", path: "/dashboard/reviews", onClick: () => handleNotAvailable("Recensioni") },
        ];
        break;
      case "admin":
        links = [
          { icon: BarChart3, label: "Dashboard Admin", path: "/dashboard/admin" },
          { icon: Users, label: "Utenti", path: "/dashboard/admin/users" },
          { icon: Store, label: "Negozi", path: "/dashboard/admin/shops" },
          { icon: Package, label: "Prodotti", path: "/dashboard/admin/products" },
          { icon: Briefcase, label: "Collaboratori", path: "/dashboard/admin/collaborators" },
          { icon: Settings, label: "Impostazioni", path: "/dashboard/admin/settings" },
        ];
        break;
      default:
        links = [];
    }

    return links;
  };

  const links = getSidebarLinks();
  const isActive = (path) => location.pathname === path;

  return (
    <Sidebar side="left" variant={useIsMobile() ? "floating" : "sidebar"} className="z-20">
      <SidebarHeader className="border-b">
        <div className="p-4 text-center">
          <div className="h-6 flex items-center justify-center">
            <span className="font-semibold text-primary">{currentUser.name || currentUser.email}</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {links.map((link, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton 
                asChild 
                isActive={isActive(link.path)}
                tooltip={link.label}
                className="hover:text-primary transition-colors"
                onClick={link.onClick}
              >
                {link.onClick ? (
                  <button className="flex items-center gap-2 w-full">
                    <link.icon className="h-5 w-5" />
                    <span className="truncate">{link.label}</span>
                  </button>
                ) : (
                  <Link to={link.path} className="flex items-center gap-2">
                    <link.icon className="h-5 w-5" />
                    <span className="truncate">{link.label}</span>
                  </Link>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarSeparator />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={location.pathname.includes("/admin/settings") || location.pathname === "/dashboard/settings"}
              tooltip="Impostazioni"
              className="font-semibold hover:text-primary transition-colors"
            >
              <Link to={currentUser.role === "admin" ? "/dashboard/admin/settings" : "/dashboard/settings"}>
                <Settings className="h-5 w-5 mr-2" />
                <span>Impostazioni</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Home"
              className="font-semibold hover:text-primary transition-colors"
            >
              <Link to="/">
                <Home className="h-5 w-5 mr-2" />
                <span>Torna alla Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Logout"
              className="font-semibold hover:text-destructive transition-colors"
            >
              <button onClick={handleLogout} className="flex items-center w-full">
                <LogOut className="h-5 w-5 mr-2" />
                <span>Logout</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t">
        <div className="p-4">
          <div className="flex items-center">
            <User className="h-5 w-5 text-primary mr-2" />
            <span className="truncate text-sm font-medium">{currentUser.role.toUpperCase()}</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;

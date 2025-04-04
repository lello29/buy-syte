
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
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
  Settings, Users, BarChart3, UserCog, Briefcase,
  Calendar, Bell, CreditCard, LogOut, Home
} from "lucide-react";

const DashboardSidebar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!currentUser) return null;

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
          { icon: Store, label: "Diventa Negozio", path: "/dashboard/convert-shop" },
          { icon: Briefcase, label: "Diventa Collaboratore", path: "/dashboard/convert-collaborator" },
        ];
        break;
      case "shop":
        links = [
          { icon: Store, label: "Dashboard Negozio", path: "/dashboard" },
          { icon: Package, label: "Gestione Prodotti", path: "/dashboard/products" },
          { icon: CreditCard, label: "Ordini Ricevuti", path: "/dashboard/shop-orders" },
          { icon: Calendar, label: "Offerte", path: "/dashboard/offers" },
          { icon: Bell, label: "Notifiche", path: "/dashboard/notifications" },
          { icon: Users, label: "Collaboratori", path: "/dashboard/collaborators" },
        ];
        break;
      case "collaborator":
        links = [
          { icon: User, label: "Profilo Collaboratore", path: "/dashboard" },
          { icon: Briefcase, label: "Incarichi", path: "/dashboard/tasks" },
          { icon: Calendar, label: "Disponibilità", path: "/dashboard/availability" },
          { icon: Award, label: "Recensioni", path: "/dashboard/reviews" },
        ];
        break;
      case "admin":
        links = [
          { icon: BarChart3, label: "Dashboard Admin", path: "/dashboard/admin" },
          { icon: Users, label: "Utenti", path: "/dashboard/users" },
          { icon: Store, label: "Negozi", path: "/dashboard/admin-shops" },
          { icon: Briefcase, label: "Collaboratori", path: "/dashboard/admin-collaborators" },
          { icon: Package, label: "Prodotti", path: "/dashboard/admin-products" },
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
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center p-4">
          <Store className="h-6 w-6 text-primary mr-2" />
          <span className="text-xl font-semibold">{currentUser.name}</span>
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
              >
                <Link to={link.path} className="flex items-center">
                  <link.icon className="h-5 w-5 mr-2" />
                  <span>{link.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarSeparator />
        <SidebarMenu>
          {/* Impostazioni (posizionata sopra alle Home/Logout) */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={location.pathname.includes("/settings")}
              tooltip="Impostazioni"
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
            >
              <Link to="/">
                <Home className="h-5 w-5 mr-2" />
                <span>Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <SidebarMenuButton
          onClick={handleLogout}
          tooltip="Logout"
        >
          <LogOut className="h-5 w-5 mr-2" />
          <span>Logout</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;


import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { 
  User, Store, Users, Package, BarChart3, Heart, LogOut, LogIn, UserPlus, ShoppingCart
} from "lucide-react";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-50 top-0">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center text-primary font-bold text-2xl">
            <Store className="h-6 w-6 mr-2" />
            ShopHubConnect
          </Link>

          <div className="hidden md:flex space-x-4">
            <Link to="/" className="text-gray-600 hover:text-primary">Home</Link>
            <Link to="/shops" className="text-gray-600 hover:text-primary">Negozi</Link>
            <Link to="/offers" className="text-gray-600 hover:text-primary">Offerte</Link>
          </div>

          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <NavbarUserMenu />
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Registrati
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavbarUserMenu = () => {
  const { currentUser } = useAuth();
  
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
              window.location.pathname === item.path && "bg-primary/10"
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

export default Navbar;

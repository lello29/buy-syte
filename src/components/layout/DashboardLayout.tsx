
import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/auth/AuthContext";
import { 
  SidebarProvider, 
  SidebarInset,
  SidebarTrigger
} from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar";
import { Menu, Home, LogOut, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { currentUser, logout, isLoading } = useAuth();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();

  // Log mounting of the component
  useEffect(() => {
    console.log("DashboardLayout mounted", { 
      isMobile, 
      path: location.pathname,
      isLoading,
      hasUser: !!currentUser
    });
  }, [isMobile, location.pathname, isLoading, currentUser]);
  
  // Handle loading states for auth and mobile detection
  if (isLoading || isMobile === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span className="text-lg">Caricamento...</span>
      </div>
    );
  }

  // Check if user is authenticated
  if (!currentUser) {
    toast.error("Effettua il login per accedere alla dashboard");
    navigate("/login", { replace: true });
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logout effettuato con successo");
      navigate("/login");
    } catch (error) {
      console.error("Errore durante il logout:", error);
      toast.error("Si è verificato un errore durante il logout");
    }
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleBackClick = () => {
    if (location.pathname.includes("/admin/")) {
      navigate("/dashboard/admin");
    } else {
      navigate("/dashboard");
    }
  };

  const getPageTitle = () => {
    if (location.pathname === "/dashboard") return "Dashboard";
    if (location.pathname === "/dashboard/admin") return "Admin Dashboard";
    if (location.pathname.includes("/admin/users")) return "Utenti";
    if (location.pathname.includes("/admin/shops")) return "Negozi";
    if (location.pathname.includes("/admin/products")) return "Prodotti";
    if (location.pathname.includes("/admin/products/add")) return "Aggiungi Prodotto";
    if (location.pathname.includes("/admin/collaborators")) return "Collaboratori";
    if (location.pathname.includes("/admin/settings")) return "Impostazioni";
    if (location.pathname.includes("/products")) return "Prodotti";
    if (location.pathname.includes("/orders")) return "Ordini";
    if (location.pathname.includes("/favorites")) return "Preferiti";
    if (location.pathname.includes("/loyalty")) return "Punti Fedeltà";
    if (location.pathname.includes("/tasks")) return "Incarichi";
    if (location.pathname.includes("/convert-to-shop")) return "Diventa Negozio";
    if (location.pathname.includes("/convert-to-collaborator")) return "Diventa Collaboratore";
    return "Dashboard";
  };

  // Rendering for mobile devices - using consistent styling for all user types
  if (isMobile === true) {
    const isSubPage = location.pathname !== "/dashboard" && 
                      location.pathname !== "/dashboard/admin" && 
                      location.pathname.startsWith("/dashboard");
                      
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        {/* Header blu with consistent styling */}
        <header className="bg-[#0a3276] text-white p-4 fixed top-0 left-0 right-0 z-50 shadow-md">
          <div className="flex items-center justify-between">
            {isSubPage ? (
              <button 
                onClick={handleBackClick}
                className="p-1 rounded-full hover:bg-blue-700 active:bg-blue-800 transition-colors"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
            ) : (
              <button 
                onClick={() => {}}
                className="p-1 rounded-full hover:bg-blue-700 active:bg-blue-800 transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
            )}
            <h1 className="text-2xl font-bold">{getPageTitle()}</h1>
            <div className="flex items-center gap-4">
              <button 
                onClick={handleHomeClick} 
                className="flex items-center justify-center h-9 w-9 rounded-full hover:bg-blue-700 active:bg-blue-800 transition-colors"
              >
                <Home className="h-5 w-5" />
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center justify-center h-9 w-9 rounded-full hover:bg-blue-700 active:bg-blue-800 transition-colors"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>
        
        {/* Content area with padding for the fixed header */}
        <main className="flex-1 pt-20 pb-6 px-4">
          {children}
        </main>
      </div>
    );
  }

  // Layout desktop
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <SidebarProvider defaultOpen={!isMobile}>
        <div className="flex flex-1 w-full pt-16">
          <DashboardSidebar />
          <SidebarInset className="px-4 py-6 md:px-6 w-full">
            <div className="container mx-auto">
              <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <SidebarTrigger />
                  <h1 className="text-xl font-semibold ml-2">
                    Benvenuto, <span className="text-primary">{currentUser.name}</span>!
                  </h1>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={handleHomeClick}>
                    <Home className="h-4 w-4 mr-1" /> Home
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-1" /> Logout
                  </Button>
                </div>
              </div>
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                {children}
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;


import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { 
  SidebarProvider, 
  SidebarInset,
  SidebarTrigger
} from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar";
import MobileDashboard from "./MobileDashboard";
import { Menu, Home, LogOut, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardLayout = () => {
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
  
  // Check if this is exactly the main dashboard path without any sub-routes
  const shouldShowMobileDashboard = isMobile && 
    (location.pathname === "/dashboard" || 
     location.pathname === "/dashboard/admin");
  
  const isSubPage = location.pathname !== "/dashboard" && location.pathname.startsWith("/dashboard");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span className="text-lg">Caricamento...</span>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Errore durante il logout:", error);
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
    return "Dashboard";
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg mb-4">Accesso negato</p>
          <p>Effettua il login per accedere alla dashboard</p>
          <Button onClick={() => navigate("/login")} className="mt-4">Vai al Login</Button>
        </div>
      </div>
    );
  }

  // Rendering for mobile devices
  if (isMobile) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        {/* Header blu */}
        <header className="bg-[#0a3276] text-white p-4 fixed top-0 left-0 right-0 z-50">
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
        
        {/* Ensure content is rendered statically, not conditionally */}
        <main className="flex-1 pt-20 pb-6 px-4">
          {shouldShowMobileDashboard ? (
            <MobileDashboard key="mobile-dashboard" />
          ) : (
            <div key="outlet-container">
              <Outlet />
            </div>
          )}
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
                <Outlet />
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;

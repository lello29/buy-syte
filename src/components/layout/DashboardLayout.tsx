
import React from "react";
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
import { Menu, Home, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardLayout = () => {
  const { currentUser, logout } = useAuth();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();

  // Controllo se visualizzare la dashboard mobile
  const shouldShowMobileDashboard = isMobile && location.pathname === "/dashboard";

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg mb-4">Accesso negato</p>
          <p>Effettua il login per accedere alla dashboard</p>
        </div>
      </div>
    );
  }

  // Rendering per dispositivi mobili sulla rotta principale
  if (shouldShowMobileDashboard) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        {/* Header blu */}
        <header className="bg-[#0a3276] text-white p-4 fixed top-0 left-0 right-0 z-50">
          <div className="flex items-center justify-between">
            <button className="p-1 rounded-full hover:bg-blue-700 active:bg-blue-800 transition-colors">
              <Menu className="h-8 w-8" />
            </button>
            <h1 className="text-2xl font-bold">Dashboard</h1>
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
        
        {/* Contenuto principale con padding-top per evitare sovrapposizione con l'header */}
        <main className="flex-1 pt-20 pb-6 px-4">
          <MobileDashboard />
        </main>
      </div>
    );
  }

  // Layout desktop o per percorsi diversi dalla dashboard principale in mobile
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
                {isMobile && (
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={handleHomeClick}>
                      <Home className="h-4 w-4 mr-1" /> Home
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-1" /> Logout
                    </Button>
                  </div>
                )}
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

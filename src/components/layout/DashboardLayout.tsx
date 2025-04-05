
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { 
  SidebarProvider, 
  SidebarInset,
  SidebarTrigger
} from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayout = () => {
  const { currentUser } = useAuth();
  const isMobile = useIsMobile();

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

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar simplified={true} />
      
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
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
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

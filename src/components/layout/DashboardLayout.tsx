
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Settings, Home, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarTrigger, 
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
  SidebarHeader
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <SidebarProvider defaultOpen={!isMobile}>
        <div className="flex flex-1 w-full pt-16">
          <DashboardSidebar />
          <SidebarInset className="px-4 py-6 md:px-6">
            <div className="container mx-auto">
              <div className="flex items-center mb-6">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold ml-2">Dashboard</h1>
              </div>
              <Outlet />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;

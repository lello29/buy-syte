
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const DashboardLayout = () => {
  const { currentUser } = useAuth();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      
      <div className="flex flex-1 pt-16">
        {/* Mobile menu toggle */}
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="fixed bottom-4 right-4 z-50 shadow-lg bg-primary text-white rounded-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        )}

        {/* Sidebar - always visible on desktop, conditionally on mobile */}
        {(!isMobile || (isMobile && mobileMenuOpen)) && (
          <div 
            className={`${
              isMobile 
                ? "fixed inset-0 z-40 w-64 transform transition-transform duration-300 ease-in-out" 
                : "w-64"
            }`}
          >
            <Sidebar isMobile={isMobile} setMobileMenuOpen={setMobileMenuOpen} />
          </div>
        )}

        {/* Main content area */}
        <div className={`flex-1 p-6 ${!isMobile && "ml-64"}`}>
          <div className="container mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

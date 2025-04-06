
import React, { useEffect } from "react";
import AdminDashboard from "@/components/dashboard/admin/AdminDashboard";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileDashboard from "@/components/layout/MobileDashboard";

const AdminDashboardPage = () => {
  const { currentUser, isLoading } = useAuth();
  const isMobile = useIsMobile();

  useEffect(() => {
    console.log("AdminDashboardPage mounted", { 
      isMobile, 
      isLoading, 
      userRole: currentUser?.role 
    });
  }, [isMobile, isLoading, currentUser]);
  
  if (isLoading || isMobile === null) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span className="text-lg">Caricamento...</span>
      </div>
    );
  }

  if (!currentUser || currentUser.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  // Per dispositivi mobili, usa il layout mobile unificato
  if (isMobile) {
    return <MobileDashboard />;
  }

  // Per desktop, mostra il layout admin normale
  return <AdminDashboard />;
};

export default AdminDashboardPage;


import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import UserDashboard from "@/components/dashboard/user/UserDashboard";
import ShopDashboard from "@/components/dashboard/shop/ShopDashboard";
import CollaboratorDashboard from "@/components/dashboard/collaborator/CollaboratorDashboard";
import { Navigate, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileDashboard from "@/components/layout/MobileDashboard";

const DashboardIndex = () => {
  const { currentUser, isLoading } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Use a useEffect to log component state
  useEffect(() => {
    console.log("DashboardIndex state:", { 
      isMobile, 
      isLoading, 
      hasUser: !!currentUser,
      userRole: currentUser?.role 
    });
  }, [isLoading, currentUser, isMobile]);
  
  // Show loading state while authentication or mobile detection is in progress
  if (isLoading || isMobile === null) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span className="text-lg">Caricamento...</span>
      </div>
    );
  }
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // Redirect admin users to the admin dashboard
  if (currentUser.role === "admin") {
    return <Navigate to="/dashboard/admin" replace />;
  }

  // For all mobile devices, render the consistent MobileDashboard component
  if (isMobile) {
    return <MobileDashboard />;
  }

  // For desktop, render role-specific components
  const renderDashboardByRole = () => {
    const role = currentUser.role;
    
    switch (role) {
      case "user":
        return <UserDashboard userId={currentUser.id} />;
      case "shop":
        return <ShopDashboard userId={currentUser.id} />;
      case "collaborator":
        return <CollaboratorDashboard userId={currentUser.id} />;
      default:
        return <div>Ruolo non riconosciuto</div>;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-gray-600">
        Benvenuto, {currentUser.name}! Questa è la tua dashboard personale.
      </p>
      
      {renderDashboardByRole()}
    </div>
  );
};

export default DashboardIndex;

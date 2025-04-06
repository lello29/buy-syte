
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import UserDashboard from "@/components/dashboard/user/UserDashboard";
import ShopDashboard from "@/components/dashboard/shop/ShopDashboard";
import CollaboratorDashboard from "@/components/dashboard/collaborator/CollaboratorDashboard";
import AdminDashboard from "@/components/dashboard/admin/AdminDashboard";
import { Navigate } from "react-router-dom";

const DashboardIndex = () => {
  const { currentUser, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Caricamento...</div>;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  const renderDashboardByRole = () => {
    const role = currentUser.role;
    
    switch (role) {
      case "user":
        return <UserDashboard userId={currentUser.id} />;
      case "shop":
        return <ShopDashboard userId={currentUser.id} />;
      case "collaborator":
        return <CollaboratorDashboard userId={currentUser.id} />;
      case "admin":
        return <AdminDashboard />;
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

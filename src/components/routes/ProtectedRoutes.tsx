
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Componente di caricamento comune
const LoadingScreen = ({ fullHeight = true }) => {
  const heightClass = fullHeight ? "min-h-screen" : "min-h-[50vh]";
  
  return (
    <div className={`flex items-center justify-center ${heightClass}`}>
      <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
      <span>Caricamento...</span>
    </div>
  );
};

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser, isLoading } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Wrapper ulteriore per dispositivi mobili per garantire il rendering corretto
  if (isMobile) {
    return <div className="mobile-protected-wrapper">{children}</div>;
  }
  
  return children;
};

export const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser, isLoading } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  if (!currentUser || currentUser.role !== "admin") {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }
  
  // Wrapper ulteriore per dispositivi mobili per garantire il rendering corretto
  if (isMobile) {
    return <div className="mobile-admin-wrapper">{children}</div>;
  }
  
  return children;
};

export const ShopRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser, isLoading } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  if (!currentUser || currentUser.role !== "shop") {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }
  
  // Wrapper ulteriore per dispositivi mobili per garantire il rendering corretto
  if (isMobile) {
    return <div className="mobile-shop-wrapper">{children}</div>;
  }
  
  return children;
};

export const CollaboratorRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser, isLoading } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  if (!currentUser || currentUser.role !== "collaborator") {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }
  
  // Wrapper ulteriore per dispositivi mobili per garantire il rendering corretto
  if (isMobile) {
    return <div className="mobile-collaborator-wrapper">{children}</div>;
  }
  
  return children;
};

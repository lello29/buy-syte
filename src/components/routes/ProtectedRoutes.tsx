
import React, { useEffect } from "react";
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
  
  useEffect(() => {
    console.log("ProtectedRoute rendered", { 
      path: location.pathname,
      isLoading, 
      hasUser: !!currentUser,
      isMobile 
    });
  }, [location.pathname, isLoading, currentUser, isMobile]);
  
  // Show loading while authentication or mobile detection is in progress
  if (isLoading || isMobile === null) {
    return <LoadingScreen />;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Return children directly
  return children;
};

export const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser, isLoading } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    console.log("AdminRoute rendered", { 
      path: location.pathname,
      isLoading, 
      hasUser: !!currentUser,
      role: currentUser?.role,
      isMobile 
    });
  }, [location.pathname, isLoading, currentUser, isMobile]);
  
  // Show loading while authentication or mobile detection is in progress
  if (isLoading || isMobile === null) {
    return <LoadingScreen />;
  }
  
  if (!currentUser || currentUser.role !== "admin") {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }
  
  // Return children directly
  return children;
};

export const ShopRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser, isLoading } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Show loading while authentication or mobile detection is in progress
  if (isLoading || isMobile === null) {
    return <LoadingScreen />;
  }
  
  if (!currentUser || currentUser.role !== "shop") {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }
  
  // Return children directly
  return children;
};

export const CollaboratorRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser, isLoading } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Show loading while authentication or mobile detection is in progress
  if (isLoading || isMobile === null) {
    return <LoadingScreen />;
  }
  
  if (!currentUser || currentUser.role !== "collaborator") {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }
  
  // Return children directly
  return children;
};

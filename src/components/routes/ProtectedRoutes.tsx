
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Caricamento...</div>;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

export const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Caricamento...</div>;
  }
  
  if (!currentUser || currentUser.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
};

export const ShopRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Caricamento...</div>;
  }
  
  if (!currentUser || currentUser.role !== "shop") {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
};

export const CollaboratorRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Caricamento...</div>;
  }
  
  if (!currentUser || currentUser.role !== "collaborator") {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
};

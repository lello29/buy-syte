
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { UserRole } from "@/types";

interface RoleRouteProps {
  allowedRoles: UserRole[];
  children: JSX.Element;
}

const RoleRoute: React.FC<RoleRouteProps> = ({ allowedRoles, children }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user role is in allowed roles list
  if (!allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RoleRoute;

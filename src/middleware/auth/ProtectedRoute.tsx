import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { UserRole } from "../../types/roles";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole | UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <div>Please log in to access this page</div>;
  }

  if (requiredRole) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!roles.includes(user.role)) {
      return <div>Access denied. Insufficient permissions.</div>;
    }
  }

  return <>{children}</>;
};

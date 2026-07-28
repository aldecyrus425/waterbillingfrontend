import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import { UserRole } from "../../types/roles";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole | UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!roles.includes(user.role)) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
            <h1 className="text-3xl font-semibold text-gray-900 mb-4">Access Denied</h1>
            <p className="text-gray-600">You do not have permission to view this page.</p>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
};

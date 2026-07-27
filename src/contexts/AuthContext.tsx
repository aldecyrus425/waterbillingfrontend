import React, { createContext, useContext, useState } from "react";
import { User, AuthContextType } from "../types/auth";
import { UserRole } from "../types/roles";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    // Implement permission checking logic
    return true;
  };

  const login = async (email: string, password: string) => {
    // Implement login logic
  };

  const logout = async () => {
    // Implement logout logic
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

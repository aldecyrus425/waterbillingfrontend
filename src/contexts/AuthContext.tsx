import React, { useState } from "react";
import type { User } from "../types/auth";
import { UserRole } from "../types/roles";
import { AuthContext } from "./AuthContextRef";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    if (user.role === UserRole.ADMIN) return true;
    if (user.role === UserRole.READER) {
      return ["read_meters", "submit_readings"].includes(permission);
    }
    return false;
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const demoUsers: Record<string, Omit<User, "createdAt" | "updatedAt"> & { password: string }> = {
        "admin@waterbilling.com": {
          id: "admin-1",
          name: "Admin User",
          email: "admin@waterbilling.com",
          role: UserRole.ADMIN,
          password: "admin123",
        },
        "reader@waterbilling.com": {
          id: "reader-1",
          name: "Meter Reader",
          email: "reader@waterbilling.com",
          role: UserRole.READER,
          password: "reader123",
        },
      };

      const foundUser = demoUsers[email.toLowerCase().trim()];
      if (!foundUser || foundUser.password !== password) {
        throw new Error("Invalid email or password");
      }

      setUser({
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setUser(null);
    setLoading(false);
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


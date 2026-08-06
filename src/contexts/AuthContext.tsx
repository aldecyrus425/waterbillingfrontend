import React, { useState, useEffect } from "react";
import type { User } from "../types/auth";
import { UserRole } from "../types/roles";
import { AuthContext } from "./AuthContextRef";
import { loginRequest } from "../api/authApi";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem("authUser");
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return {
        ...parsed,
        createdAt: parsed.createdAt ? new Date(parsed.createdAt) : new Date(),
        updatedAt: parsed.updatedAt ? new Date(parsed.updatedAt) : new Date(),
      } as User;
    } catch (err) {
      return null;
    }
  });
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
      const response = await loginRequest({
        email,
        password,
      });

      if (!response.status) {
        throw new Error(response.messsage);
      }

      localStorage.setItem("accessToken", response.accessToken);

      localStorage.setItem("refreshToken", response.refreshToken);

      const newUser = {
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        role: response.user.role as UserRole,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as User;

      setUser(newUser);
      
      try {
        localStorage.setItem("authUser", JSON.stringify({
          ...newUser,
          createdAt: newUser.createdAt.toISOString(),
          updatedAt: newUser.updatedAt.toISOString(),
        }));
      } catch (err) {
        // ignore storage errors
      }

      return newUser;

    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    setUser(null);
    try {
      localStorage.removeItem("authUser");
    } catch (err) {
      // ignore
    }
    setLoading(false);
  };

  // keep localStorage in sync if user state changes (covers setUser from other places)
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem("authUser", JSON.stringify({
          ...user,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString(),
        }));
      } else {
        localStorage.removeItem("authUser");
      }
    } catch (err) {
      // ignore storage errors
    }
  }, [user]);

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


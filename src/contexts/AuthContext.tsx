import React, { useState, useEffect } from "react";
import type { User } from "../types/auth";
import { UserRole } from "../types/roles";
import { AuthContext } from "./AuthContextRef";

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
        "cashier@waterbilling.com": {
          id: "cashier-1",
          name: "Frontline Cashier",
          email: "cashier@waterbilling.com",
          role: UserRole.CASHIER,
          password: "cashier123",
        },
        "consumer@waterbilling.com": {
          id: "consumer-1",
          name: "Sample Consumer",
          email: "consumer@waterbilling.com",
          role: UserRole.CONSUMER,
          password: "consumer123",
        },
      };

      const foundUser = demoUsers[email.toLowerCase().trim()];
      if (!foundUser || foundUser.password !== password) {
        throw new Error("Invalid email or password");
      }

      const newUser = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as User;
      setUser(newUser);
      // persist to localStorage so reloads keep the session
      try {
        localStorage.setItem("authUser", JSON.stringify({
          ...newUser,
          createdAt: newUser.createdAt.toISOString(),
          updatedAt: newUser.updatedAt.toISOString(),
        }));
      } catch (err) {
        // ignore storage errors
      }
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


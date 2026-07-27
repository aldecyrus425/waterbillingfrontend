import React, { useState } from "react";
import LoginForm from "../components/forms/LoginForm";

const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      // Backend will return user data with role
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock validation - replace with actual API call
      if (email === "demo@waterbilling.com" && password === "password123") {
        console.log("Login successful:", { email });
        // Backend will return user role and redirect accordingly
        // Example: navigate to `/admin/dashboard` or `/consumer/dashboard` based on returned role
        alert(`Login successful! Backend will return your role.`);
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (err) {
      setError("Login failed. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-20 -z-10" />

      {/* Main container */}
      <div className="w-full max-w-md">
        <LoginForm
          onSubmit={handleLogin}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
};

export default LoginPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import LoginForm from "../components/forms/LoginForm";

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError("");

    try {
      await login(email, password);
      if (email.toLowerCase().trim() === "reader@waterbilling.com") {
        navigate("/reader/dashboard");
      } else if (email.toLowerCase().trim() === "admin@waterbilling.com") {
        navigate("/admin/dashboard");
      } else {
        navigate("/reader/dashboard");
      }
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-20 -z-10" />

      <div className="w-full max-w-md">
        <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />
      </div>
    </div>
  );
};

export default LoginPage;

import React, { useState } from "react";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  isLoading?: boolean;
  error?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading = false,
  error,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(email, password);
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="flex items-center justify-center mb-4">
          <span className="text-6xl">💧</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Water Billing
        </h1>
        <p className="text-gray-600 text-lg">Welcome Back</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 animate-shake">
          <span className="text-red-600 text-xl">⚠️</span>
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Input */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Email Address
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (formErrors.email) setFormErrors({ ...formErrors, email: "" });
              }}
              placeholder="you@example.com"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all pl-11 ${
                formErrors.email
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300 bg-white hover:border-gray-400"
              }`}
              disabled={isLoading}
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
              📧
            </span>
          </div>
          {formErrors.email && (
            <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
              <span>✗</span> {formErrors.email}
            </p>
          )}
        </div>

        {/* Password Input */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <a
              href="#"
              className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Forgot?
            </a>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (formErrors.password)
                  setFormErrors({ ...formErrors, password: "" });
              }}
              placeholder="••••••••"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all pl-11 pr-12 ${
                formErrors.password
                  ? "border-red-300 bg-red-50"
                  : "border-gray-300 bg-white hover:border-gray-400"
              }`}
              disabled={isLoading}
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
              🔐
            </span>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900 transition-colors text-lg disabled:opacity-50"
              disabled={isLoading}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {formErrors.password && (
            <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
              <span>✗</span> {formErrors.password}
            </p>
          )}
        </div>

        {/* Remember Me */}
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            disabled={isLoading}
          />
          <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
            Remember me for 30 days
          </span>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:shadow-none"
        >
          {isLoading ? (
            <>
              <span className="inline-block animate-spin text-lg">⏳</span>
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <span>🔓</span>
              <span>Sign In</span>
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-300" />
        <span className="text-xs text-gray-500 font-medium">OR</span>
        <div className="flex-1 h-px bg-gray-300" />
      </div>

      {/* Support Section */}
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Having trouble signing in?{" "}
          <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
            Get help
          </a>
        </p>
      </div>

      {/* Info Box */}
      <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
        <p className="text-xs font-semibold text-blue-900 mb-3 flex items-center gap-2">
          <span>ℹ️</span> Demo Account
        </p>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-blue-800">Email:</span>
            <code className="text-xs bg-blue-100 px-2 py-1 rounded text-blue-900 font-mono">
              demo@waterbilling.com
            </code>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-blue-800">Password:</span>
            <code className="text-xs bg-blue-100 px-2 py-1 rounded text-blue-900 font-mono">
              password123
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;


import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./features/admin/pages/AdminDashboard";
import UserManagement from "./features/admin/pages/UserManagement";
import BillingManagement from "./features/admin/pages/BillingManagement";
import PaymentsPage from "./features/admin/pages/Payments";
import ReportsPage from "./features/admin/pages/ReportsPage";
import ReaderDashboard from "./features/reader/pages/ReaderDashboard";
import ReaderReading from "./features/reader/pages/ReaderReading";
import ReaderProfile from "./features/reader/pages/ReaderProfile";
import CashierDashboard from "./features/cashier/pages/CashierDashboard";
import Cashiering from "./features/cashier/pages/Cashiering";
import ConsumerDashboard from "./features/consumer/pages/ConsumerDashboard";
import OnlinePayments from "./features/cashier/pages/OnlinePayments";
import Consumers from "./features/cashier/pages/Consumers";
import ConsumerHistory from "./features/consumer/pages/ConsumerHistory";
import ConsumerPending from "./features/consumer/pages/ConsumerPending";
import PaymentForm from "./features/consumer/pages/PaymentForm";
import { ProtectedRoute } from "./middleware/auth/ProtectedRoute";
import { UserRole } from "./types/roles";
  
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login route - default */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Admin routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRole={UserRole.ADMIN}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute requiredRole={UserRole.ADMIN}>
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/billing"
          element={
            <ProtectedRoute requiredRole={UserRole.ADMIN}>
              <BillingManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/payments"
          element={
            <ProtectedRoute requiredRole={UserRole.ADMIN}>
              <PaymentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute requiredRole={UserRole.ADMIN}>
              <ReportsPage />
            </ProtectedRoute>
          }
        />
  
        {/* Reader routes */}
        <Route
          path="/reader/dashboard"
          element={
            <ProtectedRoute requiredRole={UserRole.READER}>
              <ReaderDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reader/readings"
          element={
            <ProtectedRoute requiredRole={UserRole.READER}>
              <ReaderReading />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reader/profile"
          element={
            <ProtectedRoute requiredRole={UserRole.READER}>
              <ReaderProfile />
            </ProtectedRoute>
          }
        />
        <Route path="/reader" element={<Navigate to="/reader/dashboard" replace />} />

        {/* Cashier routes */}
        <Route
          path="/cashier/dashboard"
          element={
            <ProtectedRoute requiredRole={UserRole.CASHIER}>
              <CashierDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cashier/cashiering"
          element={
            <ProtectedRoute requiredRole={UserRole.CASHIER}>
              <Cashiering />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cashier/online"
          element={
            <ProtectedRoute requiredRole={UserRole.CASHIER}>
              <OnlinePayments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cashier/consumers"
          element={
            <ProtectedRoute requiredRole={UserRole.CASHIER}>
              <Consumers />
            </ProtectedRoute>
          }
        />
        <Route path="/cashier" element={<Navigate to="/cashier/dashboard" replace />} />

        {/* Consumer routes */}
        <Route
          path="/consumer/dashboard"
          element={
            <ProtectedRoute requiredRole={UserRole.CONSUMER}>
              <ConsumerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/consumer/history"
          element={
            <ProtectedRoute requiredRole={UserRole.CONSUMER}>
              <ConsumerHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/consumer/pending"
          element={
            <ProtectedRoute requiredRole={UserRole.CONSUMER}>
              <ConsumerPending />
            </ProtectedRoute>
          }
        />
        <Route
          path="/consumer/pay"
          element={
            <ProtectedRoute requiredRole={UserRole.CONSUMER}>
              <PaymentForm />
            </ProtectedRoute>
          }
        />
        <Route path="/consumer" element={<Navigate to="/consumer/dashboard" replace />} />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

// Simple 404 page
function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <a
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
        >
          Back to Login
        </a>
      </div>
    </div>
  );
}

export default App;

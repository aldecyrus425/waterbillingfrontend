import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./features/admin/pages/AdminDashboard";
import UserManagement from "./features/admin/pages/UserManagement";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login route - default */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Admin routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />

        {/* Cashier routes will go here */}
        {/* <Route path="/cashier/*" element={<CashierLayout />} /> */}

        {/* Reader routes will go here */}
        {/* <Route path="/reader/*" element={<ReaderLayout />} /> */}

        {/* Consumer routes will go here */}
        {/* <Route path="/consumer/*" element={<ConsumerLayout />} /> */}

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

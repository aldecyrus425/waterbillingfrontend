import React, { useState } from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
  onLogout?: () => void;
}

interface MenuItem {
  label: string;
  icon: string;
  path: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);

  const menuItems: MenuItem[] = [
    { label: "Dashboard", icon: "📊", path: "/admin/dashboard" },
    { label: "Users", icon: "👥", path: "/admin/users" },
    { label: "Billing", icon: "💳", path: "/admin/billing" },
    { label: "Payments", icon: "💰", path: "/admin/payments" },
    { label: "Reports", icon: "📈", path: "/admin/reports" },
    { label: "Settings", icon: "⚙️", path: "/admin/settings" },
  ];

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    // Navigate to login
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-b from-slate-900 to-slate-800 text-white transition-all duration-300 shadow-xl`}
      >
        {/* Logo Section */}
        <div className="h-20 flex items-center justify-center border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-xl font-bold">
              💧
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="font-bold text-lg">WaterBill</h1>
                <p className="text-xs text-gray-400">Admin Panel</p>
              </div>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <nav className="mt-8 space-y-2 px-4">
          {menuItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-slate-700 transition-colors group"
            >
              <span className="text-2xl">{item.icon}</span>
              {sidebarOpen && (
                <span className="text-sm font-medium group-hover:text-blue-400 transition-colors">
                  {item.label}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Toggle Button */}
        <div className="absolute bottom-8 left-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            title={sidebarOpen ? "Collapse" : "Expand"}
          >
            {sidebarOpen ? "◀️" : "▶️"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between h-20 px-8">
            {/* Left side - Menu toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-600 hover:text-gray-900 text-2xl md:hidden"
            >
              ☰
            </button>

            {/* Center - Page title (optional) */}
            <div className="flex-1 hidden md:block">
              <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
            </div>

            {/* Right side - Profile & Logout */}
            <div className="flex items-center gap-6">
              {/* Notifications */}
              <button className="relative text-gray-600 hover:text-gray-900 text-2xl">
                🔔
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {/* Avatar */}
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  {/* User Info */}
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-gray-900">Admin</p>
                    <p className="text-xs text-gray-500">Administrator</p>
                  </div>
                  {/* Chevron */}
                  <span className={`text-gray-600 transition-transform ${profileOpen ? "rotate-180" : ""}`}>
                    ▼
                  </span>
                </button>

                {/* Dropdown Menu */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    {/* Profile Header */}
                    <div className="p-4 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-900">Admin User</p>
                      <p className="text-xs text-gray-500">admin@waterbilling.com</p>
                    </div>

                    {/* Dropdown Items */}
                    <div className="py-2">
                      <a
                        href="#"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <span>👤</span>
                        <span>My Profile</span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <span>⚙️</span>
                        <span>Account Settings</span>
                      </a>
                      <a
                        href="#"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <span>🔐</span>
                        <span>Change Password</span>
                      </a>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200 p-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors font-semibold"
                      >
                        <span>🚪</span>
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {children}
          </div>
        </div>
      </div>

      {/* Mobile overlay for sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;

import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";

interface ReaderLayoutProps {
  children: React.ReactNode;
}

interface MenuItem {
  label: string;
  icon: string;
  path: string;
}

const ReaderLayout: React.FC<ReaderLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems: MenuItem[] = [
    { label: "Dashboard", icon: "📊", path: "/reader/dashboard" },
    { label: "Meter Reading", icon: "🧾", path: "/reader/readings" },
    { label: "Profile Settings", icon: "👤", path: "/reader/profile" },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const currentLabel =
    menuItems.find((item) => item.path === location.pathname)?.label || "Reader Dashboard";

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900">
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-slate-900 text-white transition-all duration-300 shadow-xl relative`}
      >
        <div className="h-20 flex items-center justify-center border-b border-slate-700 px-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center text-xl font-bold">
              💧
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="font-bold text-lg">WaterBill</h1>
                <p className="text-xs text-slate-300">Reader Panel</p>
              </div>
            )}
          </div>
        </div>

        <nav className="mt-8 space-y-2 px-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-lg transition-colors group ${
                  isActive ? "bg-cyan-500 text-white" : "hover:bg-slate-700 text-slate-200"
                }`
              }
            >
              <span className="text-2xl">{item.icon}</span>
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

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

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between h-20 px-6 md:px-8">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-slate-600 hover:text-slate-900 text-2xl md:hidden"
            >
              ☰
            </button>

            <div className="flex-1 hidden md:block">
              <h2 className="text-2xl font-bold text-slate-900">{currentLabel}</h2>
            </div>

            <div className="flex items-center gap-5">
              <button className="relative text-slate-600 hover:text-slate-900 text-2xl">
                🔔
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  2
                </span>
              </button>

              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-slate-700 rounded-full flex items-center justify-center text-white font-bold">
                    {user?.name.charAt(0) || "R"}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-slate-900">{user?.name || "Reader"}</p>
                    <p className="text-xs text-slate-500">Meter Reader</p>
                  </div>
                  <span className={`text-slate-600 transition-transform ${profileOpen ? "rotate-180" : ""}`}>
                    ▼
                  </span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <p className="text-sm font-semibold text-slate-900">{user?.name || "Reader"}</p>
                      <p className="text-xs text-slate-500">{user?.email}</p>
                    </div>
                    <div className="py-2">
                      <Link
                          to="/reader/profile"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        <span>👤</span>
                        <span>My Profile</span>
                        </Link>
                        <Link
                          to="/reader/profile"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        <span>⚙️</span>
                        <span>Account Settings</span>
                        </Link>
                    </div>
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

        <div className="flex-1 overflow-auto">
          <div className="p-6 md:p-8">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ReaderLayout;

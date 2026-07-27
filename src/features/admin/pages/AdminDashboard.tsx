import React from "react";
import AdminLayout from "../../../components/layouts/AdminLayout";

const AdminDashboard: React.FC = () => {
  const handleLogout = () => {
    console.log("User logged out");
    // Navigate to login page
    // navigate('/login');
  };

  return (
    <AdminLayout onLogout={handleLogout}>
      {/* Dashboard Content */}
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, Admin! 👋
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your water billing system today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Total Users", value: "1,234", icon: "👥", color: "bg-blue" },
            { label: "Total Billings", value: "856", icon: "📄", color: "bg-green" },
            { label: "Payments Received", value: "$45,290", icon: "💰", color: "bg-purple" },
            { label: "Pending Bills", value: "234", icon: "⏳", color: "bg-orange" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600 text-sm font-medium">{stat.label}</h3>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-green-600 mt-2">↑ 12% from last month</p>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activities */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {[
                { action: "New user registered", user: "John Doe", time: "2 hours ago", icon: "✨" },
                { action: "Payment received", user: "$500 from Jane Smith", time: "4 hours ago", icon: "💳" },
                { action: "Billing generated", user: "125 new bills", time: "1 day ago", icon: "📄" },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-center gap-4 pb-4 border-b border-gray-200 last:border-0">
                  <div className="text-2xl">{activity.icon}</div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.user}</p>
                  </div>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                ➕ Add User
              </button>
              <button className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                📄 Generate Bill
              </button>
              <button className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors">
                📊 View Reports
              </button>
              <button className="w-full px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors">
                ⚙️ Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

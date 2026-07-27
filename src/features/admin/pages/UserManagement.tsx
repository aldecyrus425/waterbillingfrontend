import React, { useState } from "react";
import AdminLayout from "../../../components/layouts/AdminLayout";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  status: "active" | "inactive";
  createdAt: string;
}

const USERS_PER_PAGE = 20;

const UserManagement: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data with 50 users
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@waterbilling.com",
      role: "Consumer",
      phone: "+1-234-567-8900",
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@waterbilling.com",
      role: "Cashier",
      phone: "+1-234-567-8901",
      status: "active",
      createdAt: "2024-02-20",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@waterbilling.com",
      role: "Reader",
      phone: "+1-234-567-8902",
      status: "active",
      createdAt: "2024-03-10",
    },
    {
      id: "4",
      name: "Sarah Wilson",
      email: "sarah@waterbilling.com",
      role: "Admin",
      phone: "+1-234-567-8903",
      status: "inactive",
      createdAt: "2024-01-05",
    },
    ...Array.from({ length: 46 }, (_, i) => ({
      id: String(i + 5),
      name: `User ${i + 5}`,
      email: `user${i + 5}@waterbilling.com`,
      role: ["Admin", "Cashier", "Reader", "Consumer"][
        Math.floor(Math.random() * 4)
      ],
      phone: `+1-${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
      status: Math.random() > 0.2 ? "active" : "inactive",
      createdAt: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
    })),
  ]);

  const handleLogout = () => {
    console.log("Logout");
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + USERS_PER_PAGE
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = (id: string) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const getRoleBadgeColor = (role: string) => {
    const colors: Record<string, string> = {
      Admin: "bg-red-100 text-red-800",
      Cashier: "bg-blue-100 text-blue-800",
      Reader: "bg-green-100 text-green-800",
      Consumer: "bg-purple-100 text-purple-800",
    };
    return colors[role] || "bg-gray-100 text-gray-800";
  };

  const getStatusBadgeColor = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  return (
    <AdminLayout onLogout={handleLogout}>
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-900 mb-1">
            User Management
          </h1>
          <p className="text-sm text-gray-500">
            Manage all users in the water billing system
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between mb-6">
          {/* Search */}
          <div className="flex-1 w-full md:max-w-sm">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 hover:border-gray-400 focus:border-blue-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm transition-all"
            />
          </div>

          {/* Filter */}
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-3 py-2 border border-gray-300 hover:border-gray-400 focus:border-blue-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm font-medium transition-all"
          >
            <option value="all">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Cashier">Cashier</option>
            <option value="Reader">Reader</option>
            <option value="Consumer">Consumer</option>
          </select>

          {/* Add Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors"
          >
            + Add User
          </button>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-7 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-700">
            <div>Name</div>
            <div>Email</div>
            <div>Role</div>
            <div>Phone</div>
            <div>Status</div>
            <div>Created</div>
            <div>Actions</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <div
                  key={user.id}
                  className="grid grid-cols-1 md:grid-cols-7 gap-4 p-4 items-center hover:bg-gray-50 transition-colors"
                >
                  {/* Mobile Label + Content */}
                  <div className="md:contents">
                    <div>
                      <span className="md:hidden text-xs font-semibold text-gray-500 block mb-1">
                        Name
                      </span>
                      <p className="font-medium text-gray-900 text-sm">{user.name}</p>
                    </div>
                    <div>
                      <span className="md:hidden text-xs font-semibold text-gray-500 block mb-1">
                        Email
                      </span>
                      <p className="text-gray-600 text-sm">{user.email}</p>
                    </div>
                    <div>
                      <span className="md:hidden text-xs font-semibold text-gray-500 block mb-1">
                        Role
                      </span>
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium ${getRoleBadgeColor(
                          user.role
                        )}`}
                      >
                        {user.role}
                      </span>
                    </div>
                    <div>
                      <span className="md:hidden text-xs font-semibold text-gray-500 block mb-1">
                        Phone
                      </span>
                      <p className="text-gray-600 text-sm">{user.phone}</p>
                    </div>
                    <div>
                      <span className="md:hidden text-xs font-semibold text-gray-500 block mb-1">
                        Status
                      </span>
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusBadgeColor(
                          user.status
                        )}`}
                      >
                        {user.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <div>
                      <span className="md:hidden text-xs font-semibold text-gray-500 block mb-1">
                        Created
                      </span>
                      <p className="text-gray-600 text-sm">{user.createdAt}</p>
                    </div>
                    <div>
                      <span className="md:hidden text-xs font-semibold text-gray-500 block mb-1">
                        Actions
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingUser(user)}
                          className="px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-xs font-medium transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="px-2 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-xs font-medium transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <p className="text-sm font-medium text-gray-600">No users found</p>
                <p className="text-xs text-gray-400 mt-1">Try adjusting your search filters</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredUsers.length > 0 && (
            <div className="p-4 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 bg-gray-50">
              {/* Info */}
              <div className="text-xs font-medium text-gray-600">
                Showing <span className="text-gray-900 font-semibold">{startIndex + 1}</span> to{" "}
                <span className="text-gray-900 font-semibold">
                  {Math.min(startIndex + USERS_PER_PAGE, filteredUsers.length)}
                </span>{" "}
                of <span className="text-gray-900 font-semibold">{filteredUsers.length}</span> users
              </div>

              {/* Pagination Controls */}
              <div className="flex items-center gap-1">
                {/* Previous Button */}
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="px-2 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed text-gray-700 rounded text-xs font-medium transition-colors"
                >
                  ← Prev
                </button>

                {/* Page Numbers */}
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageClick(page)}
                        className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                          currentPage === page
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="px-2 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed text-gray-700 rounded text-xs font-medium transition-colors"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <p className="text-xs text-gray-600 font-medium">Total Users</p>
            <p className="text-2xl font-semibold text-gray-900 mt-2">{users.length}</p>
            <p className="text-xs text-gray-500 mt-1">All registered users</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <p className="text-xs text-gray-600 font-medium">Active Users</p>
            <p className="text-2xl font-semibold text-green-600 mt-2">
              {users.filter((u) => u.status === "active").length}
            </p>
            <p className="text-xs text-gray-500 mt-1">Currently active</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <p className="text-xs text-gray-600 font-medium">Inactive Users</p>
            <p className="text-2xl font-semibold text-red-600 mt-2">
              {users.filter((u) => u.status === "inactive").length}
            </p>
            <p className="text-xs text-gray-500 mt-1">Awaiting activation</p>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingUser) && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-sm w-full border border-gray-200">
            {/* Modal Header */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingUser ? "Edit User" : "Add New User"}
              </h2>
              <p className="text-gray-500 text-xs mt-1">
                {editingUser
                  ? `Update ${editingUser.name}'s information`
                  : "Create a new user account"}
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-4 space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter name"
                  defaultValue={editingUser?.name}
                  className="w-full px-3 py-2 border border-gray-300 hover:border-gray-400 focus:border-blue-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter email"
                  defaultValue={editingUser?.email}
                  className="w-full px-3 py-2 border border-gray-300 hover:border-gray-400 focus:border-blue-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  defaultValue={editingUser?.role}
                  className="w-full px-3 py-2 border border-gray-300 hover:border-gray-400 focus:border-blue-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm font-medium transition-all"
                >
                  <option>Admin</option>
                  <option>Cashier</option>
                  <option>Reader</option>
                  <option>Consumer</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="Enter phone"
                  defaultValue={editingUser?.phone}
                  className="w-full px-3 py-2 border border-gray-300 hover:border-gray-400 focus:border-blue-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  defaultValue={editingUser?.status}
                  className="w-full px-3 py-2 border border-gray-300 hover:border-gray-400 focus:border-blue-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm font-medium transition-all"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-200 flex gap-2 bg-gray-50">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingUser(null);
                }}
                className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 font-medium text-sm transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium text-sm transition-colors">
                {editingUser ? "Update" : "Add"} User
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default UserManagement;

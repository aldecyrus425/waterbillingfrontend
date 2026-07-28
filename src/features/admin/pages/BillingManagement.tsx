import React, { useState } from "react";
import AdminLayout from "../../../components/layouts/AdminLayout";

interface Billing {
  id: string;
  customerName: string;
  billNumber: string;
  amount: string;
  dueDate: string;
  status: "Paid" | "Unpaid" | "Overdue";
  createdAt: string;
}

const BILLINGS_PER_PAGE = 20;

const BillingManagement: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [editingBilling, setEditingBilling] = useState<Billing | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [billings, setBillings] = useState<Billing[]>([
    {
      id: "1",
      customerName: "John Doe",
      billNumber: "BILL-1001",
      amount: "$145.00",
      dueDate: "2024-08-10",
      status: "Unpaid",
      createdAt: "2024-07-10",
    },
    {
      id: "2",
      customerName: "Jane Smith",
      billNumber: "BILL-1002",
      amount: "$89.50",
      dueDate: "2024-08-05",
      status: "Paid",
      createdAt: "2024-06-28",
    },
    {
      id: "3",
      customerName: "Michael Lee",
      billNumber: "BILL-1003",
      amount: "$230.75",
      dueDate: "2024-08-16",
      status: "Overdue",
      createdAt: "2024-07-01",
    },
    {
      id: "4",
      customerName: "Sarah Wilson",
      billNumber: "BILL-1004",
      amount: "$120.00",
      dueDate: "2024-08-20",
      status: "Unpaid",
      createdAt: "2024-07-04",
    },
    ...Array.from({ length: 46 }, (_, i) => ({
      id: String(i + 5),
      customerName: `Customer ${i + 5}`,
      billNumber: `BILL-${1005 + i}`,
      amount: `$${(Math.random() * 300 + 50).toFixed(2)}`,
      dueDate: `2024-${String(Math.floor(Math.random() * 3) + 8).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
      status: ["Paid", "Unpaid", "Overdue"][Math.floor(Math.random() * 3)] as Billing["status"],
      createdAt: `2024-${String(Math.floor(Math.random() * 6) + 3).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
    })),
  ]);

  const handleLogout = () => {
    console.log("Logout");
  };

  const filteredBillings = billings.filter((billing) => {
    const matchesSearch =
      billing.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      billing.billNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || billing.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredBillings.length / BILLINGS_PER_PAGE);
  const startIndex = (currentPage - 1) * BILLINGS_PER_PAGE;
  const paginatedBillings = filteredBillings.slice(startIndex, startIndex + BILLINGS_PER_PAGE);

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
    setBillings(billings.filter((billing) => billing.id !== id));
  };

  const getStatusBadgeColor = (status: Billing["status"]) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Unpaid":
        return "bg-yellow-100 text-yellow-800";
      case "Overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminLayout onLogout={handleLogout}>
      <div className="space-y-6">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-900 mb-1">Billing</h1>
          <p className="text-sm text-gray-500">
            Manage recurring bills, payment status, and outstanding invoices.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-3 items-center justify-between mb-6">
          <div className="flex-1 w-full md:max-w-sm">
            <input
              type="text"
              placeholder="Search by customer or bill number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 hover:border-gray-400 focus:border-blue-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm transition-all"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 hover:border-gray-400 focus:border-blue-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm font-medium transition-all"
          >
            <option value="all">All Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
            <option value="Overdue">Overdue</option>
          </select>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors"
          >
            + Add Bill
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="hidden md:grid grid-cols-6 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-700">
            <div>Customer</div>
            <div>Bill #</div>
            <div>Amount</div>
            <div>Due Date</div>
            <div>Status</div>
            <div>Actions</div>
          </div>

          <div className="divide-y divide-gray-200">
            {paginatedBillings.length > 0 ? (
              paginatedBillings.map((billing) => (
                <div
                  key={billing.id}
                  className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 items-center hover:bg-gray-50 transition-colors"
                >
                  <div className="md:contents">
                    <div>
                      <span className="md:hidden text-xs font-semibold text-gray-500 block mb-1">
                        Customer
                      </span>
                      <p className="font-medium text-gray-900 text-sm">{billing.customerName}</p>
                    </div>
                    <div>
                      <span className="md:hidden text-xs font-semibold text-gray-500 block mb-1">
                        Bill #
                      </span>
                      <p className="text-gray-600 text-sm">{billing.billNumber}</p>
                    </div>
                    <div>
                      <span className="md:hidden text-xs font-semibold text-gray-500 block mb-1">
                        Amount
                      </span>
                      <p className="text-gray-900 text-sm font-semibold">{billing.amount}</p>
                    </div>
                    <div>
                      <span className="md:hidden text-xs font-semibold text-gray-500 block mb-1">
                        Due Date
                      </span>
                      <p className="text-gray-600 text-sm">{billing.dueDate}</p>
                    </div>
                    <div>
                      <span className="md:hidden text-xs font-semibold text-gray-500 block mb-1">
                        Status
                      </span>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusBadgeColor(billing.status)}`}>
                        {billing.status}
                      </span>
                    </div>
                    <div>
                      <span className="md:hidden text-xs font-semibold text-gray-500 block mb-1">
                        Actions
                      </span>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setEditingBilling(billing)}
                          className="px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-xs font-medium transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(billing.id)}
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
                <p className="text-sm font-medium text-gray-600">No bills found</p>
                <p className="text-xs text-gray-400 mt-1">Try adjusting your search filters</p>
              </div>
            )}
          </div>

          {filteredBillings.length > 0 && (
            <div className="p-4 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 bg-gray-50">
              <div className="text-xs font-medium text-gray-600">
                Showing <span className="text-gray-900 font-semibold">{startIndex + 1}</span> to <span className="text-gray-900 font-semibold">
                  {Math.min(startIndex + BILLINGS_PER_PAGE, filteredBillings.length)}
                </span> of <span className="text-gray-900 font-semibold">{filteredBillings.length}</span> bills
              </div>

              <div className="flex items-center gap-1 flex-wrap">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="px-2 py-1 bg-gray-200 hover:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed text-gray-700 rounded text-xs font-medium transition-colors"
                >
                  ← Prev
                </button>
                <div className="flex gap-1 flex-wrap">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
                  ))}
                </div>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <p className="text-xs text-gray-600 font-medium">Total Bills</p>
            <p className="text-2xl font-semibold text-gray-900 mt-2">{billings.length}</p>
            <p className="text-xs text-gray-500 mt-1">All generated bills</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <p className="text-xs text-gray-600 font-medium">Paid Bills</p>
            <p className="text-2xl font-semibold text-green-600 mt-2">{billings.filter((b) => b.status === "Paid").length}</p>
            <p className="text-xs text-gray-500 mt-1">Successfully paid</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <p className="text-xs text-gray-600 font-medium">Unpaid / Overdue</p>
            <p className="text-2xl font-semibold text-red-600 mt-2">{billings.filter((b) => b.status !== "Paid").length}</p>
            <p className="text-xs text-gray-500 mt-1">Still pending or overdue</p>
          </div>
        </div>
      </div>

      {(showAddModal || editingBilling) && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-sm w-full border border-gray-200">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingBilling ? "Edit Bill" : "Add New Bill"}
              </h2>
              <p className="text-gray-500 text-xs mt-1">
                {editingBilling
                  ? `Update ${editingBilling.billNumber}`
                  : "Create a new invoice for a customer"}
              </p>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Customer Name</label>
                <input
                  type="text"
                  placeholder="Enter customer name"
                  defaultValue={editingBilling?.customerName}
                  className="w-full px-3 py-2 border border-gray-300 hover:border-gray-400 focus:border-blue-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Bill Number</label>
                <input
                  type="text"
                  placeholder="Enter bill number"
                  defaultValue={editingBilling?.billNumber}
                  className="w-full px-3 py-2 border border-gray-300 hover:border-gray-400 focus:border-blue-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Amount</label>
                <input
                  type="text"
                  placeholder="Enter amount"
                  defaultValue={editingBilling?.amount}
                  className="w-full px-3 py-2 border border-gray-300 hover:border-gray-400 focus:border-blue-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Due Date</label>
                <input
                  type="date"
                  defaultValue={editingBilling?.dueDate}
                  className="w-full px-3 py-2 border border-gray-300 hover:border-gray-400 focus:border-blue-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                <select
                  defaultValue={editingBilling?.status}
                  className="w-full px-3 py-2 border border-gray-300 hover:border-gray-400 focus:border-blue-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm font-medium transition-all"
                >
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 flex gap-2 bg-gray-50">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingBilling(null);
                }}
                className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 font-medium text-sm transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium text-sm transition-colors">
                {editingBilling ? "Update" : "Add"} Bill
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default BillingManagement;

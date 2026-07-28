import React, { useState } from "react";
import AdminLayout from "../../../components/layouts/AdminLayout";

interface Payment {
  id: string;
  customerName: string;
  billNumber: string;
  amount: string;
  paymentDate: string;
  method: string;
  status: "Completed" | "Pending" | "Failed";
}

const PAYMENTS_PER_PAGE = 20;

const PaymentsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const [payments, setPayments] = useState<Payment[]>([
    {
      id: "1",
      customerName: "John Doe",
      billNumber: "BILL-1001",
      amount: "$145.00",
      paymentDate: "2024-08-10",
      method: "Cash",
      status: "Completed",
    },
    {
      id: "2",
      customerName: "Jane Smith",
      billNumber: "BILL-1002",
      amount: "$89.50",
      paymentDate: "2024-08-05",
      method: "Credit Card",
      status: "Completed",
    },
    {
      id: "3",
      customerName: "Michael Lee",
      billNumber: "BILL-1003",
      amount: "$230.75",
      paymentDate: "2024-08-16",
      method: "Bank Transfer",
      status: "Pending",
    },
    {
      id: "4",
      customerName: "Sarah Wilson",
      billNumber: "BILL-1004",
      amount: "$120.00",
      paymentDate: "2024-08-20",
      method: "Mobile Pay",
      status: "Failed",
    },
    ...Array.from({ length: 46 }, (_, i) => ({
      id: String(i + 5),
      customerName: `Customer ${i + 5}`,
      billNumber: `BILL-${1005 + i}`,
      amount: `$${(Math.random() * 300 + 50).toFixed(2)}`,
      paymentDate: `2024-${String(Math.floor(Math.random() * 3) + 8).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
      method: ["Cash", "Credit Card", "Bank Transfer", "Mobile Pay"][Math.floor(Math.random() * 4)],
      status: ["Completed", "Pending", "Failed"][Math.floor(Math.random() * 3)] as Payment["status"],
    })),
  ]);

  const handleLogout = () => {
    console.log("Logout");
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.billNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.method.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === "all" || payment.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredPayments.length / PAYMENTS_PER_PAGE));
  const startIndex = (currentPage - 1) * PAYMENTS_PER_PAGE;
  const paginatedPayments = filteredPayments.slice(startIndex, startIndex + PAYMENTS_PER_PAGE);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const getStatusBadgeColor = (status: Payment["status"]) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalCompleted = payments.filter((payment) => payment.status === "Completed").length;
  const totalPending = payments.filter((payment) => payment.status === "Pending").length;
  const totalFailed = payments.filter((payment) => payment.status === "Failed").length;

  return (
    <AdminLayout onLogout={handleLogout}>
      <div className="space-y-6">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-900 mb-1">Payments</h1>
          <p className="text-sm text-gray-500">
            Keep track of all payments collected, pending transactions, and failed receipts.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-3 items-center justify-between mb-6">
          <div className="flex-1 w-full md:max-w-sm">
            <input
              type="text"
              placeholder="Search by customer, bill number, or method..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 border border-gray-300 hover:border-gray-400 focus:border-blue-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm transition-all"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 border border-gray-300 hover:border-gray-400 focus:border-blue-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm font-medium transition-all"
          >
            <option value="all">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>

          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors"
            onClick={() => {
              setSearchQuery("");
              setFilterStatus("all");
              setCurrentPage(1);
            }}
          >
            Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <p className="text-xs text-gray-600 font-medium">Total Payments</p>
            <p className="text-3xl font-bold text-gray-900 mt-3">{payments.length}</p>
            <p className="text-xs text-gray-500 mt-1">All payment records in the system.</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <p className="text-xs text-gray-600 font-medium">Completed</p>
            <p className="text-3xl font-bold text-green-700 mt-3">{totalCompleted}</p>
            <p className="text-xs text-gray-500 mt-1">Fully processed payments.</p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <p className="text-xs text-gray-600 font-medium">Pending / Failed</p>
            <p className="text-3xl font-bold text-red-700 mt-3">{totalPending + totalFailed}</p>
            <p className="text-xs text-gray-500 mt-1">Transactions needing attention.</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="hidden md:grid grid-cols-7 gap-4 p-4 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-700">
            <div>Customer</div>
            <div>Bill #</div>
            <div>Amount</div>
            <div>Payment Date</div>
            <div>Method</div>
            <div>Status</div>
            <div>Actions</div>
          </div>

          <div className="divide-y divide-gray-200">
            {paginatedPayments.length > 0 ? (
              paginatedPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="grid grid-cols-1 md:grid-cols-7 gap-4 p-4 items-center hover:bg-gray-50 transition-colors"
                >
                  <div className="md:contents">
                    <div>
                      <span className="md:hidden text-xs font-semibold text-gray-500 block mb-1">Customer</span>
                      <p className="font-medium text-gray-900 text-sm">{payment.customerName}</p>
                    </div>
                    <div>
                      <span className="md:hidden text-xs font-semibold text-gray-500 block mb-1">Bill #</span>
                      <p className="text-gray-600 text-sm">{payment.billNumber}</p>
                    </div>
                    <div>
                      <span className="md:hidden text-xs font-semibold text-gray-500 block mb-1">Amount</span>
                      <p className="text-gray-900 text-sm font-semibold">{payment.amount}</p>
                    </div>
                    <div>
                      <span className="md:hidden text-xs font-semibold text-gray-500 block mb-1">Date</span>
                      <p className="text-gray-600 text-sm">{payment.paymentDate}</p>
                    </div>
                    <div>
                      <span className="md:hidden text-xs font-semibold text-gray-500 block mb-1">Method</span>
                      <p className="text-gray-600 text-sm">{payment.method}</p>
                    </div>
                    <div>
                      <span className="md:hidden text-xs font-semibold text-gray-500 block mb-1">Status</span>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusBadgeColor(payment.status)}`}>
                        {payment.status}
                      </span>
                    </div>
                    <div>
                      <span className="md:hidden text-xs font-semibold text-gray-500 block mb-1">Actions</span>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setSelectedPayment(payment)}
                          className="px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-xs font-medium transition-colors"
                        >
                          View
                        </button>
                        <button
                          onClick={() => setPayments(payments.filter((item) => item.id !== payment.id))}
                          className="px-2 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-xs font-medium transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <p className="text-sm font-medium text-gray-600">No payments found</p>
                <p className="text-xs text-gray-400 mt-1">Update your search or status filter to see results.</p>
              </div>
            )}
          </div>

          {filteredPayments.length > 0 && (
            <div className="p-4 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 bg-gray-50">
              <div className="text-xs font-medium text-gray-600">
                Showing <span className="text-gray-900 font-semibold">{startIndex + 1}</span> to <span className="text-gray-900 font-semibold">
                  {Math.min(startIndex + PAYMENTS_PER_PAGE, filteredPayments.length)}
                </span> of <span className="text-gray-900 font-semibold">{filteredPayments.length}</span> payments
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
                        currentPage === page ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
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
      </div>

      {selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">Payment Details</h2>
              <p className="text-gray-500 text-xs mt-1">Review payment information and transaction details.</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-wide">Customer</p>
                  <p className="text-gray-900 font-semibold">{selectedPayment.customerName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-wide">Bill #</p>
                  <p className="text-gray-900 font-semibold">{selectedPayment.billNumber}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-wide">Amount</p>
                  <p className="text-gray-900 font-semibold">{selectedPayment.amount}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-wide">Payment Date</p>
                  <p className="text-gray-900 font-semibold">{selectedPayment.paymentDate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 uppercase tracking-wide">Method</p>
                  <p className="text-gray-900 font-semibold">{selectedPayment.method}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-600 uppercase tracking-wide">Status</p>
                <span className={`inline-block px-3 py-1 rounded text-xs font-medium ${getStatusBadgeColor(selectedPayment.status)}`}>
                  {selectedPayment.status}
                </span>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-2">
              <button
                onClick={() => setSelectedPayment(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 font-medium text-sm transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default PaymentsPage;

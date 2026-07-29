import React, { useState } from "react";
import ConsumerLayout from "../../../components/layouts/ConsumerLayout";

const PaymentForm: React.FC = () => {
  const [account, setAccount] = useState("");
  const [bill, setBill] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("cash");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save payment to localStorage as an 'online' payment for cashier to accept
    try {
      const paymentsRaw = localStorage.getItem("onlinePayments");
      const payments = paymentsRaw ? JSON.parse(paymentsRaw) : [];
      const payment = {
        id: `P-${Date.now()}`,
        account: account || "",
        bill: bill || "",
        amount: parseFloat(amount) || 0,
        method,
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      payments.push(payment);
      localStorage.setItem("onlinePayments", JSON.stringify(payments));
      setMessage(`Payment submitted for ${account || "(account)"} • ${amount || "₱0"} via ${method}`);
      setAccount("");
      setBill("");
      setAmount("");
      setMethod("cash");
    } catch (err) {
      console.error(err);
      setMessage("Failed to submit payment. Try again.");
    }
  };

  return (
    <ConsumerLayout>
      <div>
        <div>
          <h1 className="text-3xl font-bold">Pay Bill</h1>
          <p className="text-sm text-slate-500 mt-2">Pay a bill quickly using the form below.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-xl">
          <label className="text-sm text-slate-600">Account #</label>
          <input value={account} onChange={(e) => setAccount(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 bg-slate-50 text-slate-900" placeholder="Enter account number" />

          <label className="text-sm text-slate-600 mt-4">Bill Reference (optional)</label>
          <input value={bill} onChange={(e) => setBill(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 bg-slate-50 text-slate-900" placeholder="Bill reference" />

          <label className="text-sm text-slate-600 mt-4">Amount</label>
          <input value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 bg-slate-50 text-slate-900" placeholder="0.00" />

          <label className="text-sm text-slate-600 mt-4">Payment Method</label>
          <select value={method} onChange={(e) => setMethod(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 bg-slate-50 text-slate-900">
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="mobile">Mobile Wallet</option>
          </select>

          <div className="mt-6 flex items-center gap-3">
            <button type="submit" className="rounded-lg bg-cyan-600 text-white px-4 py-2 font-semibold">Submit Payment</button>
            <button type="button" onClick={() => { setAccount(""); setBill(""); setAmount(""); setMethod("cash"); setMessage(""); }} className="rounded-lg border border-slate-200 px-4 py-2">Reset</button>
          </div>

          {message && <p className="mt-4 text-sm text-emerald-600">{message}</p>}
        </form>
      </div>
    </ConsumerLayout>
  );
};

export default PaymentForm;

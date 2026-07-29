import React, { useState } from "react";
import CashierLayout from "../../../components/layouts/CashierLayout";

type Bill = {
  billNumber: string;
  accountId: string;
  consumerName: string;
  billDate: string; // ISO or human string
  consumptionM3: number;
  amountDue: number; // in pesos
  status: "pending" | "paid";
};

const sampleBills: Bill[] = [
  {
    billNumber: "B-1204",
    accountId: "1024",
    consumerName: "Carlos Mendoza",
    billDate: "2026-06-15",
    consumptionM3: 28,
    amountDue: 650,
    status: "pending",
  },
  {
    billNumber: "B-1189",
    accountId: "1024",
    consumerName: "Carlos Mendoza",
    billDate: "2026-05-16",
    consumptionM3: 22,
    amountDue: 800,
    status: "pending",
  },
  {
    billNumber: "B-2001",
    accountId: "2048",
    consumerName: "María Santos",
    billDate: "2026-06-10",
    consumptionM3: 12,
    amountDue: 430,
    status: "pending",
  },
];

const formatCurrency = (n: number) => `₱${n.toFixed(2)}`;

const Cashiering: React.FC = () => {
  const [query, setQuery] = useState("");
  const [bills, setBills] = useState<Bill[]>(sampleBills);
  const [selected, setSelected] = useState<Bill | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const results = bills.filter((b) =>
    b.billNumber.toLowerCase().includes(query.toLowerCase().trim())
  );

  const selectBill = (b: Bill) => {
    setSelected(b);
    setPaymentAmount("");
    setMessage("");
  };

  const acceptPayment = () => {
    if (!selected) return;
    const amount = parseFloat(paymentAmount);
    if (isNaN(amount) || amount <= 0) {
      setMessage("Enter a valid payment amount.");
      return;
    }
    if (amount < selected.amountDue) {
      setMessage("Payment amount is less than amount due. Please collect full amount.");
      return;
    }

    const change = +(amount - selected.amountDue).toFixed(2);

    // Mark bill as paid in state
    setBills((prev) => prev.map((b) => (b.billNumber === selected.billNumber ? { ...b, status: "paid" } : b)));

    // Build receipt data
    const receipt = {
      receiptId: `R-${Date.now()}`,
      bill: selected,
      paidAmount: amount,
      change,
      cashier: "Frontline Cashier",
      paidAt: new Date().toLocaleString(),
    };

    // Print the receipt in a new window (simple approach)
    const receiptHtml = `
      <html>
      <head>
        <title>Receipt ${receipt.receiptId}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; padding: 24px; }
          .receipt { max-width: 420px; margin: 0 auto; }
          h2 { margin: 0 0 8px 0; }
          .meta { font-size: 0.9rem; color: #444; margin-bottom: 12px; }
          .line { display:flex; justify-content:space-between; margin:6px 0; }
          .total { font-weight:700; font-size:1.1rem; }
        </style>
      </head>
      <body>
        <div class="receipt">
          <h2>WaterBilling Office</h2>
          <div class="meta">Receipt: ${receipt.receiptId}<br/>Paid At: ${receipt.paidAt}</div>
          <div class="meta">Cashier: ${receipt.cashier}</div>
          <hr/>
          <div class="line"><div>Bill #</div><div>${receipt.bill.billNumber}</div></div>
          <div class="line"><div>Account</div><div>${receipt.bill.accountId}</div></div>
          <div class="line"><div>Consumer</div><div>${receipt.bill.consumerName}</div></div>
          <div class="line"><div>Consumption</div><div>${receipt.bill.consumptionM3} m³</div></div>
          <div class="line"><div>Amount Due</div><div>${formatCurrency(receipt.bill.amountDue)}</div></div>
          <div class="line"><div>Paid</div><div>${formatCurrency(receipt.paidAmount)}</div></div>
          <div class="line"><div>Change</div><div>${formatCurrency(receipt.change)}</div></div>
          <hr/>
          <p style="font-size:0.85rem; color:#555;">Thank you for your payment.</p>
        </div>
        <script>window.print(); setTimeout(() => window.close(), 500);</script>
      </body>
      </html>
    `;

    const w = window.open("", "_blank", "width=420,height=700");
    if (w) {
      w.document.open();
      w.document.write(receiptHtml);
      w.document.close();
    } else {
      setMessage("Unable to open print window. Please allow popups or use browser print.");
    }

    setMessage(`Payment accepted. Change: ${formatCurrency(change)}`);
    setSelected(null);
  };

  return (
    <CashierLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Cashiering — Walk-in Payments</h1>
          <p className="text-sm text-slate-500 mt-2">Search by bill number, accept face-to-face payments, and print receipts.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="lg:col-span-1 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <label className="text-sm text-slate-600">Search bill number</label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. B-1204"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 bg-slate-50 text-slate-900"
            />

            <div className="mt-4 space-y-2 max-h-[50vh] overflow-auto">
              {results.length === 0 && <div className="text-sm text-slate-400 py-8">No bills found.</div>}
              {results.map((b) => (
                <button
                  key={b.billNumber}
                  onClick={() => selectBill(b)}
                  className={`w-full text-left rounded-lg p-3 hover:bg-slate-50 transition flex items-center gap-3 ${b.status === "paid" ? "opacity-60" : ""}`}
                >
                  <div className="flex-1">
                    <p className="font-semibold">{b.billNumber} • {b.consumerName}</p>
                    <p className="text-sm text-slate-500">Account #{b.accountId} • {b.billDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(b.amountDue)}</p>
                    <p className={`text-xs ${b.status === "paid" ? "text-emerald-600" : "text-amber-600"}`}>{b.status === "paid" ? "Paid" : "Pending"}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            {!selected ? (
              <div className="text-center py-12 text-slate-500">Select a bill from the list to process payment.</div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">Bill {selected.billNumber}</h2>
                    <p className="text-sm text-slate-500">{selected.consumerName} • Account #{selected.accountId}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500">Status</p>
                    <p className="text-2xl font-semibold">{selected.status === "paid" ? "Paid" : "Pending"}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-600">Bill date</p>
                      <p className="font-semibold">{selected.billDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Consumption</p>
                      <p className="font-semibold">{selected.consumptionM3} m³</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Amount due</p>
                      <p className="text-2xl font-semibold">{formatCurrency(selected.amountDue)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Collector</p>
                      <p className="font-semibold">Frontline Cashier</p>
                    </div>
                  </div>
                </div>

                {selected.status === "paid" ? (
                  <div className="text-center py-6">
                    <p className="text-emerald-600 font-semibold">This bill is already paid.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <label className="block text-sm font-medium">Amount received</label>

                    <div className="flex items-center gap-4">
                      <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
                        <div className="text-sm text-slate-500">Due</div>
                        <div className="text-xl font-semibold">{formatCurrency(selected.amountDue)}</div>
                      </div>

                      <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
                        <div className="text-sm text-slate-500">Received</div>
                        <div className="text-xl font-semibold">{paymentAmount || "₱0.00"}</div>
                      </div>

                      <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
                        <div className="text-sm text-slate-500">Change</div>
                        <div className="text-xl font-semibold text-emerald-600">
                          {(() => {
                            const amt = parseFloat(paymentAmount);
                            if (isNaN(amt)) return "₱0.00";
                            const ch = +(amt - selected.amountDue).toFixed(2);
                            return ch >= 0 ? formatCurrency(ch) : "Insufficient";
                          })()}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2 max-w-xs">
                      {['1','2','3','4','5','6','7','8','9','.','0','⌫'].map((k) => (
                        <button
                          key={k}
                          onClick={() => {
                            if (k === '⌫') {
                              setPaymentAmount((p) => p.slice(0, -1));
                              return;
                            }
                            if (k === '.' && paymentAmount.includes('.')) return;
                            setPaymentAmount((p) => (p === '0' ? k : p + k));
                          }}
                          className="rounded-lg border border-slate-200 px-4 py-3 bg-slate-50 text-lg font-medium"
                        >
                          {k}
                        </button>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <button onClick={() => setPaymentAmount(selected.amountDue.toFixed(2))} className="rounded-lg bg-slate-700 text-white px-4 py-2">Exact</button>
                      <button onClick={() => { setPaymentAmount(''); setMessage(''); }} className="rounded-lg border border-slate-200 px-4 py-2">Clear</button>
                    </div>

                    <div className="flex items-center gap-3 mt-3">
                      <button onClick={acceptPayment} className="rounded-lg bg-emerald-600 text-white px-4 py-2 font-semibold">Accept payment</button>
                      <button onClick={() => { setSelected(null); setPaymentAmount(""); setMessage(""); }} className="rounded-lg border border-slate-200 px-4 py-2">Cancel</button>
                    </div>
                    {message && <p className="text-sm text-slate-600 mt-2">{message}</p>}
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </CashierLayout>
  );
};

export default Cashiering;

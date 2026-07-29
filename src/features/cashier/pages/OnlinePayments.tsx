import React, { useEffect, useState } from "react";
import CashierLayout from "../../../components/layouts/CashierLayout";

type OnlinePayment = {
  id: string;
  account: string;
  bill: string;
  amount: number;
  method: string;
  status: "pending" | "accepted" | "failed";
  createdAt: string;
};

const formatCurrency = (n: number) => `₱${n.toFixed(2)}`;

const OnlinePayments: React.FC = () => {
  const [payments, setPayments] = useState<OnlinePayment[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("onlinePayments");
    if (raw) {
      try {
        setPayments(JSON.parse(raw));
        return;
      } catch (err) {
        // fall through to seed demo data
      }
    }

    // seed demo online payments when none exist (for demo/testing)
    const demo: OnlinePayment[] = [
      {
        id: `P-${Date.now()}-1`,
        account: "1024",
        bill: "B-1204",
        amount: 650,
        method: "mobile",
        status: "pending",
        createdAt: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
      },
      {
        id: `P-${Date.now()}-2`,
        account: "2048",
        bill: "B-2001",
        amount: 430,
        method: "card",
        status: "pending",
        createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
      },
    ];

    try {
      localStorage.setItem("onlinePayments", JSON.stringify(demo));
    } catch (err) {}
    setPayments(demo);
  }, []);

  const persist = (next: OnlinePayment[]) => {
    setPayments(next);
    try {
      localStorage.setItem("onlinePayments", JSON.stringify(next));
    } catch (err) {}
  };

  const accept = (p: OnlinePayment) => {
    const next = payments.map((x) => (x.id === p.id ? { ...x, status: "accepted" } : x));
    persist(next);

    // simple receipt print
    const receipt = {
      receiptId: `R-${Date.now()}`,
      payment: p,
      paidAt: new Date().toLocaleString(),
      cashier: "Frontline Cashier",
    };

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
        </style>
      </head>
      <body>
        <div class="receipt">
          <h2>WaterBilling Office</h2>
          <div class="meta">Receipt: ${receipt.receiptId}<br/>Paid At: ${receipt.paidAt}</div>
          <div class="meta">Cashier: ${receipt.cashier}</div>
          <hr/>
          <div class="line"><div>Payment ID</div><div>${receipt.payment.id}</div></div>
          <div class="line"><div>Account</div><div>${receipt.payment.account}</div></div>
          <div class="line"><div>Bill Ref</div><div>${receipt.payment.bill || "-"}</div></div>
          <div class="line"><div>Method</div><div>${receipt.payment.method}</div></div>
          <div class="line"><div>Amount</div><div>${formatCurrency(receipt.payment.amount)}</div></div>
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
    }
  };

  const remove = (p: OnlinePayment) => {
    const next = payments.filter((x) => x.id !== p.id);
    persist(next);
  };

  return (
    <CashierLayout>
      <div>
        <h1 className="text-3xl font-bold">Online Payments</h1>
        <p className="text-sm text-slate-500 mt-2">Payments submitted by consumers online. Accept and print receipts here.</p>

        <div className="mt-6 space-y-3">
          {payments.length === 0 && <div className="text-sm text-slate-400">No online payments.</div>}
          {payments.map((p) => (
            <div key={p.id} className="rounded-xl border border-slate-200 bg-white p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold">{p.account} • {p.bill || "(no ref)"}</p>
                <p className="text-sm text-slate-500">{new Date(p.createdAt).toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{formatCurrency(p.amount)}</p>
                <p className={`text-xs ${p.status === "accepted" ? "text-emerald-600" : "text-amber-600"}`}>{p.status}</p>
                <div className="mt-2 flex gap-2 justify-end">
                  {p.status === "pending" && (
                    <button onClick={() => accept(p)} className="rounded-lg bg-emerald-600 text-white px-3 py-1 text-sm">Accept</button>
                  )}
                  <button onClick={() => remove(p)} className="rounded-lg border border-slate-200 px-3 py-1 text-sm">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CashierLayout>
  );
};

export default OnlinePayments;

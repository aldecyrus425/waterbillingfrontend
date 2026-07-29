import React from "react";
import ConsumerLayout from "../../../components/layouts/ConsumerLayout";

const ConsumerPending: React.FC = () => {
  const pending = [
    { bill: "B-1204", date: "2026-06-01", due: "2026-07-15", amount: "₱650" },
    { bill: "B-1189", date: "2026-05-01", due: "2026-06-15", amount: "₱800" },
  ];

  return (
    <ConsumerLayout>
      <div>
        <div>
          <h1 className="text-3xl font-bold">Pending Bills</h1>
          <p className="text-sm text-slate-500 mt-2">Bills that are currently unpaid.</p>
        </div>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-3">
            {pending.map((p) => (
              <div key={p.bill} className="flex items-center justify-between rounded-xl border border-slate-100 p-3">
                <div>
                  <p className="text-sm font-medium">{p.bill} • {p.date}</p>
                  <p className="text-xs text-slate-500">Due: {p.due}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{p.amount}</p>
                  <a href="/consumer/pay" className="text-sm text-cyan-600">Pay</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ConsumerLayout>
  );
};

export default ConsumerPending;

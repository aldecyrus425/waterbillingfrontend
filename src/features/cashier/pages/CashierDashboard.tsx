import React from "react";
import CashierLayout from "../../../components/layouts/CashierLayout";

const CashierDashboard: React.FC = () => {
  const stats = [
    { label: "Payments Today", value: "$1,820", icon: "💵", note: "20 transactions" },
    { label: "Pending Bills", value: 28, icon: "⏳", note: "Awaiting payment" },
    { label: "Receipts Printed", value: 12, icon: "🧾", note: "Since morning" },
    { label: "Offline Queue", value: 0, icon: "📶", note: "Synced" },
  ];

  return (
    <CashierLayout>
      <div className="space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-emerald-600 font-semibold">Welcome back</p>
          <h1 className="text-4xl font-bold text-slate-900 mt-3">Cashier Dashboard</h1>
          <p className="text-gray-600 mt-2 max-w-2xl">Collect payments quickly and keep the front desk running smoothly.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <p className="text-3xl font-semibold text-slate-900 mt-3">{item.value}</p>
                </div>
                <div className="h-14 w-14 rounded-3xl bg-emerald-50 flex items-center justify-center text-2xl">{item.icon}</div>
              </div>
              <p className="mt-4 text-sm text-slate-500">{item.note}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Quick Cashiering</h2>
                <p className="text-sm text-slate-500 mt-2">Search a consumer and process payments fast.</p>
              </div>
              <div className="text-3xl">💳</div>
            </div>
            <div className="mt-6 grid gap-3">
              <a href="/cashier/cashiering" className="inline-block w-full rounded-2xl border border-slate-200 bg-emerald-50 px-4 py-3 text-center text-sm font-medium text-slate-900 transition hover:bg-emerald-100">Go to Cashiering</a>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Today's Queue</h2>
                <p className="text-sm text-slate-500 mt-2">Recent consumers waiting at the counter.</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">Live</span>
            </div>
            <div className="mt-6 space-y-4">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">👤</div>
                  <div>
                    <p className="font-semibold text-slate-900">Carlos Mendoza - 1024</p>
                    <p className="text-sm text-slate-500 mt-1">2 pending bills • ₱1,450</p>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">👤</div>
                  <div>
                    <p className="font-semibold text-slate-900">María Santos - 2048</p>
                    <p className="text-sm text-slate-500 mt-1">1 pending bill • ₱430</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </CashierLayout>
  );
};

export default CashierDashboard;

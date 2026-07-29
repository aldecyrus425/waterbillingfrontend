import React from "react";
import ConsumerLayout from "../../../components/layouts/ConsumerLayout";

const ConsumerDashboard: React.FC = () => {
  const accountInfo = { account: "1024", name: "Carlos Mendoza", balance: "₱1,450" };

  return (
    <ConsumerLayout>
      <div className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-600 font-semibold">Welcome</p>
          <h1 className="text-4xl font-bold text-slate-900 mt-3">Hello, {accountInfo.name}</h1>
          <p className="text-gray-600 mt-2 max-w-2xl">Overview of your account, bills, and recent payments.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Account</p>
            <p className="text-2xl font-semibold text-slate-900 mt-3">#{accountInfo.account}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Name</p>
            <p className="text-2xl font-semibold text-slate-900 mt-3">{accountInfo.name}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Total Due</p>
            <p className="text-2xl font-semibold text-slate-900 mt-3">{accountInfo.balance}</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <p className="text-sm text-slate-500 mt-2">Latest payments and bill notices.</p>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div>
                  <p className="text-sm font-medium">Payment • June 12, 2026</p>
                  <p className="text-xs text-slate-500">Payment reference: R-8833</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₱650</p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Pending Bills</h2>
            <p className="text-sm text-slate-500 mt-2">Unpaid bills awaiting settlement.</p>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3">
                <div>
                  <p className="text-sm font-medium">June 2026 • Bill #B-1204</p>
                  <p className="text-xs text-slate-500">Consumption: 28 m³</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₱650</p>
                  <a href="/consumer/pay" className="text-sm text-cyan-600">Pay now</a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </ConsumerLayout>
  );
};

export default ConsumerDashboard;

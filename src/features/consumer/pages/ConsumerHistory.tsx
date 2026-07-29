import React from "react";
import ConsumerLayout from "../../../components/layouts/ConsumerLayout";

const ConsumerHistory: React.FC = () => {
  const payments = [
    { date: "2026-06-12", ref: "R-8833", amount: "₱650" },
    { date: "2026-05-10", ref: "R-7710", amount: "₱800" },
  ];

  return (
    <ConsumerLayout>
      <div>
        <div>
          <h1 className="text-3xl font-bold">Payment History</h1>
          <p className="text-sm text-slate-500 mt-2">Records of your past payments.</p>
        </div>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm text-slate-500">
                <th className="py-3">Date</th>
                <th className="py-3">Reference</th>
                <th className="py-3">Amount</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.ref} className="border-t border-slate-100">
                  <td className="py-3 text-sm text-slate-700">{p.date}</td>
                  <td className="py-3 text-sm text-slate-700">{p.ref}</td>
                  <td className="py-3 text-sm text-slate-900 font-semibold">{p.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ConsumerLayout>
  );
};

export default ConsumerHistory;

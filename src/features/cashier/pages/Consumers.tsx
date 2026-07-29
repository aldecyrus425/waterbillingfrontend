import React, { useEffect, useState } from "react";
import CashierLayout from "../../../components/layouts/CashierLayout";

type Consumer = {
  accountId: string;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  status?: string;
};

const Consumers: React.FC = () => {
  const [consumers, setConsumers] = useState<Consumer[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("consumers");
    if (raw) {
      try {
        setConsumers(JSON.parse(raw));
        return;
      } catch (err) {
        // fallthrough to seed
      }
    }

    const demo: Consumer[] = [
      { accountId: "1024", name: "Carlos Mendoza", address: "123 Mabini St, City", phone: "09171234567", email: "carlos@example.com", status: "active" },
      { accountId: "2048", name: "María Santos", address: "45 Rizal Ave, City", phone: "09179876543", email: "maria@example.com", status: "active" },
      { accountId: "3072", name: "Ramon Lopez", address: "78 Bonifacio Blvd, City", phone: "09170001111", email: "ramon@example.com", status: "delinquent" },
    ];

    try {
      localStorage.setItem("consumers", JSON.stringify(demo));
    } catch (err) {}
    setConsumers(demo);
  }, []);

  return (
    <CashierLayout>
      <div>
        <h1 className="text-3xl font-bold">Consumers</h1>
        <p className="text-sm text-slate-500 mt-2">List of consumer accounts accessible to the cashier for quick lookup.</p>

        <div className="mt-6 space-y-3">
          {consumers.length === 0 && <div className="text-sm text-slate-400">No consumers found.</div>}
          {consumers.map((c) => (
            <div key={c.accountId} className="rounded-xl border border-slate-200 bg-white p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold">{c.name} • #{c.accountId}</p>
                <p className="text-sm text-slate-500">{c.address} • {c.phone}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm ${c.status === "active" ? "text-emerald-600" : "text-amber-600"}`}>{c.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CashierLayout>
  );
};

export default Consumers;

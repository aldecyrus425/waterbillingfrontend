import React, { useMemo, useState } from "react";
import AdminLayout from "../../../components/layouts/AdminLayout";

interface ReportEntry {
  id: string;
  name: string;
  period: string;
  generatedAt: string;
  status: "Ready" | "Processing" | "Scheduled";
  highlights: string;
}

const reports: ReportEntry[] = [
  {
    id: "r1",
    name: "Monthly Revenue Summary",
    period: "July 2026",
    generatedAt: "Jul 29, 2026",
    status: "Ready",
    highlights: "Revenue is up 8% and overdue balances are down 14%.",
  },
  {
    id: "r2",
    name: "Outstanding Balances",
    period: "Last 30 days",
    generatedAt: "Jul 28, 2026",
    status: "Ready",
    highlights: "Overdue accounts are concentrated in the east zone.",
  },
  {
    id: "r3",
    name: "Customer Growth Report",
    period: "Q3 2026",
    generatedAt: "Jul 24, 2026",
    status: "Processing",
    highlights: "New consumer accounts increased by 12%.",
  },
  {
    id: "r4",
    name: "Payment Trends",
    period: "Year to date",
    generatedAt: "Jul 26, 2026",
    status: "Scheduled",
    highlights: "Next report generates automatically on Aug 1.",
  },
];

const overviewMetrics = [
  { label: "Total revenue", value: "$134,480", subtext: "+8.2% this month" },
  { label: "Active invoices", value: "2,410", subtext: "17% more than last month" },
  { label: "Overdue amount", value: "$18,720", subtext: "Down 14%" },
  { label: "Collections rate", value: "94.3%", subtext: "Improved by 2.1 pts" },
];

const usageBars = [
  { label: "Jan", value: 28 },
  { label: "Feb", value: 35 },
  { label: "Mar", value: 42 },
  { label: "Apr", value: 49 },
  { label: "May", value: 53 },
  { label: "Jun", value: 61 },
  { label: "Jul", value: 68 },
];

const ReportsPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [period, setPeriod] = useState("This month");

  const filteredReports = useMemo(
    () =>
      reports.filter((report) => {
        const normalizedQuery = query.trim().toLowerCase();
        return (
          report.name.toLowerCase().includes(normalizedQuery) ||
          report.period.toLowerCase().includes(normalizedQuery) ||
          report.highlights.toLowerCase().includes(normalizedQuery)
        );
      }),
    [query]
  );

  const badgeStyle = (status: ReportEntry["status"]) => {
    switch (status) {
      case "Ready":
        return "bg-emerald-100 text-emerald-700";
      case "Processing":
        return "bg-sky-100 text-sky-700";
      case "Scheduled":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-4">
            <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Admin report</p>
                  <h1 className="mt-2 text-3xl font-semibold text-slate-900">Minimal report overview</h1>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                    Download CSV
                  </button>
                  <button className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                    Generate report
                  </button>
                </div>
              </div>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">
                A clean and focused financial snapshot for administrators, showing revenue, arrears, and reporting activity with simple controls.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {overviewMetrics.map((metric) => (
                <div key={metric.label} className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{metric.label}</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-900">{metric.value}</p>
                  <p className="mt-2 text-sm text-slate-500">{metric.subtext}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-[0.95fr_0.65fr]">
              <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">Revenue trend</h2>
                    <p className="mt-1 text-sm text-slate-500">Monthly billing totals for the current financial year.</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
                    Stable
                  </span>
                </div>

                <div className="mt-8 space-y-4">
                  {usageBars.map((bar) => (
                    <div key={bar.label} className="space-y-2">
                      <div className="flex items-center justify-between text-sm text-slate-600">
                        <span>{bar.label}</span>
                        <span>{bar.value}%</span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                        <div className="h-2.5 rounded-full bg-slate-950" style={{ width: `${bar.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900">Report highlights</h2>
                <div className="mt-6 space-y-4">
                  <div className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-900">Top insight</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">Collections efficiency improved by 12% compared to the previous quarter.</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-900">Focus area</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">Reduce overdue invoices in the east zone to maintain the collection score.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Filter</p>
                  <h2 className="mt-2 text-xl font-semibold text-slate-900">Quick access</h2>
                </div>
                <button className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                  Refresh
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Search reports</label>
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search by report name or note"
                    className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">Date range</label>
                  <select
                    value={period}
                    onChange={(event) => setPeriod(event.target.value)}
                    className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                  >
                    <option>This month</option>
                    <option>Last 30 days</option>
                    <option>Quarter</option>
                    <option>Year</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Summary</p>
                  <h2 className="mt-2 text-xl font-semibold text-slate-900">Report activity</h2>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {filteredReports.length} active
                </span>
              </div>

              <div className="mt-6 space-y-3">
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Latest ready report</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">Monthly Revenue Summary generated on Jul 29, 2026.</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">Processing</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">Customer Growth Report is being prepared for Q3.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Reports catalog</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Saved reports</h2>
            </div>
            <p className="text-sm text-slate-500">Filtered by&nbsp;<span className="font-semibold text-slate-900">{period}</span></p>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-700">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="px-4 py-3">Report</th>
                  <th className="px-4 py-3">Period</th>
                  <th className="px-4 py-3">Generated</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Note</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-4">
                      <p className="font-semibold text-slate-900">{report.name}</p>
                    </td>
                    <td className="px-4 py-4 text-slate-600">{report.period}</td>
                    <td className="px-4 py-4 text-slate-600">{report.generatedAt}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badgeStyle(report.status)}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-600">{report.highlights}</td>
                    <td className="px-4 py-4 text-right">
                      <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-900 transition hover:bg-slate-50">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ReportsPage;

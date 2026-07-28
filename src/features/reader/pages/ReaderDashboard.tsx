import React from "react";
import ReaderLayout from "../../../components/layouts/ReaderLayout";

const ReaderDashboard: React.FC = () => {
  const stats = [
    { label: "Readings Today", value: 36, icon: "📥", note: "+8 from yesterday" },
    { label: "Pending Readings", value: 12, icon: "⏳", note: "Due before end of day" },
    { label: "Completed Routes", value: 4, icon: "🗺️", note: "2 remaining" },
    { label: "Average Consumption", value: "138 m³", icon: "💧", note: "Stable compared to last week" },
  ];

  const recentTasks = [
    { description: "Submitted reading for meter 145672", time: "30 minutes ago", icon: "✅" },
    { description: "Logged new meter serial 320559", time: "1 hour ago", icon: "📝" },
    { description: "Updated customer notes for meter 289451", time: "3 hours ago", icon: "🛠️" },
  ];

  return (
    <ReaderLayout>
      <div className="space-y-8">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-600 font-semibold">Welcome back</p>
          <h1 className="text-4xl font-bold text-slate-900 mt-3">Meter Reader Dashboard</h1>
          <p className="text-gray-600 mt-2 max-w-2xl">
            Use the dashboard to manage your reading routes, submit current meter values, and keep customer records up to date.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <p className="text-3xl font-semibold text-slate-900 mt-3">{item.value}</p>
                </div>
                <div className="h-14 w-14 rounded-3xl bg-cyan-50 flex items-center justify-center text-2xl">
                  {item.icon}
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-500">{item.note}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Quick Actions</h2>
                <p className="text-sm text-slate-500 mt-2">Start a new reading route, review pending meters, or export your reading summary.</p>
              </div>
              <div className="text-3xl">⚡</div>
            </div>
            <div className="mt-6 grid gap-3">
              <button className="w-full rounded-2xl border border-slate-200 bg-cyan-50 px-4 py-3 text-left text-sm font-medium text-slate-900 transition hover:bg-cyan-100">
                📍 Start next reading route
              </button>
              <button className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-900 transition hover:bg-slate-100">
                📋 Review pending meter assignments
              </button>
              <button className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-900 transition hover:bg-slate-100">
                📥 Submit current readings
              </button>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Recent Activity</h2>
                <p className="text-sm text-slate-500 mt-2">Your most recent reading events and route updates.</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">Live</span>
            </div>
            <div className="mt-6 space-y-4">
              {recentTasks.map((task) => (
                <div key={task.description} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">{task.icon}</div>
                    <div>
                      <p className="font-semibold text-slate-900">{task.description}</p>
                      <p className="text-sm text-slate-500 mt-1">{task.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </ReaderLayout>
  );
};

export default ReaderDashboard;

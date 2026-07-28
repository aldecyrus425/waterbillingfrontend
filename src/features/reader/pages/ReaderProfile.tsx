import React, { useState } from "react";
import ReaderLayout from "../../../components/layouts/ReaderLayout";
import { useAuth } from "../../../contexts/useAuth";

const ReaderProfile: React.FC = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors: Record<string, string> = {};

    if (!name.trim()) {
      validationErrors.name = "Name is required.";
    }

    if (!email.trim()) {
      validationErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validationErrors.email = "Enter a valid email address.";
    }

    if (password && password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(validationErrors);
    setSaved(false);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSaved(true);
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <ReaderLayout>
      <div className="space-y-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-600 font-semibold">Profile</p>
              <h1 className="text-4xl font-bold text-slate-900 mt-3">Your account settings</h1>
              <p className="text-slate-500 mt-2 max-w-2xl">Update your profile details and change login credentials securely.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">Role</p>
              <p className="mt-2">{user?.role === "reader" ? "Meter Reader" : "User"}</p>
            </div>
          </div>

          {saved && (
            <div className="mt-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
              Your profile settings have been saved successfully.
            </div>
          )}

          <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
            <form onSubmit={handleSave} className="space-y-6 rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  type="text"
                  className={`w-full rounded-3xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition ${
                    errors.name ? "border-red-300 bg-red-50" : "border-slate-200 bg-white"
                  }`}
                />
                {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  className={`w-full rounded-3xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition ${
                    errors.email ? "border-red-300 bg-red-50" : "border-slate-200 bg-white"
                  }`}
                />
                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">New Password</label>
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  placeholder="Leave blank to keep current password"
                  className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Confirm Password</label>
                <input
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  type="password"
                  placeholder="Repeat new password"
                  className={`w-full rounded-3xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition ${
                    errors.confirmPassword ? "border-red-300 bg-red-50" : "border-slate-200 bg-white"
                  }`}
                />
                {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>

              <button type="submit" className="rounded-3xl bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700">
                Save Settings
              </button>
            </form>

            <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Profile overview</h2>
              <dl className="mt-6 grid gap-4 text-sm text-slate-600">
                <div className="rounded-3xl bg-slate-50 p-4">
                  <dt className="font-semibold text-slate-900">Name</dt>
                  <dd className="mt-2">{user?.name}</dd>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4">
                  <dt className="font-semibold text-slate-900">Email</dt>
                  <dd className="mt-2">{user?.email}</dd>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4">
                  <dt className="font-semibold text-slate-900">Role</dt>
                  <dd className="mt-2">Meter Reader</dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>
      </div>
    </ReaderLayout>
  );
};

export default ReaderProfile;

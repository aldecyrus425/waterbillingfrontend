import React, { useState } from "react";
import ReaderLayout from "../../../components/layouts/ReaderLayout";

const ReaderReading: React.FC = () => {
  const [meterReference, setMeterReference] = useState("");
  const [currentReading, setCurrentReading] = useState("");
  const [readingDate, setReadingDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors: Record<string, string> = {};

    if (!meterReference.trim()) {
      validationErrors.meterReference = "Meter number or serial is required.";
    }

    if (!currentReading.trim()) {
      validationErrors.currentReading = "Current reading is required.";
    } else if (!/^[0-9]+(?:\.[0-9]+)?$/.test(currentReading)) {
      validationErrors.currentReading = "Please enter a valid numeric reading.";
    }

    setErrors(validationErrors);
    setSuccessMessage("");

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSuccessMessage(
      `Meter ${meterReference} recorded with a reading of ${currentReading} m³ on ${readingDate}.`,
    );
    setMeterReference("");
    setCurrentReading("");
    setNotes("");
    setErrors({});
  };

  return (
    <ReaderLayout>
      <div className="space-y-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-600 font-semibold">Meter Reading</p>
              <h1 className="text-3xl font-bold text-slate-900 mt-3">Submit Your Current Reading</h1>
              <p className="text-slate-500 mt-2 max-w-2xl">
                Enter the meter number or serial and the current reading to keep the billing records accurate.
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">Quick tip</p>
              <p className="mt-2 text-slate-600">Verify the serial number and fill the current reading with the most recent meter value.</p>
            </div>
          </div>

          {successMessage && (
            <div className="mt-6 rounded-3xl border border-green-200 bg-emerald-50 p-4 text-sm text-emerald-700">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Meter Number or Serial</label>
                <input
                  value={meterReference}
                  onChange={(event) => setMeterReference(event.target.value)}
                  type="text"
                  placeholder="e.g. 145672 or S-320559"
                  className={`w-full rounded-3xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition ${
                    errors.meterReference ? "border-red-300 bg-red-50" : "border-slate-200 bg-white"
                  }`}
                />
                {errors.meterReference && <p className="mt-2 text-sm text-red-600">{errors.meterReference}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Current Reading (m³)</label>
                <input
                  value={currentReading}
                  onChange={(event) => setCurrentReading(event.target.value)}
                  type="text"
                  placeholder="e.g. 3785"
                  className={`w-full rounded-3xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition ${
                    errors.currentReading ? "border-red-300 bg-red-50" : "border-slate-200 bg-white"
                  }`}
                />
                {errors.currentReading && <p className="mt-2 text-sm text-red-600">{errors.currentReading}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Reading Date</label>
                <input
                  value={readingDate}
                  onChange={(event) => setReadingDate(event.target.value)}
                  type="date"
                  className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                />
              </div>

              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Notes / Comments</label>
                <textarea
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  rows={4}
                  placeholder="Add any observations or customer notes here"
                  className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                />
              </div>

              <div className="lg:col-span-2">
                <button type="submit" className="rounded-3xl bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700">
                  Submit Reading
                </button>
              </div>
            </div>

            <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Reading Summary</h2>
              <p className="text-sm text-slate-600 mt-3">Keep track of the most recent submitted meter values and quickly catch any anomalies before sending bills.</p>
              <ul className="mt-6 space-y-4 text-sm text-slate-700">
                <li className="rounded-2xl bg-white p-4 border border-slate-200">
                  <p className="font-semibold">Always verify the meter serial</p>
                  <p className="text-slate-500 mt-1">Use the serial number printed on the meter to avoid recording the wrong account.</p>
                </li>
                <li className="rounded-2xl bg-white p-4 border border-slate-200">
                  <p className="font-semibold">Use the latest reading</p>
                  <p className="text-slate-500 mt-1">Enter the most current value displayed on the meter before leaving the site.</p>
                </li>
              </ul>
            </aside>
          </form>
        </section>
      </div>
    </ReaderLayout>
  );
};

export default ReaderReading;

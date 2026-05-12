import React from "react";
import Layout from "../components/Layout";
import { useTransactions } from "../store/transactions-context";
import { formatCurrency } from "../lib/format";

const monthLabel = (value) => {
  if (!value) return "";
  const [year, month] = value.split("-");
  return `${month}/${year}`;
};

export default function Reports() {
  const { state } = useTransactions();

  const summary = state.items.reduce(
    (acc, item) => {
      if (item.type === "income") acc.income += item.amount;
      if (item.type === "expense") acc.expense += item.amount;

      const monthKey = item.date ? item.date.slice(0, 7) : "Unknown";
      acc.byMonth[monthKey] = acc.byMonth[monthKey] || {
        income: 0,
        expense: 0,
      };
      acc.byMonth[monthKey][item.type] += item.amount;

      return acc;
    },
    { income: 0, expense: 0, byMonth: {} },
  );

  const months = Object.entries(summary.byMonth).sort((a, b) =>
    a[0] < b[0] ? 1 : -1,
  );

  return (
    <Layout
      title="Laporan Ringkas"
      subtitle="Lihat tren pemasukan dan pengeluaran untuk evaluasi cashflow."
    >
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-black/10 bg-[var(--card)] p-6">
          <h2 className="text-lg font-semibold">Ringkasan total</h2>
          <p className="mt-3 text-sm text-[var(--muted)]">Masuk</p>
          <p className="text-2xl font-semibold text-[var(--accent-2)]">
            {formatCurrency(summary.income)}
          </p>
          <p className="mt-4 text-sm text-[var(--muted)]">Keluar</p>
          <p className="text-2xl font-semibold text-[var(--accent)]">
            {formatCurrency(summary.expense)}
          </p>
        </div>

        <div className="rounded-3xl border border-black/10 bg-white/70 p-6">
          <h2 className="text-lg font-semibold">Saldo bersih</h2>
          <p className="mt-4 text-3xl font-semibold">
            {formatCurrency(summary.income - summary.expense)}
          </p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Fokus menjaga pengeluaran tetap stabil.
          </p>
        </div>
      </section>

      <section className="grid gap-4 rounded-3xl border border-black/10 bg-white/80 p-6">
        <h2 className="text-xl font-semibold">Per bulan</h2>
        {months.length === 0 && (
          <p className="text-sm text-[var(--muted)]">
            Belum ada data laporan.
          </p>
        )}
        <div className="grid gap-3">
          {months.map(([month, totals]) => (
            <div
              key={month}
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-black/10 bg-[var(--card)] px-4 py-3"
            >
              <p className="text-sm font-semibold">{monthLabel(month)}</p>
              <div className="flex flex-wrap gap-6 text-sm">
                <span className="text-[var(--accent-2)]">
                  + {formatCurrency(totals.income)}
                </span>
                <span className="text-[var(--accent)]">
                  - {formatCurrency(totals.expense)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

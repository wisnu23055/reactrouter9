import React from "react";
import Layout from "../components/Layout";
import { useTransactions } from "../store/transactions-context";
import { formatCurrency } from "../lib/format";

export default function Dashboard() {
  const { state } = useTransactions();

  const summary = state.items.reduce(
    (acc, item) => {
      if (item.type === "income") {
        acc.income += item.amount;
      } else {
        acc.expense += item.amount;
      }
      return acc;
    },
    { income: 0, expense: 0 },
  );

  const balance = summary.income - summary.expense;
  const recent = state.items.slice(0, 3);

  return (
    <Layout
      title="Dashboard Cashflow"
      subtitle="Pantau saldo harian, total masuk, dan total keluar dalam sekali lihat."
    >
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-black/10 bg-[var(--card)] p-5">
          <p className="text-sm text-[var(--muted)]">Saldo bersih</p>
          <p className="mt-2 text-2xl font-semibold">
            {formatCurrency(balance)}
          </p>
        </div>
        <div className="rounded-3xl border border-black/10 bg-white/80 p-5">
          <p className="text-sm text-[var(--muted)]">Total masuk</p>
          <p className="mt-2 text-2xl font-semibold text-[var(--accent-2)]">
            {formatCurrency(summary.income)}
          </p>
        </div>
        <div className="rounded-3xl border border-black/10 bg-white/80 p-5">
          <p className="text-sm text-[var(--muted)]">Total keluar</p>
          <p className="mt-2 text-2xl font-semibold text-[var(--accent)]">
            {formatCurrency(summary.expense)}
          </p>
        </div>
      </section>

      <section className="grid gap-4 rounded-3xl border border-black/10 bg-white/70 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Aktivitas terbaru</h2>
          <span className="text-sm text-[var(--muted)]">
            {state.items.length} transaksi
          </span>
        </div>

        {recent.length === 0 && (
          <p className="text-sm text-[var(--muted)]">
            Belum ada transaksi. Mulai dari menu Transaksi.
          </p>
        )}

        <div className="grid gap-3">
          {recent.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-2xl border border-black/10 bg-[var(--card)] px-4 py-3"
            >
              <div>
                <p className="text-sm text-[var(--muted)]">{item.date}</p>
                <p className="font-semibold">{item.title}</p>
              </div>
              <p
                className={
                  item.type === "income"
                    ? "text-sm font-semibold text-[var(--accent-2)]"
                    : "text-sm font-semibold text-[var(--accent)]"
                }
              >
                {item.type === "income" ? "+" : "-"} {formatCurrency(item.amount)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

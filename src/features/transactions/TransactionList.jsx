import React from "react";
import { Link } from "react-router";
import Layout from "../../components/Layout";
import { useTransactions } from "../../store/transactions-context";
import { formatCurrency } from "../../lib/format";
import TransactionForm from "./TransactionForm";

const createId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : String(Date.now());

export default function TransactionList() {
  const { state, dispatch } = useTransactions();

  const handleCreate = (payload) => {
    dispatch({
      type: "add",
      payload: { ...payload, id: createId() },
    });
  };

  return (
    <Layout
      title="Transaksi Harian"
      subtitle="Catat semua uang masuk dan keluar, lalu klik detail untuk melihat rincian lengkap."
    >
      <TransactionForm onCreate={handleCreate} />

      <section className="grid gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Daftar transaksi</h2>
          <span className="text-sm text-[var(--muted)]">
            {state.items.length} item
          </span>
        </div>

        <div className="grid gap-3">
          {state.items.length === 0 && (
            <div className="rounded-3xl border border-dashed border-black/20 bg-white/60 p-6 text-sm text-[var(--muted)]">
              Belum ada transaksi. Tambahkan data pertama kamu.
            </div>
          )}

          {state.items.map((item) => (
            <article
              key={item.id}
              className="fade-up flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-black/10 bg-[var(--card)] px-5 py-4"
            >
              <div>
                <p className="text-sm text-[var(--muted)]">{item.date}</p>
                <Link
                  to={`/transactions/${item.id}`}
                  className="text-lg font-semibold hover:underline"
                >
                  {item.title}
                </Link>
                {item.note && (
                  <p className="text-xs text-[var(--muted)]">{item.note}</p>
                )}
              </div>
              <div className="text-right">
                <p
                  className={
                    item.type === "income"
                      ? "text-sm font-semibold text-[var(--accent-2)]"
                      : "text-sm font-semibold text-[var(--accent)]"
                  }
                >
                  {item.type === "income" ? "+" : "-"} {formatCurrency(item.amount)}
                </p>
                <p className="text-xs text-[var(--muted)]">
                  {item.type === "income" ? "Masuk" : "Keluar"}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}

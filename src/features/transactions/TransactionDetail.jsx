import React from "react";
import { Link, useNavigate, useParams } from "react-router";
import Layout from "../../components/Layout";
import { useTransactions } from "../../store/transactions-context";
import { formatCurrency } from "../../lib/format";

export default function TransactionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useTransactions();

  const data = state.items.find((item) => item.id === id);

  if (!data) {
    return (
      <Layout
        title="Transaksi tidak ditemukan"
        subtitle="Pastikan ID transaksi benar atau kembali ke daftar transaksi."
      >
        <Link
          to="/transactions"
          className="rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm"
        >
          Kembali ke transaksi
        </Link>
      </Layout>
    );
  }

  const handleDelete = () => {
    dispatch({ type: "remove", id: data.id });
    navigate("/transactions");
  };

  return (
    <Layout
      title="Detail Transaksi"
      subtitle="Lihat detail uang masuk dan keluar secara lengkap."
    >
      <section className="grid gap-6 rounded-3xl border border-black/10 bg-[var(--card)] p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-[var(--muted)]">{data.date}</p>
            <h2 className="text-2xl font-semibold">{data.title}</h2>
            {data.note && (
              <p className="mt-2 text-sm text-[var(--muted)]">{data.note}</p>
            )}
          </div>
          <div className="text-right">
            <p
              className={
                data.type === "income"
                  ? "text-lg font-semibold text-[var(--accent-2)]"
                  : "text-lg font-semibold text-[var(--accent)]"
              }
            >
              {data.type === "income" ? "+" : "-"} {formatCurrency(data.amount)}
            </p>
            <p className="text-xs text-[var(--muted)]">
              {data.type === "income" ? "Uang Masuk" : "Uang Keluar"}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/transactions"
            className="rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm"
          >
            Kembali
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm text-white"
          >
            Hapus
          </button>
        </div>
      </section>
    </Layout>
  );
}

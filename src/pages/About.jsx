import React from "react";
import Layout from "../components/Layout";

export default function About() {
  return (
    <Layout
      title="Tentang Aplikasi"
      subtitle="Aplikasi ini membantu mencatat uang masuk dan keluar secara cepat agar kondisi cashflow selalu terlihat jelas."
    >
      <section className="grid gap-4 rounded-3xl border border-black/10 bg-[var(--card)] p-6 text-sm text-[var(--muted)]">
        <p>
          Ruang Uang Harian dibuat untuk mencatat transaksi harian tanpa ribet.
          Kamu bisa menambahkan pemasukan, pengeluaran, lalu memantau saldo
          bersih dan laporan singkat per bulan.
        </p>
        <p>
          Fitur utama: input transaksi, detail transaksi dinamis, ringkasan
          saldo, dan laporan kas sederhana untuk evaluasi pengeluaran.
        </p>
      </section>
    </Layout>
  );
}

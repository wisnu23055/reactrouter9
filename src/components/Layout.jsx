import React from "react";
import { Link, NavLink } from "react-router";

const navItem = ({ isActive }) =>
  [
    "rounded-full px-3 py-1 text-sm transition",
    isActive
      ? "bg-[var(--ink)] text-[var(--card)]"
      : "text-[var(--muted)] hover:text-[var(--ink)]",
  ].join(" ");

export default function Layout({ title, subtitle, children }) {
  return (
    <div className="min-h-svh">
      <header className="bg-grid border-b border-black/10">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-5">
          <Link to="/" className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-2xl bg-[var(--accent)] text-white">
              Rp
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                Cashflow Log
              </p>
              <p className="text-lg font-semibold">Ruang Uang Harian</p>
            </div>
          </Link>
          <nav className="flex flex-wrap items-center gap-2 rounded-full border border-black/10 bg-white/70 px-2 py-1 backdrop-blur">
            <NavLink to="/" className={navItem} end>
              Dashboard
            </NavLink>
            <NavLink to="/transactions" className={navItem}>
              Transaksi
            </NavLink>
            <NavLink to="/reports" className={navItem}>
              Laporan
            </NavLink>
            <NavLink to="/about" className={navItem}>
              Tentang
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-10">
        {(title || subtitle) && (
          <section className="fade-up rounded-3xl border border-black/10 bg-[var(--card)] p-6 shadow-[0_20px_40px_rgba(18,17,18,0.12)]">
            <h1 className="text-3xl font-semibold text-[var(--ink)]">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 max-w-2xl text-[var(--muted)]">{subtitle}</p>
            )}
          </section>
        )}
        {children}
      </main>

      <footer className="mx-auto w-full max-w-5xl px-6 pb-10 text-sm text-[var(--muted)]">
        Dibuat untuk pencatatan uang masuk dan keluar secara ringkas.
      </footer>
    </div>
  );
}

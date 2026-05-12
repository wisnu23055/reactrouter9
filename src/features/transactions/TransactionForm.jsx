import React, { useState } from "react";
import { CreateTransactionSchema } from "./schema";

const emptyErrors = { title: "", amount: "", date: "", note: "" };

export default function TransactionForm({ onCreate }) {
  const [errors, setErrors] = useState(emptyErrors);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(emptyErrors);

    const form = new FormData(event.target);
    const payload = {
      type: form.get("type"),
      title: String(form.get("title") || "").trim(),
      amount: Number(form.get("amount")),
      date: String(form.get("date") || ""),
      note: String(form.get("note") || "").trim(),
    };

    const parsed = CreateTransactionSchema.safeParse(payload);
    if (!parsed.success) {
      const nextErrors = { ...emptyErrors };
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0];
        if (typeof key === "string" && nextErrors[key] !== undefined) {
          nextErrors[key] = issue.message;
        }
      });
      setErrors(nextErrors);
      return;
    }

    onCreate(parsed.data);
    event.target.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-3xl border border-black/10 bg-white/80 p-6 shadow-[0_15px_30px_rgba(18,17,18,0.08)]"
    >
      <div className="flex flex-wrap gap-3">
        <label className="flex flex-1 flex-col gap-2 text-sm">
          Jenis
          <select
            name="type"
            className="rounded-2xl border border-black/10 bg-white px-3 py-2"
          >
            <option value="income">Uang Masuk</option>
            <option value="expense">Uang Keluar</option>
          </select>
        </label>
        <label className="flex flex-1 flex-col gap-2 text-sm">
          Tanggal
          <input
            name="date"
            type="date"
            className="rounded-2xl border border-black/10 bg-white px-3 py-2"
          />
          {errors.date && (
            <span className="text-xs text-red-600">{errors.date}</span>
          )}
        </label>
      </div>

      <label className="flex flex-col gap-2 text-sm">
        Judul transaksi
        <input
          name="title"
          placeholder="Contoh: Gaji mingguan"
          className="rounded-2xl border border-black/10 bg-white px-3 py-2"
        />
        {errors.title && (
          <span className="text-xs text-red-600">{errors.title}</span>
        )}
      </label>

      <label className="flex flex-col gap-2 text-sm">
        Nominal
        <input
          name="amount"
          type="number"
          min="0"
          placeholder="250000"
          className="rounded-2xl border border-black/10 bg-white px-3 py-2"
        />
        {errors.amount && (
          <span className="text-xs text-red-600">{errors.amount}</span>
        )}
      </label>

      <label className="flex flex-col gap-2 text-sm">
        Catatan (opsional)
        <input
          name="note"
          placeholder="Misal: transfer bank"
          className="rounded-2xl border border-black/10 bg-white px-3 py-2"
        />
        {errors.note && (
          <span className="text-xs text-red-600">{errors.note}</span>
        )}
      </label>

      <button
        type="submit"
        className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(216,88,47,0.3)] transition hover:-translate-y-0.5"
      >
        Simpan Transaksi
      </button>
    </form>
  );
}

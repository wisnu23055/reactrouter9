import { z } from "zod";

export const TransactionSchema = z.object({
  id: z.string().min(1),
  type: z.enum(["income", "expense"]),
  title: z.string().min(1, "Judul wajib diisi"),
  amount: z.number().positive("Jumlah harus lebih dari 0"),
  date: z.string().min(1, "Tanggal wajib diisi"),
  note: z.string().max(120, "Catatan terlalu panjang").optional().or(z.literal("")),
});

export const CreateTransactionSchema = TransactionSchema.omit({ id: true });

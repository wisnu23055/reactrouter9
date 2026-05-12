const STORAGE_KEY = "cashflow-transactions-v1";

export const readTransactions = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveTransactions = (items) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

import { createBrowserRouter } from "react-router";
import Dashboard from "../pages/Dashboard";
import TransactionList from "../features/transactions/TransactionList";
import TransactionDetail from "../features/transactions/TransactionDetail";
import Reports from "../pages/Reports";
import About from "../pages/About";

export const router = createBrowserRouter([
  { path: "/", element: <Dashboard /> },
  { path: "/transactions", element: <TransactionList /> },
  { path: "/transactions/:id", element: <TransactionDetail /> },
  { path: "/reports", element: <Reports /> },
  { path: "/about", element: <About /> },
]);

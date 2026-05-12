import React, { createContext, useContext, useEffect, useReducer } from "react";
import { readTransactions, saveTransactions } from "../lib/storage";

const TransactionsContext = createContext(null);

const initialState = {
  items: readTransactions(),
};

function reducer(state, action) {
  switch (action.type) {
    case "load":
      return { ...state, items: action.payload };
    case "add":
      return { ...state, items: [action.payload, ...state.items] };
    case "remove":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.id),
      };
    default:
      return state;
  }
}

export function TransactionsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    saveTransactions(state.items);
  }, [state.items]);

  return (
    <TransactionsContext.Provider value={{ state, dispatch }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error("useTransactions must be used inside TransactionsProvider");
  }
  return context;
}

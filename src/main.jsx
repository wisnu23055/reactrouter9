import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import './index.css'
import { router } from './app/router'
import { TransactionsProvider } from './store/transactions-context'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TransactionsProvider>
      <RouterProvider router={router} />
    </TransactionsProvider>
  </StrictMode>,
)

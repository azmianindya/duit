import { createContext, useContext } from 'react'
import type { PurchasedItem, Transaction } from '../../lib/types'

interface TransactionsContextValue {
  transactions: Transaction[]
  saveItems: (id: string, items: PurchasedItem[]) => void
  addTransactions: (created: Transaction[]) => void
}

export const TransactionsContext = createContext<TransactionsContextValue | null>(null)

// Mengambil daftar transaksi dan fungsi pengubahnya. Hanya bisa dipakai di dalam TransactionsProvider.
export const useTransactions = (): TransactionsContextValue => {
  const value = useContext(TransactionsContext)

  if (!value) {
    throw new Error('useTransactions harus dipakai di dalam TransactionsProvider')
  }

  return value
}
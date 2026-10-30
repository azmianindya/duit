import { useState } from 'react'
import type { ReactNode } from 'react'
import { transactions as initialTransactions } from '../../lib/data'
import type { PurchasedItem, Transaction } from '../../lib/types'
import { TransactionsContext } from './context'

interface TransactionsProviderProps {
  children: ReactNode
}

const TransactionsProvider = ({ children }: TransactionsProviderProps) => {
  // Daftar transaksi disimpan di sini supaya semua halaman memakai data yang sama
  const [transactions, setTransactions] = useState(initialTransactions)

  // Menyimpan rincian barang. Status jadi done kalau total rincian sama dengan nominal transaksi.
  const saveItems = (id: string, items: PurchasedItem[]) => {
    const itemsTotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0)

    setTransactions((current) =>
      current.map((transaction) =>
        transaction.id === id
          ? {
              ...transaction,
              items,
              status: itemsTotal === transaction.amount ? 'done' : 'needs-detail',
            }
          : transaction
      )
    )
  }

  // Menambah satu atau beberapa transaksi baru di urutan paling atas
  const addTransactions = (created: Transaction[]) => {
    setTransactions((current) => [...created, ...current])
  }

  return (
    <TransactionsContext.Provider value={{ transactions, saveItems, addTransactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export default TransactionsProvider
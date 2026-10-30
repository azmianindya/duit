export type AccountType = 'bank' | 'e-wallet' | 'cash'

export interface Account {
  id: string
  name: string
  type: AccountType
  balance: number
}

export interface Summary {
  weeklyChange: number
  income: number
  expense: number
}

// Total pengeluaran satu kategori, color dipakai untuk grafik donut
export interface CategorySpending {
  id: string
  name: string
  amount: number
  color: string
}

// Satu titik saldo pada grafik perkembangan saldo
export interface BalancePoint {
  label: string
  balance: number
}

// Data laporan untuk satu bulan. month berformat "2026-10", label berformat "Oktober 2026"
export interface MonthlyReport {
  month: string
  label: string
  income: number
  expense: number
  categories: CategorySpending[]
  balanceHistory: BalancePoint[]
}

// Jenis transaksi: pemasukan, pengeluaran, atau transfer antar akun sendiri
export type TransactionType = 'income' | 'expense' | 'transfer'

// Status transaksi: done = lengkap, needs-detail = rincian barang belum sesuai nominal
export type TransactionStatus = 'done' | 'needs-detail'

// Pilihan tab filter di halaman Transaksi
export type TransactionFilter = 'all' | TransactionType

// Satu barang dalam rincian belanja. Total barang = quantity * price
export interface PurchasedItem {
  id: string
  name: string
  quantity: number
  price: number
}

// amount selalu positif, tanda + atau - ditentukan dari type. date berformat "2026-10-29".
// toAccount hanya terisi untuk transfer: akun tujuan, sedangkan account adalah akun asal.
export interface Transaction {
  id: string
  title: string
  type: TransactionType
  category: string
  account: string
  toAccount?: string
  amount: number
  date: string
  status: TransactionStatus
  items: PurchasedItem[]
}
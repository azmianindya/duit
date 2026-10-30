import {
  FiCoffee,
  FiCreditCard,
  FiFilm,
  FiNavigation,
  FiRepeat,
  FiShoppingBag,
  FiTag,
  FiTrendingUp,
  FiZap,
} from 'react-icons/fi'
import type { IconType } from 'react-icons'
import type { TransactionFilter, TransactionType } from '../../lib/types'

// Tab filter di bagian atas halaman Transaksi
export const filterTabs: { label: string; value: TransactionFilter }[] = [
  { label: 'Semua', value: 'all' },
  { label: 'Pemasukan', value: 'income' },
  { label: 'Pengeluaran', value: 'expense' },
  { label: 'Transfer', value: 'transfer' },
]

// Ikon dan warna latar untuk setiap kategori transaksi
export const categoryStyles: Record<string, { icon: IconType; color: string }> = {
  'Makan & Minum': { icon: FiCoffee, color: 'bg-emerald-100 text-emerald-700' },
  Transportasi: { icon: FiNavigation, color: 'bg-violet-100 text-violet-700' },
  Belanja: { icon: FiShoppingBag, color: 'bg-sky-100 text-sky-700' },
  Hiburan: { icon: FiFilm, color: 'bg-rose-100 text-rose-600' },
  Kebutuhan: { icon: FiZap, color: 'bg-amber-100 text-amber-700' },
  'Biaya admin': { icon: FiCreditCard, color: 'bg-red-100 text-red-600' },
  Transfer: { icon: FiRepeat, color: 'bg-blue-100 text-blue-700' },
  Gaji: { icon: FiTrendingUp, color: 'bg-emerald-100 text-emerald-700' },
}

// Gaya cadangan untuk kategori yang belum terdaftar di categoryStyles
export const defaultStyle = { icon: FiTag, color: 'bg-gray-100 text-gray-600' }

// Tanda di depan nominal: pemasukan +, pengeluaran -, transfer tanpa tanda
export const amountSign: Record<TransactionType, string> = {
  income: '+',
  expense: '-',
  transfer: '',
}

// Warna teks nominal berdasarkan jenis transaksi
export const amountColor: Record<TransactionType, string> = {
  income: 'text-emerald-700',
  expense: 'text-red-600',
  transfer: 'text-gray-700',
}
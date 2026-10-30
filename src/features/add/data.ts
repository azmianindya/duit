import type { TransactionType } from '../../lib/types'

// Tab jenis transaksi di bagian atas halaman Tambah
export const addTabs: { label: string; value: TransactionType }[] = [
  { label: 'Pemasukan', value: 'income' },
  { label: 'Pengeluaran', value: 'expense' },
  { label: 'Transfer', value: 'transfer' },
]

// Pilihan kategori untuk pengeluaran
export const expenseCategories: string[] = [
  'Makan & Minum',
  'Transportasi',
  'Belanja',
  'Hiburan',
  'Kebutuhan',
  'Kesehatan',
  'Pendidikan',
  'Lainnya',
]

// Pilihan kategori untuk pemasukan
export const incomeCategories: string[] = ['Gaji', 'Bonus', 'Hadiah', 'Lainnya']

// Tanggal hari ini berformat "2026-10-30", sesuai zona waktu lokal, untuk nilai awal kolom tanggal
export const getToday = (): string => {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')

  return `${now.getFullYear()}-${month}-${day}`
}
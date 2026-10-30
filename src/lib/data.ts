import { FiBarChart2, FiHome, FiList, FiPlus, FiSettings } from 'react-icons/fi'
import type { IconType } from 'react-icons'
import type {
  Account,
  CategorySpending,
  MonthlyReport,
  Summary,
  Transaction,
} from './types'

interface NavItem {
  path: string
  label: string
  icon: IconType
  isAdd?: boolean
}

// Daftar 5 tab navigasi bawah. Tab tengah (Add) tampil sebagai tombol bulat.
export const navItems: NavItem[] = [
  { path: '/', label: 'Beranda', icon: FiHome },
  { path: '/transactions', label: 'Transaksi', icon: FiList },
  { path: '/add', label: 'Tambah', icon: FiPlus, isAdd: true },
  { path: '/reports', label: 'Laporan', icon: FiBarChart2 },
  { path: '/settings', label: 'Pengaturan', icon: FiSettings },
]

// Data dummy akun. Nanti diganti data dari Supabase.
export const accounts: Account[] = [
  { id: '1', name: 'BCA', type: 'bank', balance: 2850000 },
  { id: '2', name: 'Mandiri', type: 'bank', balance: 1780000 },
  { id: '3', name: 'DANA', type: 'e-wallet', balance: 1250000 },
  { id: '4', name: 'OVO', type: 'e-wallet', balance: 750000 },
  { id: '5', name: 'GoPay', type: 'e-wallet', balance: 600000 },
  { id: '6', name: 'Cash', type: 'cash', balance: 900000 },
]

// Data dummy ringkasan untuk Beranda: perubahan saldo 7 hari terakhir, pemasukan, dan pengeluaran bulan ini.
export const summary: Summary = {
  weeklyChange: 500000,
  income: 5200000,
  expense: 3450000,
}

// Nama dan warna kategori, urutannya sama dengan urutan jumlah di buildCategories
const categoryTemplate = [
  { id: '1', name: 'Makan & Minum', color: '#059669' },
  { id: '2', name: 'Transportasi', color: '#a78bfa' },
  { id: '3', name: 'Belanja', color: '#38bdf8' },
  { id: '4', name: 'Hiburan', color: '#fb7185' },
  { id: '5', name: 'Kebutuhan', color: '#fbbf24' },
  { id: '6', name: 'Lainnya', color: '#9ca3af' },
]

// Membuat daftar kategori dari 6 jumlah pengeluaran, sesuai urutan categoryTemplate
const buildCategories = (amounts: number[]): CategorySpending[] =>
  categoryTemplate.map((category, index) => ({
    ...category,
    amount: amounts[index],
  }))

// Data dummy laporan per bulan, bulan terbaru di urutan pertama.
// Jumlah semua kategori sama dengan expense bulan itu.
export const monthlyReports: MonthlyReport[] = [
  {
    month: '2026-10',
    label: 'Oktober 2026',
    income: 5200000,
    expense: 3450000,
    categories: buildCategories([1104000, 621000, 552000, 414000, 345000, 414000]),
    balanceHistory: [
      { label: '1 Okt', balance: 6400000 },
      { label: '8 Okt', balance: 7000000 },
      { label: '15 Okt', balance: 6800000 },
      { label: '22 Okt', balance: 7500000 },
      { label: '29 Okt', balance: 8130000 },
    ],
  },
  {
    month: '2026-09',
    label: 'September 2026',
    income: 4800000,
    expense: 3900000,
    categories: buildCategories([1170000, 702000, 624000, 468000, 390000, 546000]),
    balanceHistory: [
      { label: '1 Sep', balance: 6800000 },
      { label: '8 Sep', balance: 6500000 },
      { label: '15 Sep', balance: 6900000 },
      { label: '22 Sep', balance: 6200000 },
      { label: '29 Sep', balance: 6400000 },
    ],
  },
  {
    month: '2026-08',
    label: 'Agustus 2026',
    income: 4500000,
    expense: 3200000,
    categories: buildCategories([960000, 640000, 480000, 320000, 480000, 320000]),
    balanceHistory: [
      { label: '1 Agu', balance: 6100000 },
      { label: '8 Agu', balance: 6400000 },
      { label: '15 Agu', balance: 6300000 },
      { label: '22 Agu', balance: 6700000 },
      { label: '29 Agu', balance: 6800000 },
    ],
  },
]

// Data dummy transaksi. Biaya admin dicatat sebagai pengeluaran terpisah dari transfernya.
// items berisi rincian barang, kosong kalau belum diisi.
export const transactions: Transaction[] = [
  { id: '1', title: 'Indomaret', type: 'expense', category: 'Belanja', account: 'BCA', amount: 85000, date: '2026-10-29', status: 'needs-detail', items: [] },
  { id: '2', title: 'Gaji', type: 'income', category: 'Gaji', account: 'BCA', amount: 5000000, date: '2026-10-25', status: 'done', items: [] },
  { id: '3', title: 'Transfer ke DANA', type: 'transfer', category: 'Transfer', account: 'BCA', toAccount: 'DANA', amount: 100000, date: '2026-10-24', status: 'done', items: [] },
  { id: '4', title: 'Biaya Admin', type: 'expense', category: 'Biaya admin', account: 'BCA', amount: 2500, date: '2026-10-24', status: 'done', items: [] },
  { id: '5', title: 'Shopee', type: 'expense', category: 'Belanja', account: 'DANA', amount: 120000, date: '2026-10-22', status: 'done', items: [] },
  { id: '6', title: 'Makan Siang', type: 'expense', category: 'Makan & Minum', account: 'Cash', amount: 45000, date: '2026-10-21', status: 'done', items: [] },
  { id: '7', title: 'Gojek', type: 'expense', category: 'Transportasi', account: 'GoPay', amount: 32000, date: '2026-10-18', status: 'done', items: [] },
  { id: '8', title: 'Netflix', type: 'expense', category: 'Hiburan', account: 'OVO', amount: 54000, date: '2026-10-15', status: 'done', items: [] },
  { id: '9', title: 'Gaji', type: 'income', category: 'Gaji', account: 'BCA', amount: 4800000, date: '2026-09-25', status: 'done', items: [] },
  { id: '10', title: 'Listrik PLN', type: 'expense', category: 'Kebutuhan', account: 'Mandiri', amount: 350000, date: '2026-09-20', status: 'done', items: [] },
  { id: '11', title: 'Transfer ke OVO', type: 'transfer', category: 'Transfer', account: 'BCA', toAccount: 'OVO', amount: 200000, date: '2026-09-12', status: 'done', items: [] },
]
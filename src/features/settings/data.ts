import { FiBell, FiCreditCard, FiInfo, FiShield, FiSmartphone, FiTag } from 'react-icons/fi'
import type { IconType } from 'react-icons'

export interface SettingsMenuItem {
  id: string
  title: string
  description: string
  icon: IconType
  // Alamat halaman tujuan. Kosong kalau halamannya belum dibuat.
  path?: string
}

// Daftar menu di halaman Pengaturan, sesuai mockup
export const settingsMenu: SettingsMenuItem[] = [
  {
    id: 'categories',
    title: 'Kategori',
    description: 'Kelola kategori pemasukan & pengeluaran',
    icon: FiTag,
  },
  {
    id: 'active-account',
    title: 'Akun Aktif',
    description: 'Pilih akun utama untuk transaksi',
    icon: FiCreditCard,
  },
  {
    id: 'notification-integration',
    title: 'Integrasi Notifikasi',
    description: 'Atur aplikasi yang diizinkan',
    icon: FiSmartphone,
  },
  {
    id: 'notifications',
    title: 'Notifikasi',
    description: 'Atur pengingat dan pemberitahuan',
    icon: FiBell,
  },
  {
    id: 'security',
    title: 'Keamanan',
    description: 'Kelola akses dan privasi data',
    icon: FiShield,
  },
  {
    id: 'about',
    title: 'Tentang DUIT',
    description: 'Versi aplikasi 1.0.0',
    icon: FiInfo,
  },
]
import { useNavigate } from 'react-router'
import { toast } from '@heroui/react'
import SettingsItem from './SettingsItem'
import { settingsMenu } from './data'
import type { SettingsMenuItem } from './data'

const SettingsPage = () => {
  const navigate = useNavigate()

  // Membuka halaman menu. Kalau halamannya belum dibuat, tampilkan notifikasi saja.
  const openItem = (item: SettingsMenuItem) => {
    if (item.path) {
      navigate(item.path)
      return
    }

    toast.info(`${item.title} belum tersedia`, {
      description: 'Halaman ini akan dibuat di tahap berikutnya.',
    })
  }

  return (
    <div className="space-y-4 p-4 pb-28">
      <div className="text-lg font-semibold">Pengaturan</div>

      {/* Semua menu dalam satu kartu, dipisah garis tipis */}
      <div className="divide-y divide-gray-100 rounded-xl bg-white shadow-sm">
        {settingsMenu.map((item) => (
          <SettingsItem
            key={item.id}
            icon={item.icon}
            title={item.title}
            description={item.description}
            onClick={() => openItem(item)}
          />
        ))}
      </div>
    </div>
  )
}

export default SettingsPage
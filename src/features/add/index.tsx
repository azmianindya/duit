import { useState } from 'react'
import type { TransactionType } from '../../lib/types'
import TransactionForm from './TransactionForm'
import TransferForm from './transferForm'
import { addTabs } from './data'

const AddPage = () => {
  // Menyimpan tab yang sedang dipilih, awalnya Pengeluaran karena paling sering dipakai
  const [tab, setTab] = useState<TransactionType>('expense')

  return (
    <div className="space-y-4 p-4 pb-28">
      <div className="text-lg font-semibold">Tambah Transaksi</div>

      {/* Tab jenis transaksi */}
      <div className="flex gap-2">
        {addTabs.map((item) => (
          <div
            key={item.value}
            onClick={() => setTab(item.value)}
            className={`cursor-pointer whitespace-nowrap rounded-full px-4 py-1.5 text-xs ${
              tab === item.value
                ? 'bg-emerald-700 text-white'
                : 'border border-gray-200 bg-white text-gray-600'
            }`}
          >
            {item.label}
          </div>
        ))}
      </div>

      {/* key supaya isi form di-reset saat pindah antara pemasukan dan pengeluaran */}
      <div className="rounded-xl bg-white p-4 shadow-sm">
        {tab === 'transfer' ? <TransferForm /> : <TransactionForm key={tab} type={tab} />}
      </div>
    </div>
  )
}

export default AddPage
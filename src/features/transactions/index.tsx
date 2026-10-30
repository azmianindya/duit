import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { formatMonth } from '../../lib/format'
import type { Transaction, TransactionFilter } from '../../lib/types'
import TransactionItem from './TransactionItem'
import { useTransactions } from './context'
import { filterTabs } from './data'

interface MonthGroup {
  month: string
  items: Transaction[]
}

const TransactionsPage = () => {
  // Daftar transaksi dari provider, berubah kalau rincian barang disimpan
  const { transactions } = useTransactions()

  // Menyimpan teks pencarian dan tab filter yang sedang dipilih
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<TransactionFilter>('all')

  const keyword = search.trim().toLowerCase()

  // Filter berdasarkan tab, lalu berdasarkan pencarian (judul atau kategori), lalu urutkan dari yang terbaru
  const filtered = transactions
    .filter((item) => filter === 'all' || item.type === filter)
    .filter(
      (item) =>
        item.title.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword)
    )
    .sort((a, b) => b.date.localeCompare(a.date))

  // Mengelompokkan transaksi per bulan. Karena sudah diurutkan, transaksi satu bulan pasti berurutan.
  const groups: MonthGroup[] = []
  for (const item of filtered) {
    const month = formatMonth(item.date)
    const lastGroup = groups[groups.length - 1]

    if (lastGroup && lastGroup.month === month) {
      lastGroup.items.push(item)
    } else {
      groups.push({ month, items: [item] })
    }
  }

  return (
    <div className="space-y-4 p-4 pb-28">
      <div className="text-lg font-semibold">Transaksi</div>

      {/* Kolom pencarian */}
      <div className="relative">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Cari transaksi..."
          className="w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-emerald-700"
        />
      </div>

      {/* Tab filter jenis transaksi */}
      <div className="flex gap-2 overflow-x-auto">
        {filterTabs.map((tab) => (
          <div
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`cursor-pointer whitespace-nowrap rounded-full px-4 py-1.5 text-xs ${
              filter === tab.value
                ? 'bg-emerald-700 text-white'
                : 'border border-gray-200 bg-white text-gray-600'
            }`}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {/* Daftar transaksi per bulan */}
      {groups.length === 0 ? (
        <div className="py-10 text-center text-sm text-gray-500">
          Transaksi tidak ditemukan
        </div>
      ) : (
        groups.map((group) => (
          <div key={group.month} className="space-y-2">
            <div className="text-sm font-semibold">{group.month}</div>
            {group.items.map((item) => (
              <TransactionItem key={item.id} transaction={item} />
            ))}
          </div>
        ))
      )}
    </div>
  )
}

export default TransactionsPage
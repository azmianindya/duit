import { FiArrowDown, FiArrowUp } from 'react-icons/fi'
import { formatRupiah } from '../../lib/format'

interface SummaryCardProps {
  income: number
  expense: number
}

const SummaryCardPage = ({ income, expense }: SummaryCardProps) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Kartu pemasukan: ikon panah atas berwarna hijau */}
      <div className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <FiArrowUp />
        </div>
        <div>
          <div className="text-xs text-gray-500">Pemasukan</div>
          <div className="text-sm font-semibold">{formatRupiah(income)}</div>
        </div>
      </div>

      {/* Kartu pengeluaran: ikon panah bawah berwarna merah */}
      <div className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
          <FiArrowDown />
        </div>
        <div>
          <div className="text-xs text-gray-500">Pengeluaran</div>
          <div className="text-sm font-semibold">{formatRupiah(expense)}</div>
        </div>
      </div>
    </div>
  )
}

export default SummaryCardPage
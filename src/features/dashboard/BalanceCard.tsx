import { useState } from 'react'
import { FiChevronDown, FiEye, FiEyeOff, FiTrendingUp } from 'react-icons/fi'
import { formatRupiah } from '../../lib/format'

interface BalanceCardProps {
  total: number
  weeklyChange: number
}

const BalanceCardPage = ({ total, weeklyChange }: BalanceCardProps) => {
  // Menyimpan apakah angka saldo sedang disembunyikan
  const [hidden, setHidden] = useState(false)

  return (
    <div className="rounded-2xl bg-emerald-700 p-4 text-white">
      <div className="flex items-center justify-between text-sm">
        <span>Total Saldo</span>
        <FiChevronDown />
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className="text-3xl font-bold">
          {hidden ? 'Rp ••••••••' : formatRupiah(total)}
        </span>
        <div
          className="cursor-pointer"
          onClick={() => setHidden(!hidden)}
        >
          {hidden ? <FiEyeOff /> : <FiEye />}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1 text-xs">
        <FiTrendingUp />
        <span>
          {weeklyChange >= 0 ? '+' : '-'} {formatRupiah(Math.abs(weeklyChange))} (7 hari terakhir)
        </span>
      </div>
    </div>
  )
}

export default BalanceCardPage
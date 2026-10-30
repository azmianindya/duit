import { Link } from 'react-router'
import { FiBell, FiUser } from 'react-icons/fi'
import { accounts, summary } from '../../lib/data'
import BalanceCard from './BalanceCard'
import SummaryCard from './SummaryCard'
import AccountList from './AccountList'

const DashboardPage = () => {
  // Total saldo dihitung dari penjumlahan saldo semua akun
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0)

  // Tanggal hari ini dalam format Indonesia, contoh: "Jum, 30 Okt 2026"
  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <div className="space-y-4 p-4 pb-28">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">Halo, Kamu!</div>
          <div className="text-xs text-gray-500">{today}</div>
        </div>
        <div className="flex items-center gap-3">
          <FiBell size={20} />
          {/* Ikon orang membuka halaman daftar akun */}
          <Link
            to="/account"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"
          >
            <FiUser />
          </Link>
        </div>
      </div>

      <BalanceCard total={totalBalance} weeklyChange={summary.weeklyChange} />
      <SummaryCard income={summary.income} expense={summary.expense} />
      <AccountList accounts={accounts.slice(0, 4)} />
    </div>
  )
}

export default DashboardPage
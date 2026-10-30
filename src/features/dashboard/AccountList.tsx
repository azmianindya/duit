import { Link } from 'react-router'
import { FiChevronRight, FiCreditCard, FiDollarSign, FiSmartphone } from 'react-icons/fi'
import type { IconType } from 'react-icons'
import type { Account, AccountType } from '../../lib/types'
import { formatRupiah } from '../../lib/format'

interface AccountListProps {
  accounts: Account[]
}

// Ikon dan warna latar untuk setiap jenis akun
const typeStyle: Record<AccountType, { icon: IconType; color: string }> = {
  bank: { icon: FiCreditCard, color: 'bg-blue-100 text-blue-700' },
  'e-wallet': { icon: FiSmartphone, color: 'bg-purple-100 text-purple-700' },
  cash: { icon: FiDollarSign, color: 'bg-amber-100 text-amber-700' },
}

const AccountListPage = ({ accounts }: AccountListProps) => {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm font-semibold">Rekening & E-wallet</div>
        <Link to="/account" className="text-xs text-emerald-700">Lihat semua</Link>
      </div>

      <div className="space-y-2">
        {accounts.map((account) => {
          const { icon: Icon, color } = typeStyle[account.type]

          return (
            <div
              key={account.id}
              className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${color}`}>
                <Icon />
              </div>
              <div className="flex-1 text-sm font-medium">{account.name}</div>
              <div className="text-sm font-semibold">{formatRupiah(account.balance)}</div>
              <FiChevronRight className="text-gray-400" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AccountListPage
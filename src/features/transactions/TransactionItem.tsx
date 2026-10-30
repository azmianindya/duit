import { Link } from 'react-router'
import { FiAlertCircle } from 'react-icons/fi'
import { formatDate, formatRupiah } from '../../lib/format'
import type { Transaction } from '../../lib/types'
import { amountColor, amountSign, categoryStyles, defaultStyle } from './data'

interface TransactionItemProps {
  transaction: Transaction
}

const TransactionItem = ({ transaction }: TransactionItemProps) => {
  // Ikon dan warna sesuai kategori, pakai gaya cadangan kalau kategori belum terdaftar
  const { icon: Icon, color } = categoryStyles[transaction.category] ?? defaultStyle

  return (
    // Mengetuk transaksi membuka halaman detail transaksi
    <Link
      to={`/transactions/${transaction.id}`}
      className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm"
    >
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${color}`}>
        <Icon />
      </div>

      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium">{transaction.title}</div>
        <div className="text-xs text-gray-500">
          {transaction.category} • {formatDate(transaction.date)}
        </div>
      </div>

      <div className="text-right">
        <div className={`text-sm font-semibold ${amountColor[transaction.type]}`}>
          {amountSign[transaction.type]} {formatRupiah(transaction.amount)}
        </div>

        {/* Badge hanya muncul kalau rincian barang belum sesuai nominal */}
        {transaction.status === 'needs-detail' && (
          <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-[10px] text-red-600">
            <FiAlertCircle />
            <span>Perlu detail</span>
          </div>
        )}
      </div>
    </Link>
  )
}

export default TransactionItem
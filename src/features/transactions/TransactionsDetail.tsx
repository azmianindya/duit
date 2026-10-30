import { Link } from 'react-router'
import { FiAlertCircle, FiArrowLeft } from 'react-icons/fi'
import { formatDate, formatRupiah } from '../../lib/format'
import ItemsForm from './ItemsForm'
import { useTransactions } from './context'
import { amountColor, amountSign } from './data'

interface TransactionDetailProps {
  id: string
}

const TransactionDetail = ({ id }: TransactionDetailProps) => {
  const { transactions } = useTransactions()

  // Mencari transaksi berdasarkan id dari alamat halaman
  const transaction = transactions.find((item) => item.id === id)

  if (!transaction) {
    return (
      <div className="space-y-4 p-4 pb-28">
        <Link to="/transactions" className="flex items-center gap-2 text-sm text-emerald-700">
          <FiArrowLeft />
          <span>Kembali</span>
        </Link>
        <div className="py-10 text-center text-sm text-gray-500">Transaksi tidak ditemukan</div>
      </div>
    )
  }

  // Data yang ditampilkan di kartu detail
  const info = [
    { label: 'Akun', value: transaction.account },
    { label: 'Kategori', value: transaction.category },
    { label: 'Tanggal', value: formatDate(transaction.date) },
  ]

  return (
    <div className="space-y-4 p-4 pb-28">
      <div className="flex items-center gap-3">
        <Link to="/transactions" className="text-gray-700">
          <FiArrowLeft size={20} />
        </Link>
        <div className="text-lg font-semibold">Detail Transaksi</div>
      </div>

      {/* Kartu ringkasan transaksi */}
      <div className="space-y-3 rounded-xl bg-white p-4 shadow-sm">
        <div className="text-sm text-gray-500">{transaction.title}</div>
        <div className={`text-2xl font-bold ${amountColor[transaction.type]}`}>
          {amountSign[transaction.type]} {formatRupiah(transaction.amount)}
        </div>

        {transaction.status === 'needs-detail' && (
          <div className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-xs text-red-600">
            <FiAlertCircle />
            <span>Perlu detail</span>
          </div>
        )}

        <div className="space-y-2 border-t border-gray-100 pt-3">
          {info.map((row) => (
            <div key={row.label} className="flex justify-between text-sm">
              <span className="text-gray-500">{row.label}</span>
              <span className="font-medium">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form rincian barang hanya untuk pengeluaran. key supaya form di-reset saat pindah transaksi. */}
      {transaction.type === 'expense' && (
        <ItemsForm key={transaction.id} transaction={transaction} />
      )}
    </div>
  )
}

export default TransactionDetail
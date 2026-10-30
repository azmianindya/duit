import { useParams } from 'react-router'
import TransactionDetail from '../../features/transactions/TransactionsDetail'

const TransactionDetailPage = () => {
  // id diambil dari bagian [id] pada alamat halaman
  const { id } = useParams()

  return <TransactionDetail id={id ?? ''} />
}

export default TransactionDetailPage
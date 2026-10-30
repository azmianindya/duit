import { Outlet, useLocation } from 'react-router'
import { Toast } from '@heroui/react'
import BottomNav from '../components/BottomNav'
import TransactionsProvider from '../features/transactions/TransactionsProvider'

// Halaman yang tidak menampilkan navigasi bawah
const hiddenNavPaths = ['/auth']

const App = () => {
  const { pathname } = useLocation()

  return (
    <TransactionsProvider>
      <Toast.Provider placement="top" />

      <div className="mx-auto min-h-screen max-w-md bg-gray-50">
        <Outlet />
        {!hiddenNavPaths.includes(pathname) && <BottomNav />}
      </div>
    </TransactionsProvider>
  )
}

export default App
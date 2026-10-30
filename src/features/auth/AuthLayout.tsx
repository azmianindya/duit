import type { ReactNode } from 'react'
import Logo from './Logo'

interface AuthLayoutProps {
  title: string
  subtitle: string
  children: ReactNode
}

const AuthLayout = ({ title, subtitle, children }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col justify-center gap-6 p-6">
      <Logo />

      <div className="text-center">
        <div className="text-lg font-semibold">{title}</div>
        <div className="mt-1 text-sm text-gray-500">{subtitle}</div>
      </div>

      {/* Kartu putih tempat form ditampilkan */}
      <div className="rounded-xl bg-white p-4 shadow-sm">{children}</div>

      <div className="text-center text-xs text-gray-400">
        Langkah kecil hari ini, untuk masa depan yang lebih baik
      </div>
    </div>
  )
}

export default AuthLayout
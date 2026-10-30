import { LuHeart, LuSprout } from 'react-icons/lu'
import Logo from './Logo'

interface WelcomeProps {
  // Dipanggil saat tombol Masuk atau Daftar diketuk
  onLogin: () => void
  onSignUp: () => void
}

const Welcome = ({ onLogin, onSignUp }: WelcomeProps) => {
  return (
    <div className="flex min-h-screen flex-col justify-between p-6">
      {/* Bagian atas: logo */}
      <div className="pt-16">
        <Logo />
      </div>

      {/* Bagian tengah: sambutan dan dua tombol */}
      <div className="space-y-6">
        <div className="text-center">
          <div className="text-lg font-semibold">Selamat datang di DUIT!</div>
          <div className="mt-1 text-sm text-gray-500">
            Kelola keuanganmu dengan lebih mudah dan terorganisir.
          </div>
        </div>

        <div className="space-y-3">
          <div
            onClick={onLogin}
            className="cursor-pointer rounded-xl bg-emerald-700 py-3 text-center text-sm font-semibold text-white"
          >
            Masuk
          </div>
          <div
            onClick={onSignUp}
            className="cursor-pointer rounded-xl border-2 border-emerald-700 bg-white py-3 text-center text-sm font-semibold text-emerald-700"
          >
            Daftar
          </div>
        </div>
      </div>

      {/* Bagian bawah: kalimat penutup */}
      <div className="flex flex-col items-center gap-2 pb-6 text-center text-emerald-700">
        <LuSprout size={28} />
        <div className="text-xs text-gray-500">
          Langkah kecil hari ini,
          <br />
          untuk masa depan yang lebih baik
        </div>
        <LuHeart size={14} fill="currentColor" />
      </div>
    </div>
  )
}

export default Welcome
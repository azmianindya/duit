import { useSearchParams } from 'react-router'
import Login from '../features/auth/Login'
import SignUp from '../features/auth/SignUp'
import Welcome from '../features/auth/Welcome'

// Dua layar form di halaman /auth. Layar pembuka tampil kalau alamat tidak punya mode.
type AuthMode = 'login' | 'signup'

const AuthPage = () => {
  // Layar yang tampil disimpan di alamat, contoh: /auth?mode=login
  const [searchParams, setSearchParams] = useSearchParams()
  const mode = searchParams.get('mode')

  // Membuka layar masuk atau daftar dari layar pembuka. Ini menambah riwayat browser,
  // jadi tombol kembali di HP kembali ke layar pembuka.
  const openMode = (nextMode: AuthMode) => {
    setSearchParams({ mode: nextMode })
  }

  // Pindah antara masuk dan daftar tanpa menambah riwayat,
  // jadi tombol kembali langsung ke layar pembuka.
  const switchMode = (nextMode: AuthMode) => {
    setSearchParams({ mode: nextMode }, { replace: true })
  }

  if (mode === 'login') {
    return <Login onSwitch={() => switchMode('signup')} />
  }

  if (mode === 'signup') {
    return <SignUp onSwitch={() => switchMode('login')} />
  }

  return <Welcome onLogin={() => openMode('login')} onSignUp={() => openMode('signup')} />
}

export default AuthPage
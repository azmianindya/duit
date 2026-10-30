import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { Button, FieldError, Fieldset, Form, Input, Label, TextField, toast } from '@heroui/react'
import AuthLayout from './AuthLayout'

interface LoginProps {
  // Dipanggil saat pengguna memilih pindah ke layar daftar
  onSwitch: () => void
}

const Login = ({ onSwitch }: LoginProps) => {
  const navigate = useNavigate()

  // Isi kolom form
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Sementara belum ada pengecekan akun: tampilkan notifikasi lalu pindah ke Beranda.
  // replace supaya tombol kembali dari Beranda tidak membuka layar masuk lagi.
  // Nanti bagian ini diganti dengan login lewat Supabase.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    toast.success('Berhasil masuk', {
      description: 'Selamat datang kembali di DUIT.',
    })

    navigate('/', { replace: true })
  }

  return (
    <AuthLayout
      title="Masuk ke DUIT"
      subtitle="Masukkan email dan kata sandi untuk melanjutkan."
    >
      <Form onSubmit={onSubmit}>
        <Fieldset className="w-full">
          <Fieldset.Group>
            <TextField isRequired name="email" type="email" value={email} onChange={setEmail}>
              <Label>Email</Label>
              <Input placeholder="nama@email.com" variant="secondary" />
              <FieldError />
            </TextField>

            <TextField
              isRequired
              name="password"
              type="password"
              value={password}
              onChange={setPassword}
              validate={(value) =>
                value.length < 6 ? 'Kata sandi minimal 6 karakter' : null
              }
            >
              <Label>Kata sandi</Label>
              <Input placeholder="Masukkan kata sandi" variant="secondary" />
              <FieldError />
            </TextField>
          </Fieldset.Group>

          <Fieldset.Actions>
            <Button type="submit" className="w-full">
              Masuk
            </Button>
          </Fieldset.Actions>
        </Fieldset>
      </Form>

      <div className="mt-4 text-center text-sm text-gray-500">
        Belum punya akun?{' '}
        <span onClick={onSwitch} className="cursor-pointer font-medium text-emerald-700">
          Daftar
        </span>
      </div>
    </AuthLayout>
  )
}

export default Login
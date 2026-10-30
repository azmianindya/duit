import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { Button, FieldError, Fieldset, Form, Input, Label, TextField, toast } from '@heroui/react'
import AuthLayout from './AuthLayout'

interface SignUpProps {
  // Dipanggil saat pengguna memilih pindah ke layar masuk
  onSwitch: () => void
}

const SignUp = ({ onSwitch }: SignUpProps) => {
  const navigate = useNavigate()

  // Isi kolom form
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Sementara belum ada pembuatan akun: tampilkan notifikasi lalu pindah ke Beranda.
  // replace supaya tombol kembali dari Beranda tidak membuka layar daftar lagi.
  // Nanti bagian ini diganti dengan pendaftaran lewat Supabase.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    toast.success('Akun berhasil dibuat', {
      description: `Selamat datang di DUIT, ${name.trim()}.`,
    })

    navigate('/', { replace: true })
  }

  return (
    <AuthLayout
      title="Buat akun DUIT"
      subtitle="Daftar untuk mulai mencatat keuanganmu."
    >
      <Form onSubmit={onSubmit}>
        <Fieldset className="w-full">
          <Fieldset.Group>
            <TextField
              isRequired
              name="name"
              value={name}
              onChange={setName}
              validate={(value) =>
                value.trim().length < 3 ? 'Nama minimal 3 karakter' : null
              }
            >
              <Label>Nama</Label>
              <Input placeholder="Nama lengkap" variant="secondary" />
              <FieldError />
            </TextField>

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
              <Input placeholder="Minimal 6 karakter" variant="secondary" />
              <FieldError />
            </TextField>

            <TextField
              isRequired
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              validate={(value) => (value !== password ? 'Kata sandi tidak sama' : null)}
            >
              <Label>Ulangi kata sandi</Label>
              <Input placeholder="Ketik ulang kata sandi" variant="secondary" />
              <FieldError />
            </TextField>
          </Fieldset.Group>

          <Fieldset.Actions>
            <Button type="submit" className="w-full">
              Daftar
            </Button>
          </Fieldset.Actions>
        </Fieldset>
      </Form>

      <div className="mt-4 text-center text-sm text-gray-500">
        Sudah punya akun?{' '}
        <span onClick={onSwitch} className="cursor-pointer font-medium text-emerald-700">
          Masuk
        </span>
      </div>
    </AuthLayout>
  )
}

export default SignUp
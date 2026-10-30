import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router'
import {
  Button,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
  toast,
} from '@heroui/react'
import { accounts } from '../../lib/data'
import { formatRupiah } from '../../lib/format'
import type { Transaction, TransactionType } from '../../lib/types'
import { useTransactions } from '../transactions/context'
import ChoiceChips from './ChoiceChips'
import { expenseCategories, getToday, incomeCategories } from './data'

interface TransactionFormProps {
  type: Exclude<TransactionType, 'transfer'>
}

const accountNames = accounts.map((account) => account.name)

const TransactionForm = ({ type }: TransactionFormProps) => {
  const navigate = useNavigate()
  const { addTransactions } = useTransactions()

  // Isi kolom form
  const [account, setAccount] = useState('')
  const [date, setDate] = useState(getToday())
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [note, setNote] = useState('')

  const categories = type === 'income' ? incomeCategories : expenseCategories

  // Menyimpan transaksi baru, menampilkan notifikasi berhasil, lalu pindah ke daftar transaksi
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const created: Transaction = {
      id: crypto.randomUUID(),
      title: note.trim() || category,
      type,
      category,
      account,
      amount: Number(amount),
      date,
      status: 'done',
      items: [],
    }

    addTransactions([created])

    toast.success('Transaksi tersimpan', {
      description: `${created.title} sebesar ${formatRupiah(created.amount)} berhasil dicatat.`,
    })

    navigate('/transactions')
  }

  return (
    <Form onSubmit={onSubmit}>
      <Fieldset className="w-full">
        <Fieldset.Group>
          <div className="space-y-2">
            <div className="text-sm font-medium">Akun</div>
            <ChoiceChips options={accountNames} value={account} onChange={setAccount} />
          </div>

          <TextField isRequired name="date" type="date" value={date} onChange={setDate}>
            <Label>Tanggal</Label>
            <Input variant="secondary" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            name="amount"
            type="number"
            value={amount}
            onChange={setAmount}
            validate={(value) => (Number(value) < 1 ? 'Nominal harus lebih dari 0' : null)}
          >
            <Label>Nominal (Rp)</Label>
            <Input placeholder="0" variant="secondary" />
            <FieldError />
          </TextField>

          <div className="space-y-2">
            <div className="text-sm font-medium">Kategori</div>
            <ChoiceChips options={categories} value={category} onChange={setCategory} />
          </div>

          <TextField name="note" value={note} onChange={setNote}>
            <Label>Keterangan (opsional)</Label>
            <Input placeholder="Tulis keterangan..." variant="secondary" />
          </TextField>
        </Fieldset.Group>

        {(!account || !category) && (
          <div className="text-xs text-gray-500">Pilih akun dan kategori dulu.</div>
        )}

        <Fieldset.Actions>
          <Button type="submit" isDisabled={!account || !category}>
            Simpan
          </Button>
        </Fieldset.Actions>
      </Fieldset>
    </Form>
  )
}

export default TransactionForm
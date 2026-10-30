import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { FiAlertCircle } from 'react-icons/fi'
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
import type { Transaction } from '../../lib/types'
import { useTransactions } from '../transactions/context'
import ChoiceChips from './ChoiceChips'
import { getToday } from './data'

const accountNames = accounts.map((account) => account.name)

const TransferForm = () => {
  const navigate = useNavigate()
  const { addTransactions } = useTransactions()

  // Isi kolom form
  const [fromAccount, setFromAccount] = useState('')
  const [toAccount, setToAccount] = useState('')
  const [date, setDate] = useState(getToday())
  const [amount, setAmount] = useState('')
  const [fee, setFee] = useState('')
  const [note, setNote] = useState('')

  // Transfer ke akun yang sama tidak masuk akal, jadi tombol Simpan dinonaktifkan
  const sameAccount = fromAccount !== '' && fromAccount === toAccount
  const canSubmit = fromAccount !== '' && toAccount !== '' && !sameAccount

  // Menyimpan transfer. Kalau ada biaya admin, dicatat sebagai pengeluaran terpisah.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const feeNumber = Number(fee) || 0

    const transfer: Transaction = {
      id: crypto.randomUUID(),
      title: note.trim() || `Transfer ke ${toAccount}`,
      type: 'transfer',
      category: 'Transfer',
      account: fromAccount,
      toAccount,
      amount: Number(amount),
      date,
      status: 'done',
      items: [],
    }

    const created: Transaction[] = [transfer]

    if (feeNumber > 0) {
      created.push({
        id: crypto.randomUUID(),
        title: 'Biaya Admin',
        type: 'expense',
        category: 'Biaya admin',
        account: fromAccount,
        amount: feeNumber,
        date,
        status: 'done',
        items: [],
      })
    }

    addTransactions(created)

    toast.success('Transfer tersimpan', {
      description:
        `${fromAccount} ke ${toAccount} sebesar ${formatRupiah(transfer.amount)}` +
        (feeNumber > 0 ? `, biaya admin ${formatRupiah(feeNumber)} dicatat terpisah.` : '.'),
    })

    navigate('/transactions')
  }

  return (
    <Form onSubmit={onSubmit}>
      <Fieldset className="w-full">
        <Fieldset.Group>
          <div className="space-y-2">
            <div className="text-sm font-medium">Dari akun</div>
            <ChoiceChips options={accountNames} value={fromAccount} onChange={setFromAccount} />
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Ke akun</div>
            <ChoiceChips options={accountNames} value={toAccount} onChange={setToAccount} />
          </div>

          {sameAccount && (
            <div className="flex items-start gap-2 rounded-lg bg-red-50 p-2 text-xs text-red-600">
              <FiAlertCircle className="mt-0.5 shrink-0" />
              <span>Akun asal dan akun tujuan tidak boleh sama.</span>
            </div>
          )}

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

          <TextField
            name="fee"
            type="number"
            value={fee}
            onChange={setFee}
            validate={(value) => (Number(value) < 0 ? 'Biaya tidak boleh negatif' : null)}
          >
            <Label>Biaya admin (opsional)</Label>
            <Input placeholder="0" variant="secondary" />
            <FieldError />
          </TextField>

          <TextField name="note" value={note} onChange={setNote}>
            <Label>Keterangan (opsional)</Label>
            <Input placeholder="Contoh: Top up DANA" variant="secondary" />
          </TextField>
        </Fieldset.Group>

        {(!fromAccount || !toAccount) && (
          <div className="text-xs text-gray-500">Pilih akun asal dan akun tujuan dulu.</div>
        )}

        <Fieldset.Actions>
          <Button type="submit" isDisabled={!canSubmit}>
            Simpan
          </Button>
        </Fieldset.Actions>
      </Fieldset>
    </Form>
  )
}

export default TransferForm
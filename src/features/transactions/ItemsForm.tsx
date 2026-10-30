import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { FiAlertCircle, FiCheckCircle, FiPlus } from 'react-icons/fi'
import {
  Button,
  Description,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
  toast,
} from '@heroui/react'
import { formatRupiah } from '../../lib/format'
import type { Transaction } from '../../lib/types'
import { useTransactions } from './context'

interface ItemsFormProps {
  transaction: Transaction
}

// Satu baris input barang. Semua nilai berupa teks karena berasal dari kolom input.
interface ItemRow {
  id: string
  name: string
  quantity: string
  price: string
}

// Membuat satu baris kosong dengan jumlah awal 1
const createRow = (): ItemRow => ({
  id: crypto.randomUUID(),
  name: '',
  quantity: '1',
  price: '',
})

const ItemsForm = ({ transaction }: ItemsFormProps) => {
  const navigate = useNavigate()
  const { saveItems } = useTransactions()

  // Baris awal diambil dari rincian yang sudah tersimpan, atau satu baris kosong kalau belum ada
  const [rows, setRows] = useState<ItemRow[]>(
    transaction.items.length > 0
      ? transaction.items.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: String(item.quantity),
          price: String(item.price),
        }))
      : [createRow()]
  )

  // Mengubah satu kolom pada satu baris
  const updateRow = (id: string, field: 'name' | 'quantity' | 'price', value: string) => {
    setRows((current) =>
      current.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    )
  }

  // Menghapus satu baris
  const removeRow = (id: string) => {
    setRows((current) => current.filter((row) => row.id !== id))
  }

  // Total rincian = jumlah (jumlah barang x harga satuan) dari semua baris
  const itemsTotal = rows.reduce(
    (sum, row) => sum + (Number(row.quantity) || 0) * (Number(row.price) || 0), 0)
  const difference = transaction.amount - itemsTotal
  const isMatch = difference === 0
  const hasInput = rows.some((row) => row.name.trim() !== '' || row.price !== '')

  // Menyimpan rincian, menampilkan notifikasi berhasil, lalu kembali ke daftar transaksi
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    saveItems(
      transaction.id,
      rows.map((row) => ({
        id: row.id,
        name: row.name.trim(),
        quantity: Number(row.quantity),
        price: Number(row.price),
      }))
    )

    toast.success('Rincian barang tersimpan', {
      description: `${transaction.title}: total ${formatRupiah(itemsTotal)} sudah sesuai nominal transaksi.`,
    })

    navigate('/transactions')
  }

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <Form onSubmit={onSubmit}>
        <Fieldset className="w-full">
          <Fieldset.Legend>Rincian Barang</Fieldset.Legend>
          <Description>Isi barang yang dibeli. Total rincian harus sama dengan nominal transaksi.</Description>

          <Fieldset.Group>
            {rows.map((row, index) => (
              <div key={row.id} className="space-y-3 rounded-xl border border-gray-200 p-3">
                <div className="flex items-center justify-between text-xs font-medium text-gray-500">
                  <span>Barang {index + 1}</span>
                  {rows.length > 1 && (
                    <Button variant="tertiary" onPress={() => removeRow(row.id)}>
                      Hapus
                    </Button>
                  )}
                </div>

                <TextField
                  isRequired
                  name={`name-${row.id}`}
                  value={row.name}
                  onChange={(value) => updateRow(row.id, 'name', value)}
                >
                  <Label>Nama barang</Label>
                  <Input placeholder="Contoh: Susu UHT" variant="secondary" />
                  <FieldError />
                </TextField>

                <div className="grid grid-cols-2 gap-3">
                  <TextField
                    isRequired
                    name={`quantity-${row.id}`}
                    type="number"
                    value={row.quantity}
                    onChange={(value) => updateRow(row.id, 'quantity', value)}
                    validate={(value) => (Number(value) < 1 ? 'Minimal 1' : null)}
                  >
                    <Label>Jumlah</Label>
                    <Input placeholder="1" variant="secondary" />
                    <FieldError />
                  </TextField>

                  <TextField
                    isRequired
                    name={`price-${row.id}`}
                    type="number"
                    value={row.price}
                    onChange={(value) => updateRow(row.id, 'price', value)}
                    validate={(value) => (Number(value) < 1 ? 'Harga harus lebih dari 0' : null)}
                  >
                    <Label>Harga satuan (Rp)</Label>
                    <Input placeholder="12000" variant="secondary" />
                    <FieldError />
                  </TextField>
                </div>
              </div>
            ))}

            <Button
              variant="tertiary"
              onPress={() => setRows((current) => [...current, createRow()])}
            >
              <FiPlus />
              Tambah Barang
            </Button>
          </Fieldset.Group>

          {/* Perbandingan total rincian dengan nominal transaksi */}
          <div className="space-y-2 rounded-xl bg-gray-50 p-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Total rincian</span>
              <span className="font-semibold">{formatRupiah(itemsTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Nominal transaksi</span>
              <span className="font-semibold">{formatRupiah(transaction.amount)}</span>
            </div>

            {!hasInput && (
              <div className="text-xs text-gray-500">Belum ada rincian barang yang diisi.</div>
            )}

            {hasInput && !isMatch && (
              <div className="flex items-start gap-2 rounded-lg bg-red-50 p-2 text-xs text-red-600">
                <FiAlertCircle className="mt-0.5 shrink-0" />
                <span>
                  Total rincian belum sama dengan nominal transaksi. Selisih{' '}
                  {formatRupiah(Math.abs(difference))}.
                </span>
              </div>
            )}

            {hasInput && isMatch && (
              <div className="flex items-start gap-2 rounded-lg bg-emerald-50 p-2 text-xs text-emerald-700">
                <FiCheckCircle className="mt-0.5 shrink-0" />
                <span>Total rincian sudah sama dengan nominal transaksi.</span>
              </div>
            )}
          </div>

          <Fieldset.Actions>
            <Button type="submit" isDisabled={!isMatch}>
              Simpan
            </Button>
            <Button variant="tertiary" onPress={() => navigate('/transactions')}>
              Batal
            </Button>
          </Fieldset.Actions>
        </Fieldset>
      </Form>
    </div>
  )
}

export default ItemsForm
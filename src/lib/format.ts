// Mengubah teks tanggal "2026-10-29" menjadi objek Date sesuai zona waktu lokal
const parseDate = (iso: string): Date => {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(year, month - 1, day)
}

// Mengubah angka menjadi teks rupiah, contoh: 8750000 -> "Rp 8.750.000"
export const formatRupiah = (amount: number): string => {
  return 'Rp ' + new Intl.NumberFormat('id-ID').format(amount)
}

// Mengubah "2026-10-29" menjadi "29 Okt 2026"
export const formatDate = (iso: string): string => {
  return parseDate(iso).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

// Mengubah "2026-10-29" menjadi "Oktober 2026"
export const formatMonth = (iso: string): string => {
  return parseDate(iso).toLocaleDateString('id-ID', {
    month: 'long',
    year: 'numeric',
  })
}
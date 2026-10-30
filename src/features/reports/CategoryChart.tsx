import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { formatRupiah } from '../../lib/format'
import type { CategorySpending } from '../../lib/types'

interface CategoryChartProps {
  data: CategorySpending[]
}

const CategoryChart = ({ data }: CategoryChartProps) => {
  // Total semua kategori, dipakai untuk teks di tengah donut dan persentase
  const total = data.reduce((sum, item) => sum + item.amount, 0)

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <div className="mb-3 text-sm font-semibold">Pengeluaran per Kategori</div>

      <div className="flex items-center gap-4">
        <div className="relative h-36 w-36 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="amount"
                nameKey="name"
                innerRadius={45}
                outerRadius={65}
                paddingAngle={2}
                stroke="none"
              >
                {/* Setiap kategori punya warna sendiri dari field color */}
                {data.map((item) => (
                  <Cell key={item.id} fill={item.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Teks total di tengah donut */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="text-xs font-semibold">{formatRupiah(total)}</div>
            <div className="text-[10px] text-gray-500">Total</div>
          </div>
        </div>

        {/* Daftar kategori dengan persentase */}
        <div className="flex-1 space-y-1.5">
          {data.map((item) => (
            <div key={item.id} className="flex items-center gap-2 text-xs">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <div className="flex-1">{item.name}</div>
              <div className="text-gray-500">
                {Math.round((item.amount / total) * 100)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryChart
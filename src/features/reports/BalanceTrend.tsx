import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'
import { formatRupiah } from '../../lib/format'
import type { BalancePoint } from '../../lib/types'

interface BalanceTrendProps {
  data: BalancePoint[]
}

const BalanceTrend = ({ data }: BalanceTrendProps) => {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm">
      <div className="mb-3 text-sm font-semibold">Perkembangan Saldo</div>

      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip formatter={(value) => formatRupiah(Number(value))} />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#047857"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default BalanceTrend
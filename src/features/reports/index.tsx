import { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { monthlyReports } from '../../lib/data'
import SummaryCard from '../dashboard/SummaryCard'
import CategoryChart from './CategoryChart'
import BalanceTrend from './BalanceTrend'

const ReportsPage = () => {
  // Menyimpan bulan yang sedang dipilih, awalnya bulan terbaru
  const [selectedMonth, setSelectedMonth] = useState(monthlyReports[0].month)

  // Laporan untuk bulan yang dipilih
  const report =
    monthlyReports.find((item) => item.month === selectedMonth) ?? monthlyReports[0]

  return (
    <div className="space-y-4 p-4 pb-28">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">Laporan Keuangan</div>

        {/* Dropdown pilihan bulan */}
        <div className="relative">
          <select
            value={selectedMonth}
            onChange={(event) => setSelectedMonth(event.target.value)}
            className="appearance-none rounded-full border border-gray-200 bg-white py-1 pl-3 pr-8 text-xs"
          >
            {monthlyReports.map((item) => (
              <option key={item.month} value={item.month}>
                {item.label}
              </option>
            ))}
          </select>
          <FiChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      <SummaryCard income={report.income} expense={report.expense} />
      <CategoryChart data={report.categories} />
      <BalanceTrend data={report.balanceHistory} />
    </div>
  )
}

export default ReportsPage
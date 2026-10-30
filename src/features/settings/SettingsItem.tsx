import { FiChevronRight } from 'react-icons/fi'
import type { IconType } from 'react-icons'

interface SettingsItemProps {
  icon: IconType
  title: string
  description: string
  onClick: () => void
}

const SettingsItem = ({ icon: Icon, title, description, onClick }: SettingsItemProps) => {
  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer items-center gap-3 px-4 py-3"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
        <Icon />
      </div>

      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium">{title}</div>
        <div className="truncate text-xs text-gray-500">{description}</div>
      </div>

      <FiChevronRight className="shrink-0 text-gray-400" />
    </div>
  )
}

export default SettingsItem
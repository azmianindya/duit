import { LuLeaf } from 'react-icons/lu'

const Logo = () => {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-2 text-emerald-700">
        <LuLeaf size={36} />
        <span className="text-4xl font-bold">DUIT</span>
      </div>
      <div className="mt-1 text-xs text-gray-500">Digital Utility for Income Tracking</div>
    </div>
  )
}

export default Logo
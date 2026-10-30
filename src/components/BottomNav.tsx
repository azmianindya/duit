import { NavLink } from 'react-router'
import { navItems } from '../lib/data'

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-1/2 flex w-full max-w-md -translate-x-1/2 items-end justify-around border-t border-gray-200 bg-white px-2 pb-2 pt-2">
      {navItems.map((item) => {
        const Icon = item.icon

        // Tab Add: tombol bulat hijau yang posisinya sedikit naik
        if (item.isAdd) {
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="-mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-700 text-white shadow-lg"
            >
              <Icon size={26} />
            </NavLink>
          )
        }

        // Tab biasa: hijau kalau halamannya sedang aktif, abu-abu kalau tidak
        return (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-xs ${
                isActive ? 'text-emerald-700' : 'text-gray-400'
              }`
            }
          >
            <Icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        )
      })}
    </div>
  )
}

export default BottomNav
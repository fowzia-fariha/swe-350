// import { NavLink, useNavigate } from 'react-router-dom'
// import {
//   LayoutDashboard, Users, GraduationCap, BookOpen,
//   BarChart2, Settings, CalendarDays, UserCog,
//   ClipboardList, LogOut
// } from 'lucide-react'

// const links = [
//   { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
//   { to: '/admin/users',     icon: Users,           label: 'User Management' },
//   { to: '/admin/students',  icon: GraduationCap,   label: 'Student Records' },
//   { to: '/admin/courses',   icon: BookOpen,        label: 'Course Catalog' },
//   { to: '/admin/faculty',   icon: UserCog,         label: 'Faculty Management' },
//   { to: '/admin/results',   icon: ClipboardList,   label: 'Results' },
//   { to: '/admin/calendar',  icon: CalendarDays,    label: 'Academic Calendar' },
//   { to: '/admin/reports',   icon: BarChart2,       label: 'Reports' },
//   { to: '/admin/settings',  icon: Settings,        label: 'Settings' },
// ]

// export default function Sidebar() {
//   const navigate = useNavigate()

//   const handleLogout = () => {
//     localStorage.removeItem('token')
//     navigate('/login')
//   }

//   return (
//     <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0">
//       <div className="p-6 border-b border-slate-700">
//         <h1 className="text-xl font-bold tracking-tight">🎓 EduAdmin</h1>
//         <p className="text-xs text-slate-400 mt-1">Administration Panel</p>
//       </div>

//       <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
//         {links.map(({ to, icon: Icon, label }) => (
//           <NavLink
//             key={to}
//             to={to}
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
//                 isActive
//                   ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
//                   : 'text-slate-400 hover:bg-slate-800 hover:text-white'
//               }`
//             }
//           >
//             <Icon size={17} />
//             {label}
//           </NavLink>
//         ))}
//       </nav>

//       <div className="p-4 border-t border-slate-700">
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
//         >
//           <LogOut size={17} />
//           Logout
//         </button>
//       </div>
//     </aside>
//   )
// }


import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users, GraduationCap, BookOpen,
  BarChart2, Settings, CalendarDays, UserCog,
  ClipboardList, LogOut
} from 'lucide-react'

const links = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/users',     icon: Users,           label: 'User Management' },
  { to: '/admin/students',  icon: GraduationCap,   label: 'Student Records' },
  { to: '/admin/courses',   icon: BookOpen,        label: 'Course Catalog' },
  { to: '/admin/faculty',   icon: UserCog,         label: 'Faculty Management' },
  { to: '/admin/results',   icon: ClipboardList,   label: 'Results' },
  { to: '/admin/calendar',  icon: CalendarDays,    label: 'Academic Calendar' },
  { to: '/admin/reports',   icon: BarChart2,       label: 'Reports' },
  { to: '/admin/settings',  icon: Settings,        label: 'Settings' },
]

export default function Sidebar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold tracking-tight">⚙️ SWE<span className="text-blue-500">Hub</span></h1>
        <p className="text-xs text-slate-400 mt-1">Administration Panel</p>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </aside>
  )
}
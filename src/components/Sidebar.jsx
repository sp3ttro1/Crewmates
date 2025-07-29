import { NavLink } from 'react-router-dom'
import { UserPlus, Users, Home } from 'lucide-react'

const Sidebar = () => {
  return (
    <aside className="w-64 bg-indigo-800 text-white flex flex-col p-6">
      <h1 className="text-3xl font-bold mb-8">Crewmates</h1>
      <nav className="flex flex-col space-y-4">
        <NavLink
          to="/"
          className="flex items-center gap-2 hover:text-yellow-400 transition-all"
        >
          <Home size={20} /> Home
        </NavLink>
        <NavLink
          to="/create"
          className="flex items-center gap-2 hover:text-yellow-400 transition-all"
        >
          <UserPlus size={20} /> Create
        </NavLink>
        <NavLink
          to="/gallery"
          className="flex items-center gap-2 hover:text-yellow-400 transition-all"
        >
          <Users size={20} /> Gallery
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar
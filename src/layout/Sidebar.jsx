import { NavLink } from "react-router-dom";
import { LayoutDashboard, CheckSquare, FileText, Timer, Settings } from "lucide-react";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/tasks", label: "Tasks", icon: CheckSquare },
  { to: "/notes", label: "Notes", icon: FileText },
  { to: "/timer", label: "Timer", icon: Timer },
];

export default function Sidebar({ open, onClose }) {
  return (
    <aside
      className={`w-64 min-h-screen bg-[#1a1d2e] text-white flex flex-col shrink-0
        fixed inset-y-0 left-0 z-30 transition-transform duration-300
        lg:static lg:translate-x-0
        ${open ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex items-center gap-2 px-6 py-5 border-b border-white/10 ">
        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
          <Timer size={16} className="text-white" />
        </div>
        <div className="px-6 py-5">
  <h1 className="text-2xl font-black text-indigo-600 tracking-tight">
    StudySphere
  </h1>
  <p className="text-xs text-gray-400 mt-1 font-medium">
    Student Productivity Hub
  </p>
</div>
       
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl  transition-all duration-200 ${
                isActive
                  ? "bg-indigo-50 text-indigo-600 font-semibold"
                  : "text-gray-500 hover:bg-gray-100"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
      
    </aside>
  );
}

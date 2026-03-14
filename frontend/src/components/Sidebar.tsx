import React from 'react'
import { LayoutDashboard, Users, SquareCheck as CheckSquare, DollarSign, UserCog, Settings, LogOut } from 'lucide-react'

interface SidebarProps {
  currentPage: string
  onNavigate: (page: string) => void
  onLogout: () => void // ✅ já definido
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onNavigate, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'funcionarios', icon: Users, label: 'Funcionários' },
    { id: 'tarefas', icon: CheckSquare, label: 'Tarefas' },
    { id: 'financeiro', icon: DollarSign, label: 'Financeiro' },
    { id: 'usuarios', icon: UserCog, label: 'Usuários' },
    { id: 'configuracoes', icon: Settings, label: 'Manual do sistema' },
  ]

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Mini ERP</h1>
        <p className="text-sm text-gray-500 mt-1">Gestão Empresarial</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Botão de Sair */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onLogout} // ✅ chamando a função que fará logout
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium">Sair</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
import React, { useState, useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import Dashboard from '@/components/Dashboard'
import Funcionarios from '@/components/Funcionarios'
import Tarefas from '@/components/Tarefas'
import Financeiro from '@/components/Financeiro'
import Usuarios from '@/components/Usuarios'
import Configuracoes from '@/components/Configuracoes'
import Login from '@/components/Login'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState('')
  const [currentPage, setCurrentPage] = useState('dashboard')

  // Verifica se há usuário no localStorage
  useEffect(() => {
    // Durante o desenvolvimento, sempre começa no Login
    if (process.env.NODE_ENV === 'development') {
      setIsLoggedIn(false)
      setCurrentUser('')
      return
    }

    const loggedUser = localStorage.getItem('mini_erp_user')
    if (loggedUser) {
      setCurrentUser(loggedUser)
      setIsLoggedIn(true)
    }
  }, [])

  // Função de login
  const handleLogin = (username: string) => {
    localStorage.setItem('mini_erp_user', username)
    setCurrentUser(username)
    setIsLoggedIn(true)
    setCurrentPage('dashboard') // após login, abre Dashboard
  }

  // Função de logout
  const handleLogout = () => {
    localStorage.removeItem('mini_erp_user')
    setIsLoggedIn(false)
    setCurrentUser('')
    setCurrentPage('dashboard')
  }

  // Se não estiver logado, sempre mostra o Login
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />
  }

  // Renderiza a página atual
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'funcionarios':
        return <Funcionarios />
      case 'tarefas':
        return <Tarefas />
      case 'financeiro':
        return <Financeiro />
      case 'usuarios':
        return <Usuarios />
      case 'configuracoes':
        return <Configuracoes />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onLogout={handleLogout}
      />
      <main className="flex-1 overflow-y-auto">{renderPage()}</main>
    </div>
  )
}

export default App
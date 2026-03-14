import React, { useState } from 'react'
import { Moon, Sun } from 'lucide-react'

const Configuracoes: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [message, setMessage] = useState('')

  const handleToggleTheme = () => {
    setIsDarkTheme(!isDarkTheme)
    setMessage(`Tema ${!isDarkTheme ? 'escuro' : 'claro'} ativado!`)
    setTimeout(() => setMessage(''), 3000)
  }

  return (
    <div className="p-8 space-y-6">
      {/* Título */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Manual do Sistema</h2>
        <p className="text-gray-600 mt-1">
          Aqui você encontra informações de como utilizar o Mini ERP.
        </p>
      </div>

      {/* Mensagem de feedback */}
      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
          {message}
        </div>
      )}

      {/* Seção de Manual */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Como funciona o sistema</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Cadastro de funcionários: Adicione, edite e remova funcionários da empresa.</li>
          <li>Cadastro de usuários: Controle quem pode acessar o sistema e suas permissões.</li>
          <li>Cadastro de tarefas: Crie tarefas e organize a rotina da equipe.</li>
          <li>Controle financeiro: Cadastre entradas e saídas de dinheiro.</li>
        </ul>
      </div>

      {/* Seção de Tema */}
  
      {/* Informações do Sistema */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Informações do Sistema</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Versão:</span>
            <span className="font-medium text-gray-900">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Última atualização:</span>
            <span className="font-medium text-gray-900">{new Date().toLocaleDateString('pt-BR')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status:</span>
            <span className="font-medium text-green-600">Operacional</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Configuracoes
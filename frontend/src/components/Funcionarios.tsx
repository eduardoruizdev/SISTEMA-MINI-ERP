import React, { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, X } from 'lucide-react'

// Interface do funcionário
interface Funcionario {
  id: number
  nome: string
  cargo: string
  email: string
  salario: number
  dataAdmissao: string
}

const Funcionarios: React.FC = () => {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({ nome: '', cargo: '', email: '', salario: '', dataAdmissao: '' })

  // URL base da API
 const API_URL = 'https://localhost:7181/api/FuncionarioApi'

  // Carrega os funcionários do backend
 useEffect(() => {
  const carregarFuncionarios = async () => {
    try {
      const res = await fetch('https://localhost:7181/api/FuncionarioApi')

      console.log("STATUS:", res.status)

      const data = await res.json()

      console.log("DADOS:", data)

      setFuncionarios(data)

    } catch (erro) {
      console.error("ERRO COMPLETO:", erro)
    }
  }

  carregarFuncionarios()
}, [])
  const handleAdd = () => {
    setEditingId(null)
    setFormData({ nome: '', cargo: '', email: '', salario: '', dataAdmissao: '' })
    setShowModal(true)
  }

  const handleEdit = (funcionario: Funcionario) => {
    setEditingId(funcionario.id)
    setFormData({
      nome: funcionario.nome,
      cargo: funcionario.cargo,
      email: funcionario.email,
      salario: funcionario.salario.toString(),
      dataAdmissao: funcionario.dataAdmissao.split('T')[0], // garante formato YYYY-MM-DD
    })
    setShowModal(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Deseja realmente excluir este funcionário?')) return

    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      setFuncionarios(funcionarios.filter(f => f.id !== id))
    } catch (err) {
      console.error('Erro ao excluir funcionário:', err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload = {
      nome: formData.nome,
      cargo: formData.cargo,
      email: formData.email,
      salario: parseFloat(formData.salario),
      dataAdmissao: formData.dataAdmissao
    }

    try {
      if (editingId !== null) {

  await fetch(`${API_URL}/${editingId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  setFuncionarios(funcionarios.map(f =>
    f.id === editingId ? { id: editingId, ...payload } : f
  ))

} else {

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  const novoFuncionario = await res.json()
  setFuncionarios([...funcionarios, novoFuncionario])

}
      setShowModal(false)
    } catch (err) {
      console.error('Erro ao salvar funcionário:', err)
    }
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Funcionários</h2>
          <p className="text-gray-600 mt-1">Gerencie os funcionários da empresa</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus size={20} />
          Adicionar Funcionário
        </button>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Nome</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Cargo</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Salário</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Data de Admissão</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {funcionarios.map(f => (
              <tr key={f.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-gray-900">{f.nome}</td>
                <td className="px-6 py-4 text-gray-600">{f.cargo}</td>
                <td className="px-6 py-4 text-gray-600">{f.email}</td>
                <td className="px-6 py-4 text-gray-900">R$ {f.salario.toLocaleString()}</td>
                <td className="px-6 py-4 text-gray-600">{new Date(f.dataAdmissao).toLocaleDateString('pt-BR')}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(f)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(f.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">{editingId ? 'Editar Funcionário' : 'Novo Funcionário'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cargo</label>
                <input
                  type="text"
                  value={formData.cargo}
                  onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Salário</label>
                <input
                  type="number"
                  value={formData.salario}
                  onChange={(e) => setFormData({ ...formData, salario: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data de Admissão</label>
                <input
                  type="date"
                  value={formData.dataAdmissao}
                  onChange={(e) => setFormData({ ...formData, dataAdmissao: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Cancelar
                </button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  {editingId ? 'Salvar' : 'Adicionar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Funcionarios
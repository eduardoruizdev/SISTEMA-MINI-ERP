import React, { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, X } from 'lucide-react'

const API_URL = `${import.meta.env.VITE_API_URL}/UsuarioApi`

interface Usuario {
  id: number
  nome: string
  senha: string
}

const Usuarios: React.FC = () => {

  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)

  const [formData, setFormData] = useState({
    nome: '',
    senha: ''
  })

  // 🔹 Buscar usuários
  const fetchUsuarios = async () => {

    try {

      const response = await fetch(API_URL)
      const data = await response.json()

      const lista: Usuario[] = data.map((u: any) => ({
        id: u.id,
        nome: u.nome,
        senha: u.senha
      }))

      setUsuarios(lista)

    } catch (error) {
      console.error("Erro ao buscar usuários:", error)
    }

  }

  useEffect(() => {
    fetchUsuarios()
  }, [])

  // 🔹 Novo usuário
  const handleAdd = () => {

    setEditingId(null)

    setFormData({
      nome: '',
      senha: ''
    })

    setShowModal(true)

  }

  // 🔹 Editar usuário
  const handleEdit = (usuario: Usuario) => {

    setEditingId(usuario.id)

    setFormData({
      nome: usuario.nome,
      senha: usuario.senha
    })

    setShowModal(true)

  }

  // 🔹 Excluir usuário
  const handleDelete = async (id: number) => {

    if (!confirm('Deseja realmente excluir este usuário?')) return

    try {

      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      })

      fetchUsuarios()

    } catch (error) {

      console.error("Erro ao excluir usuário:", error)

    }

  }

  // 🔹 Salvar usuário
  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    const method = editingId ? 'PUT' : 'POST'
    const url = editingId ? `${API_URL}/${editingId}` : API_URL

    try {

      await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      fetchUsuarios()
      setShowModal(false)

    } catch (error) {

      console.error("Erro ao salvar usuário:", error)

    }

  }

  return (
    <div className="p-8 space-y-6">

      <div className="flex justify-between items-center">

        <div>
          <h2 className="text-3xl font-bold text-gray-900">Usuários</h2>
          <p className="text-gray-600 mt-1">Gerencie os usuários do sistema</p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus size={20} />
          Adicionar Usuário
        </button>

      </div>

      <div className="bg-white rounded-xl border overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-50 border-b">

            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">Nome</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Ações</th>
            </tr>

          </thead>

          <tbody className="divide-y">

            {usuarios.map((usuario) => (

              <tr key={usuario.id} className="hover:bg-gray-50">

                <td className="px-6 py-4 font-medium">
                  {usuario.nome}
                </td>

                <td className="px-6 py-4">

                  <div className="flex gap-2">

                    <button
                      onClick={() => handleEdit(usuario)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Edit2 size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(usuario.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* MODAL */}

      {showModal && (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

          <div className="bg-white rounded-xl max-w-md w-full p-6">

            <div className="flex justify-between mb-6">

              <h3 className="text-2xl font-bold">
                {editingId ? 'Editar Usuário' : 'Novo Usuário'}
              </h3>

              <button onClick={() => setShowModal(false)}>
                <X size={24}/>
              </button>

            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div>

                <label className="block text-sm font-medium mb-2">
                  Nome
                </label>

                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e)=> setFormData({...formData, nome:e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />

              </div>

              <div>

                <label className="block text-sm font-medium mb-2">
                  Senha
                </label>

                <input
                  type="password"
                  value={formData.senha}
                  onChange={(e)=> setFormData({...formData, senha:e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                  minLength={6}
                />

              </div>

              <div className="flex gap-3 pt-4">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border rounded-lg"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
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

export default Usuarios
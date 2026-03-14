import React, { useState, useEffect } from 'react'
import { Plus, Edit2, X } from 'lucide-react'

const API_URL = `${import.meta.env.VITE_API_URL}/TarefaApi`
const FUNCIONARIO_URL = `${import.meta.env.VITE_API_URL}/FuncionarioApi`

interface Tarefa {
  id: number
  titulo: string
  descricao: string
  responsavel: number
  dataLimite: string
  status: 'Pendente' | 'Em andamento' | 'Concluído'
}

interface Funcionario {
  id: number
  nome: string
}

const Tarefas: React.FC = () => {

  const [tarefas, setTarefas] = useState<Tarefa[]>([])
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([])

  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)

  const [formData, setFormData] = useState<Tarefa>({
    id: 0,
    titulo: '',
    descricao: '',
    responsavel: 0,
    dataLimite: '',
    status: 'Pendente'
  })

  // 🔹 Buscar tarefas
  const fetchTarefas = async () => {
    try {

      const response = await fetch(API_URL)
      const data = await response.json()

      const tarefasConvertidas: Tarefa[] = data.map((t: any) => ({
        id: t.id,
        titulo: t.nome,
        descricao: t.descricao,
        responsavel: t.idfuncionario,
        dataLimite: t.datalimite?.split('T')[0],
        status: t.status
      }))

      setTarefas(tarefasConvertidas)

    } catch (error) {
      console.error("Erro ao buscar tarefas:", error)
    }
  }

  // 🔹 Buscar funcionários
  const fetchFuncionarios = async () => {
    try {

      const response = await fetch(FUNCIONARIO_URL)
      const data = await response.json()

      const lista: Funcionario[] = data.map((f: any) => ({
        id: f.id,
        nome: f.nome
      }))

      setFuncionarios(lista)

    } catch (error) {
      console.error("Erro ao buscar funcionários:", error)
    }
  }

  useEffect(() => {
    fetchTarefas()
    fetchFuncionarios()
  }, [])

  // 🔹 Nova tarefa
  const handleAdd = () => {

    setEditingId(null)

    setFormData({
      id: 0,
      titulo: '',
      descricao: '',
      responsavel: 0,
      dataLimite: '',
      status: 'Pendente'
    })

    setShowModal(true)
  }

  // 🔹 Editar tarefa
  const handleEdit = (tarefa: Tarefa) => {
    setEditingId(tarefa.id)
    setFormData(tarefa)
    setShowModal(true)
  }

  // 🔹 Alterar status
  const handleChangeStatus = async (id: number, status: Tarefa['status']) => {

    const tarefa = tarefas.find(t => t.id === id)
    if (!tarefa) return

    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: tarefa.titulo,
        descricao: tarefa.descricao,
        idfuncionario: tarefa.responsavel,
        datalimite: tarefa.dataLimite,
        status: status
      })
    })

    fetchTarefas()
  }

  // 🔹 Criar ou editar
  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    const body = {
      nome: formData.titulo,
      descricao: formData.descricao,
      idfuncionario: formData.responsavel,
      datalimite: formData.dataLimite,
      status: formData.status
    }

    try {

      if (editingId) {

        await fetch(`${API_URL}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        })

      } else {

        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        })

      }

      fetchTarefas()
      setShowModal(false)

    } catch (error) {
      console.error("Erro ao salvar tarefa:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Concluído': return 'bg-green-100 text-green-700'
      case 'Em andamento': return 'bg-blue-100 text-blue-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getNomeFuncionario = (id: number) => {
    const func = funcionarios.find(f => f.id === id)
    return func ? func.nome : "Não definido"
  }

  return (
    <div className="p-8 space-y-6">

      <div className="flex justify-between items-center">

        <div>
          <h2 className="text-3xl font-bold text-gray-900">Tarefas</h2>
          <p className="text-gray-600 mt-1">Gerencie as tarefas do sistema</p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus size={20}/>
          Nova Tarefa
        </button>

      </div>

      <div className="grid gap-4">

        {tarefas.map((tarefa) => (

          <div key={tarefa.id} className="bg-white rounded-xl border p-6">

            <div className="flex justify-between items-start mb-4">

              <div className="flex-1">

                <h3 className="text-xl font-bold mb-2">
                  {tarefa.titulo}
                </h3>

                <p className="text-gray-600 mb-4">
                  {tarefa.descricao}
                </p>

                <div className="flex gap-4 text-sm">

                  <div>
                    <span className="text-gray-500">Responsável:</span>{' '}
                    <span className="font-medium">
                      {getNomeFuncionario(tarefa.responsavel)}
                    </span>
                  </div>

                  <div>
                    <span className="text-gray-500">Data limite:</span>{' '}
                    <span className="font-medium">
                      {new Date(tarefa.dataLimite).toLocaleDateString('pt-BR')}
                    </span>
                  </div>

                </div>

              </div>

              <button
                onClick={() => handleEdit(tarefa)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                <Edit2 size={18}/>
              </button>

            </div>

            <div className="flex gap-2">

              {(['Pendente','Em andamento','Concluído'] as const).map((status)=> (

                <button
                  key={status}
                  onClick={()=> handleChangeStatus(tarefa.id,status)}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    tarefa.status === status
                    ? getStatusColor(status)
                    : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {status}
                </button>

              ))}

            </div>

          </div>

        ))}

      </div>

      {showModal && (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

          <div className="bg-white rounded-xl max-w-md w-full p-6">

            <div className="flex justify-between items-center mb-6">

              <h3 className="text-2xl font-bold">
                {editingId ? 'Editar Tarefa' : 'Nova Tarefa'}
              </h3>

              <button onClick={()=> setShowModal(false)}>
                <X size={24}/>
              </button>

            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

              <input
                type="text"
                placeholder="Título"
                value={formData.titulo}
                onChange={(e)=> setFormData({...formData, titulo:e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />

              <textarea
                placeholder="Descrição"
                value={formData.descricao}
                onChange={(e)=> setFormData({...formData, descricao:e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />

              <select
                value={formData.responsavel}
                onChange={(e)=> setFormData({...formData, responsavel:Number(e.target.value)})}
                className="w-full px-4 py-2 border rounded-lg"
                required
              >
                <option value="">Selecione o responsável</option>

                {funcionarios.map((func)=>(
                  <option key={func.id} value={func.id}>
                    {func.nome}
                  </option>
                ))}

              </select>

              <input
                type="date"
                value={formData.dataLimite}
                onChange={(e)=> setFormData({...formData, dataLimite:e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />

              <select
                value={formData.status}
                onChange={(e)=> setFormData({...formData, status:e.target.value as Tarefa['status']})}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="Pendente">Pendente</option>
                <option value="Em andamento">Em andamento</option>
                <option value="Concluído">Concluído</option>
              </select>

              <div className="flex gap-3 pt-4">

                <button
                  type="button"
                  onClick={()=> setShowModal(false)}
                  className="flex-1 px-4 py-2 border rounded-lg"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  {editingId ? 'Salvar' : 'Criar'}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  )
}

export default Tarefas
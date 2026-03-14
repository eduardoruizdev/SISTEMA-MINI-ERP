import React, { useState, useEffect } from 'react'
import { Plus, X, TrendingUp, TrendingDown, Wallet } from 'lucide-react'

const API_URL = `${import.meta.env.VITE_API_URL}/MovimentacaoApi`

interface Movimentacao {
  id: number
  tipo: 'Entrada' | 'Saída'
  valor: number
  categoria: string
  data_movimentacao: string
  descricao: string
}

const Financeiro: React.FC = () => {

  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([])
  const [showModal, setShowModal] = useState(false)

  const [formData, setFormData] = useState({
    tipo: 'Entrada' as Movimentacao['tipo'],
    valor: '',
    categoria: '',
    data: '',
    descricao: ''
  })

  // 🔹 Buscar movimentações
  const fetchMovimentacoes = async () => {
    try {
      const response = await fetch(API_URL)
      const data = await response.json()

      const lista: Movimentacao[] = data.map((m: any) => ({
        id: m.id,
        tipo: m.tipo,
        valor: m.valor,
        categoria: m.categoria,
        data_movimentacao: m.data_movimentacao?.split('T')[0] || '', // mantém apenas a data
        descricao: m.descricao
      }))

      setMovimentacoes(lista)

    } catch (error) {
      console.error("Erro ao buscar movimentações:", error)
    }
  }

  useEffect(() => {
    fetchMovimentacoes()
  }, [])

  // 🔹 Totais automáticos
  const totalReceita = movimentacoes
    .filter(m => m.tipo === 'Entrada')
    .reduce((sum, m) => sum + m.valor, 0)

  const totalDespesa = movimentacoes
    .filter(m => m.tipo === 'Saída')
    .reduce((sum, m) => sum + m.valor, 0)

  const saldo = totalReceita - totalDespesa

  // 🔹 Abrir modal
  const handleAdd = () => {
    setFormData({
      tipo: 'Entrada',
      valor: '',
      categoria: '',
      data: '',
      descricao: ''
    })
    setShowModal(true)
  }

  // 🔹 Criar movimentação
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 🔹 Correção: enviar a data exatamente como selecionada
    const body = {
      tipo: formData.tipo,
      valor: Number(formData.valor),
      categoria: formData.categoria,
      descricao: formData.descricao,
      data_movimentacao: formData.data // mantém "YYYY-MM-DD" para o backend
    }

    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })

      fetchMovimentacoes()
      setShowModal(false)
    } catch (error) {
      console.error("Erro ao salvar movimentação:", error)
    }
  }

  return (
    <div className="p-8 space-y-6">

      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Financeiro</h2>
          <p className="text-gray-600 mt-1">Controle financeiro da empresa</p>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus size={20}/>
          Nova Movimentação
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-green-100">
              <TrendingUp className="text-green-600" size={24}/>
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Receita Total</p>
          <p className="text-3xl font-bold text-gray-900">
            R$ {totalReceita.toLocaleString('pt-BR')}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-red-100">
              <TrendingDown className="text-red-600" size={24}/>
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Despesas Totais</p>
          <p className="text-3xl font-bold text-gray-900">
            R$ {totalDespesa.toLocaleString('pt-BR')}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 border">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-blue-100">
              <Wallet className="text-blue-600" size={24}/>
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-1">Saldo Atual</p>
          <p className={`text-3xl font-bold ${saldo >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            R$ {saldo.toLocaleString('pt-BR')}
          </p>
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">Tipo</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Valor</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Categoria</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Data</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Descrição</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {movimentacoes.map((mov) => (
              <tr key={mov.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    mov.tipo === 'Entrada'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                  }`}>
                    {mov.tipo}
                  </span>
                </td>
                <td className={`px-6 py-4 font-semibold ${
                  mov.tipo === 'Entrada'
                  ? 'text-green-600'
                  : 'text-red-600'
                }`}>
                  R$ {mov.valor.toLocaleString('pt-BR')}
                </td>
                <td className="px-6 py-4">{mov.categoria}</td>
                <td className="px-6 py-4">
                  {mov.data_movimentacao
                    ? mov.data_movimentacao.split('-').reverse().join('/') // Exibe DD/MM/YYYY
                    : '-'}
                </td>
                <td className="px-6 py-4">{mov.descricao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between mb-6">
              <h3 className="text-2xl font-bold">Nova Movimentação</h3>
              <button onClick={() => setShowModal(false)}>
                <X size={24}/>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <select
                value={formData.tipo}
                onChange={(e) => setFormData({...formData, tipo: e.target.value as Movimentacao['tipo']})}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="Entrada">Entrada</option>
                <option value="Saída">Saída</option>
              </select>

              <input
                type="number"
                placeholder="Valor"
                value={formData.valor}
                onChange={(e) => setFormData({...formData, valor: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />

              <input
                type="text"
                placeholder="Categoria"
                value={formData.categoria}
                onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />

              <input
                type="date"
                value={formData.data}
                onChange={(e) => setFormData({...formData, data: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />

              <textarea
                placeholder="Descrição"
                value={formData.descricao}
                onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />

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
                  Adicionar
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  )
}

export default Financeiro
import React, { useState, useEffect } from 'react'
import { Users, CheckSquare, TrendingUp, TrendingDown, Wallet } from 'lucide-react'

const API_URL = `${import.meta.env.VITE_API_URL}/DashboardApi`

interface DashboardData {
  totalFuncionarios: number
  tarefasPendentes: number
  receitaTotal: number
  despesaTotal: number
}

const Dashboard: React.FC = () => {

  const [data, setData] = useState<DashboardData>({
    totalFuncionarios: 0,
    tarefasPendentes: 0,
    receitaTotal: 0,
    despesaTotal: 0
  })

  const fetchDashboard = async () => {

    try {

      const response = await fetch(API_URL)
      const result = await response.json()

      setData(result)

    } catch (error) {

      console.error("Erro ao carregar dashboard:", error)

    }

  }

  useEffect(() => {
    fetchDashboard()
  }, [])

  const saldo = data.receitaTotal - data.despesaTotal

  const stats = [
    {
      label: 'Total de Funcionários',
      value: data.totalFuncionarios,
      icon: Users,
      color: 'blue'
    },
    {
      label: 'Tarefas Pendentes',
      value: data.tarefasPendentes,
      icon: CheckSquare,
      color: 'orange'
    },
    {
      label: 'Receita Total',
      value: `R$ ${data.receitaTotal.toLocaleString('pt-BR')}`,
      icon: TrendingUp,
      color: 'green'
    },
    {
      label: 'Despesas Totais',
      value: `R$ ${data.despesaTotal.toLocaleString('pt-BR')}`,
      icon: TrendingDown,
      color: 'red'
    },
    {
      label: 'Saldo Atual',
      value: `R$ ${saldo.toLocaleString('pt-BR')}`,
      icon: Wallet,
      color: 'purple'
    }
  ]

  return (
    <div className="p-8 space-y-8">

      <div>
        <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600 mt-1">Visão geral do sistema</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">

        {stats.map((stat, index) => {

          const Icon = stat.icon

          return (

            <div
              key={index}
              className="bg-white rounded-xl p-6 border hover:shadow-lg transition-shadow"
            >

              <div className="flex items-center justify-between mb-4">

                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <Icon className={`text-${stat.color}-600`} size={24}/>
                </div>

              </div>

              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>

            </div>

          )

        })}

      </div>

    </div>
  )
}

export default Dashboard
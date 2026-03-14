using ClassesProjetoERP.Classes.Models;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClassesProjetoERP.Classes.Controller
{
    public class MovimentacaoController
    {

        #region Cadastrar Movimentacao
        public void CadastrarMovimentacao(Movimentacao movimentacao)
        {
            using (var conexao = Database.GetConnection())
            {
                conexao.Open();

                MySqlCommand cadastrar = new MySqlCommand("sp_inserir_movimentacao", conexao);
                cadastrar.CommandType = System.Data.CommandType.StoredProcedure;

                cadastrar.Parameters.AddWithValue("p_tipo", movimentacao.Tipo);
                cadastrar.Parameters.AddWithValue("p_valor", movimentacao.Valor);
                cadastrar.Parameters.AddWithValue("p_categoria", movimentacao.Categoria);
                cadastrar.Parameters.AddWithValue("p_data", movimentacao.Data_movimentacao);
                cadastrar.Parameters.AddWithValue("p_descricao", movimentacao.Descricao);

                cadastrar.ExecuteNonQuery();
            }
        }
        #endregion


        #region Atualizar Movimentacao
        public void AtualizarMovimentacao(Movimentacao movimentacao)
        {
            using (var conexao = Database.GetConnection())
            {
                conexao.Open();

                MySqlCommand atualizar = new MySqlCommand("sp_atualizar_movimentacao", conexao);
                atualizar.CommandType = System.Data.CommandType.StoredProcedure;

                atualizar.Parameters.AddWithValue("p_id", movimentacao.Id);
                atualizar.Parameters.AddWithValue("p_tipo", movimentacao.Tipo);
                atualizar.Parameters.AddWithValue("p_valor", movimentacao.Valor);
                atualizar.Parameters.AddWithValue("p_categoria", movimentacao.Categoria);
                atualizar.Parameters.AddWithValue("p_data", movimentacao.Data_movimentacao);
                atualizar.Parameters.AddWithValue("p_descricao", movimentacao.Descricao);

                atualizar.ExecuteNonQuery();
            }
        }
        #endregion


        #region Excluir Movimentacao
        public void ExcluirMovimentacao(int id)
        {
            using (var conexao = Database.GetConnection())
            {
                conexao.Open();

                MySqlCommand excluir = new MySqlCommand("sp_excluir_movimentacao", conexao);
                excluir.CommandType = System.Data.CommandType.StoredProcedure;

                excluir.Parameters.AddWithValue("p_id", id);

                excluir.ExecuteNonQuery();
            }
        }
        #endregion


        #region Listar Movimentacao
        public List<Movimentacao> ListarMovimentacao()
        {
            List<Movimentacao> lista = new List<Movimentacao>();

            using (var conexao = Database.GetConnection())
            {
                conexao.Open();

                MySqlCommand cmd = new MySqlCommand("sp_listar_movimentacao", conexao);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                MySqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    Movimentacao movimentacao = new Movimentacao();

                    movimentacao.Id = Convert.ToInt32(reader["id_movimentacao"]);
                    movimentacao.Tipo = reader["tp_movimentacao"].ToString();
                    movimentacao.Valor = Convert.ToDecimal(reader["vl_movimentacao"]);
                    movimentacao.Categoria = reader["nm_categoria_movimentacao"].ToString(); // corrigido
                    movimentacao.Data_movimentacao = Convert.ToDateTime(reader["dt_movimentacao"]);
                    movimentacao.Descricao = reader["ds_movimentacao"].ToString();

                    lista.Add(movimentacao);
                }
            }

            return lista;
        }
        #endregion

        #region DASHBOARD

        public int TotalFuncionarios()
        {
            using (var conexao = Database.GetConnection())
            {
                conexao.Open();

                MySqlCommand totalfuncionarios = new MySqlCommand("sp_total_funcionarios", conexao);
                totalfuncionarios.CommandType = System.Data.CommandType.StoredProcedure;

                object resultado = totalfuncionarios.ExecuteScalar();

                return resultado != null ? Convert.ToInt32(resultado) : 0;
            }
        }


        public int TarefasPendentes()
        {
            using (var conexao = Database.GetConnection())
            {
                conexao.Open();

                MySqlCommand tarefaspendentes = new MySqlCommand("sp_tarefas_pendentes", conexao);
                tarefaspendentes.CommandType = System.Data.CommandType.StoredProcedure;

                object resultado = tarefaspendentes.ExecuteScalar();

                return resultado != null ? Convert.ToInt32(resultado) : 0;
            }
        }


        public decimal ReceitaTotal()
        {
            using (var conexao = Database.GetConnection())
            {
                conexao.Open();

                MySqlCommand receitatotal = new MySqlCommand("sp_receita_total", conexao);
                receitatotal.CommandType = System.Data.CommandType.StoredProcedure;

                object resultado = receitatotal.ExecuteScalar();

                // Verifica se o resultado não é DBNull antes de converter
                return (resultado != null && resultado != DBNull.Value) ? Convert.ToDecimal(resultado) : 0m;
            }
        }


        public decimal DespesaTotal()
        {
            using (var conexao = Database.GetConnection())
            {
                conexao.Open();

                MySqlCommand despesatotal = new MySqlCommand("sp_despesa_total", conexao);
                despesatotal.CommandType = System.Data.CommandType.StoredProcedure;

                object resultado = despesatotal.ExecuteScalar();

                // Verifica se o resultado não é DBNull antes de converter
                return (resultado != null && resultado != DBNull.Value) ? Convert.ToDecimal(resultado) : 0m;
            }
        }
        #endregion
    }
}
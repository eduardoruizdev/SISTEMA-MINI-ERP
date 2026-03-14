using ClassesProjetoERP.Classes.Models;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClassesProjetoERP.Classes.Controller
{
    public class TarefaController
    {

        #region Cadastrar Tarefa
        public void CadastrarTarefa(Tarefa tarefa)
        {
            using (var conexao = Database.GetConnection())
            {
                conexao.Open();

                MySqlCommand cadastrarTarefa = new MySqlCommand("sp_inserir_tarefa", conexao);
                cadastrarTarefa.CommandType = System.Data.CommandType.StoredProcedure;

                cadastrarTarefa.Parameters.AddWithValue("p_titulo", tarefa.Nome);
                cadastrarTarefa.Parameters.AddWithValue("p_descricao", tarefa.Descricao);
                cadastrarTarefa.Parameters.AddWithValue("p_funcionario", tarefa.Idfuncionario);
                cadastrarTarefa.Parameters.AddWithValue("p_data_limite", tarefa.Datalimite);
                cadastrarTarefa.Parameters.AddWithValue("p_status", tarefa.Status);

                cadastrarTarefa.ExecuteNonQuery();
            }
        }
        #endregion


        #region Atualizar Tarefa
        public void AtualizarTarefa(Tarefa tarefa)
        {
            using (var conexao = Database.GetConnection())
            {
                conexao.Open();

                MySqlCommand atualizar = new MySqlCommand("sp_atualizar_tarefa", conexao);
                atualizar.CommandType = System.Data.CommandType.StoredProcedure;

                atualizar.Parameters.AddWithValue("p_id", tarefa.Id);
                atualizar.Parameters.AddWithValue("p_titulo", tarefa.Nome);
                atualizar.Parameters.AddWithValue("p_descricao", tarefa.Descricao);
                atualizar.Parameters.AddWithValue("p_funcionario", tarefa.Idfuncionario);
                atualizar.Parameters.AddWithValue("p_data_limite", tarefa.Datalimite);
                atualizar.Parameters.AddWithValue("p_status", tarefa.Status);

                atualizar.ExecuteNonQuery();
            }
        }
        #endregion


        #region Atualizar Status da Tarefa
        public void AtualizarStatusTarefa(int id, string status)
        {
            using (var conexao = Database.GetConnection())
            {
                conexao.Open();

                MySqlCommand atualizarStatus = new MySqlCommand("sp_atualizar_status_tarefa", conexao);
                atualizarStatus.CommandType = System.Data.CommandType.StoredProcedure;

                atualizarStatus.Parameters.AddWithValue("p_id", id);
                atualizarStatus.Parameters.AddWithValue("p_status", status);

                atualizarStatus.ExecuteNonQuery();
            }
        }
        #endregion


        #region Excluir Tarefa
        public void ExcluirTarefa(int id)
        {
            using (var conexao = Database.GetConnection())
            {
                conexao.Open();

                MySqlCommand excluir = new MySqlCommand("sp_excluir_tarefa", conexao);
                excluir.CommandType = System.Data.CommandType.StoredProcedure;

                excluir.Parameters.AddWithValue("p_id", id);

                excluir.ExecuteNonQuery();
            }
        }
        #endregion


        #region Listar Tarefa
        public List<Tarefa> ListarTarefa()
        {
            List<Tarefa> lista = new List<Tarefa>();

            using (var conexao = Database.GetConnection())
            {
                conexao.Open();

                MySqlCommand cmd = new MySqlCommand("sp_listar_tarefa", conexao);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                MySqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    Tarefa tarefa = new Tarefa();

                    tarefa.Id = Convert.ToInt32(reader["id_tarefa"]);
                    tarefa.Nome = reader["nm_titulo_tarefa"].ToString();
                    tarefa.Descricao = reader["ds_tarefa"].ToString();
                    tarefa.Idfuncionario = Convert.ToInt32(reader["id_funcionario"]);
                    tarefa.Datalimite = Convert.ToDateTime(reader["dt_limite_tarefa"]);
                    tarefa.Status = reader["ds_status_tarefa"].ToString();

                    lista.Add(tarefa);
                }
            }

            return lista;
        }
        #endregion

    }
}
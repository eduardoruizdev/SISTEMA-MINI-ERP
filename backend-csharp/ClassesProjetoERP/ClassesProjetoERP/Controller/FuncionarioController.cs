using ClassesProjetoERP.Classes.Models;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace ClassesProjetoERP.Classes.Controller
{
    public class FuncionarioController
    {
        #region cadastrar funcionario
        public Funcionario CadastrarFuncionario(Funcionario funcionario)
        {
            using (var conexao = Database.GetConnection())
            {
                conexao.Open();
                MySqlCommand Cadastrar = new MySqlCommand("sp_inserir_funcionario", conexao);
                Cadastrar.CommandType = System.Data.CommandType.StoredProcedure;

                Cadastrar.Parameters.AddWithValue("p_nome", funcionario.Nome);
                Cadastrar.Parameters.AddWithValue("p_cargo", funcionario.Cargo);
                Cadastrar.Parameters.AddWithValue("p_email", funcionario.Email);
                Cadastrar.Parameters.AddWithValue("p_salario", funcionario.Salario);
                Cadastrar.Parameters.AddWithValue("p_admissao", funcionario.DataAdmissao);

                Cadastrar.ExecuteNonQuery();
            }
            return funcionario;
        }
        #endregion

        #region Atualizar Funcionario
        public void AtualizarFuncionario(Funcionario funcionario)
        {
            using (var conexao = Database.GetConnection())
            {
                conexao.Open();
                MySqlCommand Atualizar = new MySqlCommand("sp_atualizar_funcionario", conexao);
                Atualizar.CommandType = System.Data.CommandType.StoredProcedure;

                Atualizar.Parameters.AddWithValue("p_id", funcionario.Id);
                Atualizar.Parameters.AddWithValue("p_nome", funcionario.Nome);
                Atualizar.Parameters.AddWithValue("p_cargo", funcionario.Cargo);
                Atualizar.Parameters.AddWithValue("p_email", funcionario.Email);
                Atualizar.Parameters.AddWithValue("p_salario", funcionario.Salario);
                Atualizar.Parameters.AddWithValue("p_admissao", funcionario.DataAdmissao);

                Atualizar.ExecuteNonQuery();
            }
        }
        #endregion

        #region Excluir Funcionario
        public void ExcluirFuncionario(int id)
        {
            using (var conexao = Database.GetConnection())
            {
                conexao.Open();
                MySqlCommand Excluir = new MySqlCommand("sp_excluir_funcionario", conexao);
                Excluir.CommandType = System.Data.CommandType.StoredProcedure;

                Excluir.Parameters.AddWithValue("p_id", id);

                Excluir.ExecuteNonQuery();
            }
        }
        #endregion

        #region Listar Funcionario
        public List<Funcionario> ListarFuncionario()
        {
            List<Funcionario> lista = new List<Funcionario>();

            using (var conexao = Database.GetConnection())
            {
                conexao.Open();

                MySqlCommand cmd = new MySqlCommand("sp_listar_funcionario", conexao);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;

                MySqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    Funcionario funcionario = new Funcionario();

                    funcionario.Id = Convert.ToInt32(reader["id_funcionario"]);
                    funcionario.Nome = reader["nm_funcionario"].ToString();
                    funcionario.Cargo = reader["nm_cargo_funcionario"].ToString();
                    funcionario.Email = reader["nm_email_funcionario"].ToString();
                    funcionario.Salario = Convert.ToDecimal(reader["vl_salario_funcionario"]);
                    funcionario.DataAdmissao = Convert.ToDateTime(reader["dt_admissao_funcionario"]);

                    lista.Add(funcionario);
                }
            }

            return lista;
        }
        #endregion

        public Funcionario ObterFuncionarioPorId(int id)
        {
            using (var conexao = Database.GetConnection())
            {
                conexao.Open();
                var cmd = new MySqlCommand("SELECT * FROM funcionario WHERE id_funcionario=@id", conexao);
                cmd.Parameters.AddWithValue("@id", id);

                using (var reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        return new Funcionario
                        {
                            Id = reader.GetInt32("id_funcionario"),
                            Nome = reader.GetString("nm_funcionario"),
                            Cargo = reader.GetString("nm_cargo_funcionario"),
                            Email = reader.GetString("nm_email_funcionario"),
                            Salario = reader.GetDecimal("vl_salario_funcionario"),
                            DataAdmissao = reader.GetDateTime("dt_admissao_funcionario")
                        };
                    }
                }
            }
            return null;
        }
    }
}

using ClassesProjetoERP.Classes.Models;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClassesProjetoERP.Classes.Controller
{
    public class UsuarioController
    {

        #region cadastrar usuario
        public void CadastrarUsuario(Usuario Usuario)
        {
            using (var conexao = Database.GetConnection())
            {
                conexao.Open();
                MySqlCommand comando = new MySqlCommand("sp_inserir_usuario", conexao);
                comando.CommandType = System.Data.CommandType.StoredProcedure;

                comando.Parameters.AddWithValue("p_login", Usuario.Nome);
                comando.Parameters.AddWithValue("p_senha", Usuario.Senha);

                comando.ExecuteNonQuery();
            }
        }
        #endregion

        #region Atualizar Usuario
        public void AtualizarUsuario (Usuario Usuario)
        {
            using (var conexao = Database.GetConnection())
            {
                conexao.Open();
                MySqlCommand Atualizar = new MySqlCommand("sp_atualizar_usuario", conexao);
                Atualizar.CommandType = System.Data.CommandType.StoredProcedure ;

                Atualizar.Parameters.AddWithValue("p_id", Usuario.Id);
                Atualizar.Parameters.AddWithValue("p_login",Usuario.Nome);
                Atualizar.Parameters.AddWithValue("p_senha",Usuario.Senha);

                Atualizar.ExecuteNonQuery ();
            }
        }
        #endregion

        #region Excluir Usuario
        public void ExcluirUsuario(int id)
        {
            using (var conexao = Database.GetConnection())
            {
                conexao.Open();

                MySqlCommand excluir = new MySqlCommand("sp_excluir_usuario", conexao);
                excluir.CommandType = System.Data.CommandType.StoredProcedure;

                excluir.Parameters.AddWithValue("p_id", id);

                excluir.ExecuteNonQuery();
            }
        }
        #endregion


        #region Listar Usuario
        public List<Usuario> ListarUsuario()
        {
            List<Usuario> lista = new List<Usuario>();

            using (var conexao = Database.GetConnection())
            {
                conexao.Open();

                MySqlCommand listarusuario = new MySqlCommand("sp_listar_usuario", conexao);
                listarusuario.CommandType = System.Data.CommandType.StoredProcedure;

                MySqlDataReader reader = listarusuario.ExecuteReader();

                while (reader.Read())
                {
                    lista.Add(new Usuario
                    {
                        Id = Convert.ToInt32(reader["id_usuario"]),
                        Nome = reader["nm_login_usuario"].ToString(),
                        Senha = reader["nm_senha_usuario"].ToString()
                    });
                }
            }

            return lista;
        }

        public void ExcluirUsuario(Usuario usuario)
        {
            throw new NotImplementedException();
        }
        #endregion
    }
}
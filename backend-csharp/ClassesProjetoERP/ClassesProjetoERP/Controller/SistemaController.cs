using ClassesProjetoERP.Classes.Models;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClassesProjetoERP.Classes.Controller
{
    public class SistemaController
    {

        #region Listar Sistema
        public Sistema ListarSistema()
        {
            Sistema sistema = new Sistema();

            using (var conexao = Database.GetConnection())
            {
                conexao.Open();

                MySqlCommand listarsistema = new MySqlCommand("sp_listar_sistema", conexao);
                listarsistema.CommandType = System.Data.CommandType.StoredProcedure;

                MySqlDataReader reader = listarsistema.ExecuteReader();

                if (reader.Read())
                {
                    sistema.Id = Convert.ToInt32(reader["id_sistema"]);
                    sistema.Nome = reader["nm_sistema"].ToString();
                }
            }

            return sistema;
        }
        #endregion


        #region Atualizar Nome do Sistema
        public void AtualizarNomeSistema(string nome)
        {
            using (var conexao = Database.GetConnection())
            {
                conexao.Open();

                MySqlCommand atualizar = new MySqlCommand("sp_atualizar_nome_sistema", conexao);
                atualizar.CommandType = System.Data.CommandType.StoredProcedure;

                atualizar.Parameters.AddWithValue("p_nome", nome);

                atualizar.ExecuteNonQuery();
            }
        }
        #endregion

    }
}
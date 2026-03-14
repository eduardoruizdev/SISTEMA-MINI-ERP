using MySql.Data.MySqlClient;

namespace ClassesProjetoERP.Classes
{
    public static class Database
    {
        private static string connectionString =
            "Server=localhost;Database=gestaoempresarial;Uid=root;Pwd=root;";

        public static MySqlConnection GetConnection()
        {
            return new MySqlConnection(connectionString);
        }
    }
}
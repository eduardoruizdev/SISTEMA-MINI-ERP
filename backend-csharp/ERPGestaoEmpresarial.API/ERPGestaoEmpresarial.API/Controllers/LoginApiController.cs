using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using ClassesProjetoERP.Classes.Models;
using ClassesProjetoERP.Classes;

namespace ERPGestaoEmpresarial.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginApiController : ControllerBase
    {
        [HttpPost]
        public IActionResult Login([FromBody] Usuario usuario)
        {
            using (var conexao = Database.GetConnection())
            {
                conexao.Open();

                MySqlCommand cmd = new MySqlCommand(
                    @"SELECT id_usuario 
                      FROM usuario 
                      WHERE nm_login_usuario = @login 
                      AND nm_senha_usuario = @senha",
                    conexao
                );

                cmd.Parameters.AddWithValue("@login", usuario.Nome);
                cmd.Parameters.AddWithValue("@senha", usuario.Senha);

                var resultado = cmd.ExecuteScalar();

                if (resultado != null)
                {
                    return Ok();
                }

                return Unauthorized();
            }
        }
    }
}
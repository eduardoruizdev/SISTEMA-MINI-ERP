using ClassesProjetoERP.Classes.Models;
using ClassesProjetoERP.Classes.Controller;
using Microsoft.AspNetCore.Mvc;

namespace ERPGestaoEmpresarial.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioApiController : ControllerBase
    {
        private UsuarioController _controller = new UsuarioController();

        [HttpGet] // GET /api/UsuarioApi
        public IActionResult GetUsuarios()
        {
            var lista = _controller.ListarUsuario();
            return Ok(lista); // retorna JSON
        }

        [HttpPost] // POST /api/UsuarioApi
        public IActionResult CriarUsuario([FromBody] Usuario usuario)
        {
            _controller.CadastrarUsuario(usuario);
            return Ok();
        }

        [HttpPut("{id}")] // PUT /api/UsuarioApi/1
        public IActionResult AtualizarUsuario(int id, [FromBody] Usuario usuario)
        {
            usuario.Id = id;
            _controller.AtualizarUsuario(usuario);
            return Ok();
        }

        [HttpDelete("{id}")] // DELETE /api/UsuarioApi/1
        public IActionResult ExcluirUsuario(int id)
        {
            _controller.ExcluirUsuario(new Usuario { Id = id });
            return Ok();
        }
    }
}
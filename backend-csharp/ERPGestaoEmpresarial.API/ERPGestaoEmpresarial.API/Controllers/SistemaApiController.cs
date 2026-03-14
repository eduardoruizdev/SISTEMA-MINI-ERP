using ClassesProjetoERP.Classes.Models;
using ClassesProjetoERP.Classes.Controller;
using Microsoft.AspNetCore.Mvc;

namespace ERPGestaoEmpresarial.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SistemaApiController : ControllerBase
    {
        private SistemaController _controller = new SistemaController();

        [HttpGet] // GET /api/SistemaApi
        public IActionResult GetSistema()
        {
            var sistema = _controller.ListarSistema();
            return Ok(sistema);
        }

        [HttpPut] // PUT /api/SistemaApi
        public IActionResult AtualizarNomeSistema([FromBody] Sistema sistema)
        {
            _controller.AtualizarNomeSistema(sistema.Nome);
            return Ok();
        }
    }
}
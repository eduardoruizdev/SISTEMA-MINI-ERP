using ClassesProjetoERP.Classes.Models;
using ClassesProjetoERP.Classes.Controller;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace ERPGestaoEmpresarial.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TarefaApiController : ControllerBase
    {
        private TarefaController _controller = new TarefaController();

        [HttpGet] // GET /api/TarefaApi
        public IActionResult GetTarefas()
        {
            List<Tarefa> lista = _controller.ListarTarefa();
            return Ok(lista);
        }

        [HttpPost] // POST /api/TarefaApi
        public IActionResult CriarTarefa([FromBody] Tarefa tarefa)
        {
            _controller.CadastrarTarefa(tarefa);
            return Ok();
        }

        [HttpPut("{id}")] // PUT /api/TarefaApi/1
        public IActionResult AtualizarTarefa(int id, [FromBody] Tarefa tarefa)
        {
            tarefa.Id = id;
            _controller.AtualizarTarefa(tarefa);
            return Ok();
        }

        [HttpDelete("{id}")] // DELETE /api/TarefaApi/1
        public IActionResult ExcluirTarefa(int id)
        {
            _controller.ExcluirTarefa(id);
            return Ok();
        }
    }
}
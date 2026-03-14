using ClassesProjetoERP.Classes.Models;
using ClassesProjetoERP.Classes.Controller;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace ERPGestaoEmpresarial.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovimentacaoApiController : ControllerBase
    {
        private MovimentacaoController _controller = new MovimentacaoController();

        [HttpGet] // GET /api/MovimentacaoApi
        public IActionResult GetMovimentacoes()
        {
            List<Movimentacao> lista = _controller.ListarMovimentacao();
            return Ok(lista);
        }

        [HttpPost] // POST /api/MovimentacaoApi
        public IActionResult CriarMovimentacao([FromBody] Movimentacao movimentacao)
        {
            _controller.CadastrarMovimentacao(movimentacao);
            return Ok();
        }

        [HttpPut("{id}")] // PUT /api/MovimentacaoApi/1
        public IActionResult AtualizarMovimentacao(int id, [FromBody] Movimentacao movimentacao)
        {
            movimentacao.Id = id;
            _controller.AtualizarMovimentacao(movimentacao);
            return Ok();
        }

        [HttpDelete("{id}")] // DELETE /api/MovimentacaoApi/1
        public IActionResult ExcluirMovimentacao(int id)
        {
            _controller.ExcluirMovimentacao(id);
            return Ok();
        }
    }
}
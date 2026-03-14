using ClassesProjetoERP.Classes.Models;
using ClassesProjetoERP.Classes.Controller;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace ERPGestaoEmpresarial.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FuncionarioApiController : ControllerBase
    {
        private FuncionarioController _controller = new FuncionarioController();

        [HttpGet]
        public IActionResult GetFuncionarios()
        {
            return Ok(_controller.ListarFuncionario());
        }

        [HttpGet("{id}")]
        public IActionResult GetFuncionarioPorId(int id)
        {
            var f = _controller.ObterFuncionarioPorId(id);
            if (f == null) return NotFound();
            return Ok(f);
        }

        [HttpPost]
        public IActionResult CriarFuncionario([FromBody] Funcionario funcionario)
        {
            var criado = _controller.CadastrarFuncionario(funcionario);
            return Ok(criado);
        }

        [HttpPut("{id}")]
        public IActionResult AtualizarFuncionario(int id, [FromBody] Funcionario funcionario)
        {
            funcionario.Id = id;
            _controller.AtualizarFuncionario(funcionario);
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult ExcluirFuncionario(int id)
        {
            _controller.ExcluirFuncionario(id);
            return Ok();
        }
    }
}
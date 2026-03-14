using ClassesProjetoERP.Classes.Controller;
using Microsoft.AspNetCore.Mvc;

namespace ERPGestaoEmpresarial.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardApiController : ControllerBase
    {
        private MovimentacaoController _controller = new MovimentacaoController();

        [HttpGet]
        public IActionResult GetDashboard()
        {
            var dashboard = new
            {
                totalFuncionarios = _controller.TotalFuncionarios(),
                tarefasPendentes = _controller.TarefasPendentes(),
                receitaTotal = _controller.ReceitaTotal(),
                despesaTotal = _controller.DespesaTotal()
            };

            return Ok(dashboard);
        }
    }
}
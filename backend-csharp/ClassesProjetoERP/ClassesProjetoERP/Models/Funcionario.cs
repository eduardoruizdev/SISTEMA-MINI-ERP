using System;

namespace ClassesProjetoERP.Classes.Models
{
    public class Funcionario
    {
        public int Id { get; set; }

        public string Nome { get; set; }

        public string Cargo { get; set; }

        public string Email { get; set; }

        public decimal Salario { get; set; }

        public DateTime DataAdmissao { get; set; }

        public Funcionario()
        {

        }

        public Funcionario(int id, string nome, string cargo, string email, decimal salario, DateTime dataAdmissao)
        {
            Id = id;
            Nome = nome;
            Cargo = cargo;
            Email = email;
            Salario = salario;
            DataAdmissao = dataAdmissao;
        }
    }
}
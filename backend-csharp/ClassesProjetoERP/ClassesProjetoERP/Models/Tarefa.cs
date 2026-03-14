using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClassesProjetoERP.Classes.Models
{
    public class Tarefa
    {
        int id;
        string nome;
        string descricao;
        int idfuncionario;
        DateTime datalimite;
        string status;

        public Tarefa() 
        { 
        
        }
        public Tarefa(int id, string nome, string descricao, int idfuncionario, DateTime datalimite, string status)
        {
            this.id = id;
            this.nome = nome;
            this.descricao = descricao;
            this.idfuncionario = idfuncionario;
            this.datalimite = datalimite;
            this.status = status;
        }

        public int Id { get => id; set => id = value; }
        public string Nome { get => nome; set => nome = value; }
        public string Descricao { get => descricao; set => descricao = value; }
        public int Idfuncionario { get => idfuncionario; set => idfuncionario = value; }
        public DateTime Datalimite { get => datalimite; set => datalimite = value; }
        public string Status { get => status; set => status = value; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClassesProjetoERP.Classes.Models
{
    public class Sistema
    {
        int id;
        string nome;

        public Sistema()
        {

        }

        public Sistema(int id, string nome)
        {
            this.id = id;
            this.nome = nome;
        }

        public int Id { get => id; set => id = value; }
        public string Nome { get => nome; set => nome = value; }
    }
}

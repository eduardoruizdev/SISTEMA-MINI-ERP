using System;
using System.Collections.Generic;
using System.Linq;


namespace ClassesProjetoERP.Classes.Models
{
    public class Usuario
    {
        int id;
        string nome;
        string senha;

        public Usuario()
        {

        }
        public Usuario(int id, string nome, string senha)
        {
            this.id = id;
            this.nome = nome;
            this.senha = senha;
        }

        public int Id { get => id; set => id = value; }
        public string Nome { get => nome; set => nome = value; }
        public string Senha { get => senha; set => senha = value; }
    }
}
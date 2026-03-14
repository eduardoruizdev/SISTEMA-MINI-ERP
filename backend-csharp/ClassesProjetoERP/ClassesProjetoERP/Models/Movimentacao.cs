using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ClassesProjetoERP.Classes.Models
{
    public class Movimentacao
    {
        int id;
        string tipo;
        decimal valor;
        string categoria;
        DateTime data_movimentacao;
        string descricao;

        public Movimentacao()
        {

        }
        public Movimentacao(int id, string tipo, decimal valor, string categoria, DateTime data_movimentacao, string descricao)
        {
            this.id = id;
            this.tipo = tipo;
            this.valor = valor;
            this.categoria = categoria;
            this.data_movimentacao = data_movimentacao;
            this.descricao = descricao;
        }

        public int Id { get => id; set => id = value; }
        public string Tipo { get => tipo; set => tipo = value; }
        public decimal Valor { get => valor; set => valor = value; }
        public string Categoria { get => categoria; set => categoria = value; }
        public DateTime Data_movimentacao { get => data_movimentacao; set => data_movimentacao = value; }
        public string Descricao { get => descricao; set => descricao = value; }
    }
}
use gestaoempresarial;
/* ============================= */
/* PROCEDURES - USUARIO */
/* ============================= */

DELIMITER $$

create procedure sp_inserir_usuario(
    in p_login varchar(220),
    in p_senha varchar(220)
)
begin
    insert into usuario(nm_login_usuario, nm_senha_usuario)
    values(p_login, p_senha);
end $$


create procedure sp_listar_usuario()
begin
    select * from usuario;
end $$


create procedure sp_atualizar_usuario(
    in p_id int,
    in p_login varchar(220),
    in p_senha varchar(220)
)
begin
    update usuario
    set nm_login_usuario = p_login,
        nm_senha_usuario = p_senha
    where id_usuario = p_id;
end $$


create procedure sp_excluir_usuario(
    in p_id int
)
begin
    delete from usuario
    where id_usuario = p_id;
end $$



/* ============================= */
/* PROCEDURES - FUNCIONARIO */
/* ============================= */

create procedure sp_inserir_funcionario(
    in p_nome varchar(220),
    in p_cargo varchar(220),
    in p_email varchar(220),
    in p_salario decimal(10,2),
    in p_admissao date
)
begin
    insert into funcionario(
        nm_funcionario,
        nm_cargo_funcionario,
        nm_email_funcionario,
        vl_salario_funcionario,
        dt_admissao_funcionario
    )
    values(
        p_nome,
        p_cargo,
        p_email,
        p_salario,
        p_admissao
    );
end $$


create procedure sp_listar_funcionario()
begin
    select * from funcionario;
end $$


create procedure sp_atualizar_funcionario(
    in p_id int,
    in p_nome varchar(220),
    in p_cargo varchar(220),
    in p_email varchar(220),
    in p_salario decimal(10,2),
    in p_admissao date
)
begin
    update funcionario
    set nm_funcionario = p_nome,
        nm_cargo_funcionario = p_cargo,
        nm_email_funcionario = p_email,
        vl_salario_funcionario = p_salario,
        dt_admissao_funcionario = p_admissao
    where id_funcionario = p_id;
end $$


create procedure sp_excluir_funcionario(
    in p_id int
)
begin
    delete from funcionario
    where id_funcionario = p_id;
end $$



/* ============================= */
/* PROCEDURES - TAREFA */
/* ============================= */

create procedure sp_inserir_tarefa(
    in p_titulo varchar(220),
    in p_descricao text,
    in p_funcionario int,
    in p_data_limite date,
    in p_status varchar(220)
)
begin
    insert into tarefa(
        nm_titulo_tarefa,
        ds_tarefa,
        id_funcionario,
        dt_limite_tarefa,
        ds_status_tarefa
    )
    values(
        p_titulo,
        p_descricao,
        p_funcionario,
        p_data_limite,
        p_status
    );
end $$


create procedure sp_listar_tarefa()
begin
    select 
        t.id_tarefa,
        t.nm_titulo_tarefa,
        t.ds_tarefa,
        t.id_funcionario,
        f.nm_funcionario,
        t.dt_limite_tarefa,
        t.ds_status_tarefa
    from tarefa t
    left join funcionario f
        on t.id_funcionario = f.id_funcionario;
end $$

create procedure sp_atualizar_tarefa(
    in p_id int,
    in p_titulo varchar(220),
    in p_descricao text,
    in p_funcionario int,
    in p_data_limite date,
    in p_status varchar(220)
)
begin
    update tarefa
    set nm_titulo_tarefa = p_titulo,
        ds_tarefa = p_descricao,
        id_funcionario = p_funcionario,
        dt_limite_tarefa = p_data_limite,
        ds_status_tarefa = p_status
    where id_tarefa = p_id;
end $$


create procedure sp_atualizar_status_tarefa(
    in p_id int,
    in p_status varchar(220)
)
begin
    update tarefa
    set ds_status_tarefa = p_status
    where id_tarefa = p_id;
end $$


create procedure sp_excluir_tarefa(
    in p_id int
)
begin
    delete from tarefa
    where id_tarefa = p_id;
end $$



/* ============================= */
/* PROCEDURES - MOVIMENTACAO */
/* ============================= */

create procedure sp_inserir_movimentacao(
    in p_tipo varchar(220),
    in p_valor decimal(10,2),
    in p_categoria varchar(220),
    in p_data date,
    in p_descricao text
)
begin
    insert into movimentacao(
        tp_movimentacao,
        vl_movimentacao,
        nm_categoria_movimentacao,
        dt_movimentacao,
        ds_movimentacao
    )
    values(
        p_tipo,
        p_valor,
        p_categoria,
        p_data,
        p_descricao
    );
end $$


create procedure sp_listar_movimentacao()
begin
    select * from movimentacao
    order by dt_movimentacao desc;
end $$


create procedure sp_atualizar_movimentacao(
    in p_id int,
    in p_tipo varchar(220),
    in p_valor decimal(10,2),
    in p_categoria varchar(220),
    in p_data date,
    in p_descricao text
)
begin
    update movimentacao
    set tp_movimentacao = p_tipo,
        vl_movimentacao = p_valor,
        nm_categoria_movimentacao = p_categoria,
        dt_movimentacao = p_data,
        ds_movimentacao = p_descricao
    where id_movimentacao = p_id;
end $$


create procedure sp_excluir_movimentacao(
    in p_id int
)
begin
    delete from movimentacao
    where id_movimentacao = p_id;
end $$



/* ============================= */
/* PROCEDURES - SISTEMA */
/* ============================= */

create procedure sp_listar_sistema()
begin
    select * from sistema;
end $$


create procedure sp_atualizar_nome_sistema(
    in p_nome varchar(220)
)
begin
    update sistema
    set nm_sistema = p_nome
    where id_sistema = 1;
end $$



/* ============================= */
/* PROCEDURES - DASHBOARD */
/* ============================= */

create procedure sp_total_funcionarios()
begin
    select count(*) as total_funcionarios
    from funcionario;
end $$


create procedure sp_tarefas_pendentes()
begin
    select count(*) as tarefas_pendentes
    from tarefa
    where ds_status_tarefa = 'Pendente';
end $$


create procedure sp_receita_total()
begin
    select sum(vl_movimentacao) as receita
    from movimentacao
    where tp_movimentacao = 'Entrada';
end $$


create procedure sp_despesa_total()
begin
    select sum(vl_movimentacao) as despesa
    from movimentacao
    where tp_movimentacao = 'Saida';
end $$

DELIMITER ;
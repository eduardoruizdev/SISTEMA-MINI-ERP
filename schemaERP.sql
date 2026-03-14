drop schema if exists gestaoempresarial; 
create schema gestaoempresarial;
use gestaoempresarial;

create table usuario
(
	id_usuario int auto_increment primary key,
	nm_login_usuario varchar(220),
	nm_senha_usuario varchar(220)
);

create table funcionario
(
	id_funcionario int auto_increment primary key,
	nm_funcionario varchar(220),
	nm_cargo_funcionario varchar(220),
	nm_email_funcionario varchar(220),
	vl_salario_funcionario decimal(10,2),
	dt_admissao_funcionario date
);

create table tarefa 
(
	id_tarefa int auto_increment primary key,
	nm_titulo_tarefa varchar(220),
	ds_tarefa text,
	id_funcionario int, /*pra saber quem é o responsavel pela tarefa*/
	dt_limite_tarefa date,
	ds_status_tarefa varchar(220),

	constraint fk_funcionario_tarefa foreign key (id_funcionario)
		references funcionario (id_funcionario)
);

create table movimentacao
(
	id_movimentacao int auto_increment primary key,
	tp_movimentacao varchar(220),
	vl_movimentacao decimal(10,2),
	nm_categoria_movimentacao varchar(220),
	dt_movimentacao date,
	ds_movimentacao text
);

create table sistema
(
	id_sistema int auto_increment primary key,
	nm_sistema varchar(220)
);


insert into usuario (nm_login_usuario, nm_senha_usuario) values ('admin', '1234');
INSERT INTO funcionario 
(nm_funcionario, nm_cargo_funcionario, nm_email_funcionario, vl_salario_funcionario, dt_admissao_funcionario)
VALUES
('Marcos Almeida', 'Desenvolvedor Backend', 'marcos.almeida@empresa.com', 8500.00, '2021-03-15'),
('Ana Ribeiro', 'Analista de Sistemas', 'ana.ribeiro@empresa.com', 7300.50, '2020-11-10'),
('João Pereira', 'Tech Lead', 'joao.pereira@empresa.com', 12500.00, '2019-06-01'),
('Carla Souza', 'Product Owner', 'carla.souza@empresa.com', 9800.75, '2022-01-20'),
('Lucas Martins', 'UX Designer', 'lucas.martins@empresa.com', 6900.00, '2021-09-03'),
('Fernanda Dias', 'QA Engineer', 'fernanda.dias@empresa.com', 6400.00, '2023-02-11'),
('Ricardo Lima', 'Scrum Master', 'ricardo.lima@empresa.com', 9100.00, '2020-07-30'),
('Patrícia Gomes', 'Desenvolvedora Frontend', 'patricia.gomes@empresa.com', 7800.80, '2022-04-18'),
('Eduardo Nunes', 'DevOps Engineer', 'eduardo.nunes@empresa.com', 11200.00, '2018-12-01'),
('Beatriz Carvalho', 'DBA', 'beatriz.carvalho@empresa.com', 10000.00, '2019-03-27'),
('Tiago Ferreira', 'Estagiário de TI', 'tiago.ferreira@empresa.com', 1800.00, '2024-01-05'),
('Helena Castro', 'Analista de Dados', 'helena.castro@empresa.com', 7200.00, '2020-09-23'),
('Marcelo Santos', 'Gerente de TI', 'marcelo.santos@empresa.com', 15000.00, '2017-02-14'),
('Julia Mendes', 'Cientista de Dados', 'julia.mendes@empresa.com', 13200.00, '2021-05-09'),
('Pedro Araújo', 'Arquiteto de Software', 'pedro.araujo@empresa.com', 14000.00, '2018-08-17');


INSERT INTO tarefa (nm_titulo_tarefa, ds_tarefa, id_funcionario, dt_limite_tarefa, ds_status_tarefa)
VALUES
('Criar API de Funcionários', 'Implementar endpoints REST para CRUD de funcionários.', 1, '2026-03-20', 'Pendente'),

('Refatorar módulo de estoque', 'Melhorar a separação de camadas e remover código duplicado.', 2, '2026-03-25', 'Em andamento'),

('Criar tela de cadastro', 'Desenvolver a UI em React para cadastro de produtos.', 3, '2026-03-18', 'Concluído'),

('Analisar logs do servidor', 'Verificar erros intermitentes no Kestrel e mapear requests críticos.', 1, '2026-03-22', 'Pendente'),

('Atualizar documentação Swagger', 'Adicionar exemplos e ajustar schemas dos endpoints.', 4, '2026-03-21', 'Em andamento');
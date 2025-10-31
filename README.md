# Nome da Aplicação/API

**API:** ClassMasterAPI

**Autor:** Emanuel Oliveira Andrade

## Descrição do Projeto

Esta API foi desenvolvida como parte do curso de Tecnologia em Sistemas para Internet, utilizando o framework **NestJS**. O objetivo do projeto é fornecer uma API funcional com persistência de dados, autenticação, autorização, testes automatizados e documentação Swagger. A API inclui operações CRUD e segue boas práticas de arquitetura modular e segurança.

## Link para a API em Produção

[Acessar API em Produção](https://exemplo-de-api.com)

---

## Instruções de Execução

### Pré-requisitos

- Node.js versão 20.x
- NPM versão 9.x
- Banco de dados PostgreSQL versão 15.x
- Git

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/nome-do-projeto.git
   cd nome-do-projeto
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```

### Configuração do Banco de Dados

1. Crie um banco de dados PostgreSQL.
2. Configure as credenciais no arquivo `.env` (exemplo abaixo).
3. Execute as migrações:
   ```bash
   npx prisma migrate dev
   ```
   ou, se estiver usando TypeORM:
   ```bash
   npm run typeorm:migrate
   ```

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
JWT_SECRET=sua_chave_secreta
PORT=3000
```

### OU

Tennho um banco de dados hospedado utilizando serviços gratuitos, então pode estar indisponível em algum momento.

```bash
cp .env.example .env
```

### Execução

Para rodar a API localmente:

```bash
npm run start:dev
```

---

## Diagrama de Entidade-Relacionamento (ERD)

![ERD](https://imgur.com/a/vPEORsH)

---

## Documentação Swagger

```bash
npm run start:dev
```

A documentação interativa da API pode ser acessada em:
[Swagger Documentation](http://localhost:3000/api)

---

## Checklist de Funcionalidades

### RA1 - Desenvolvimento da API NestJS

- [x] ID1: Configuração do ambiente e criação da API modular
- [x] ID2: Organização correta da lógica de negócios em services
- [x] ID3: Configuração de providers e injeção de dependência
- [x] ID4: Criação e manipulação de rotas HTTP
- [x] ID5: Tratamento de erros com filtros globais
- [x] ID6: Criação de DTOs para validação de dados
- [x] ID7: Aplicação de pipes de validação

### RA2 - Persistência de Dados

- [x] ID8: Modelagem de dados e ERD
- [x] ID9: Configuração de conexão com banco relacional
- [x] ID10: Criação e aplicação de migrações
- [x] ID11: Implementação de operações CRUD

### RA4 - Documentação e Deploy

- [x] ID14: Integração do Swagger
- [x] ID15: Deploy em plataforma de nuvem
- [x] ID16: Funcionamento da API em produção
- [ ] ID17: Configuração de variáveis de ambiente via ConfigModule
- [ ] ID18: Versionamento da API

### RA5 - Autenticação, Autorização e Segurança

- [x] ID19: Autenticação JWT
- [x] ID20: Controle de acesso baseado em roles
- [x] ID21: Middleware para requisições
- [x] ID22: Implementação de interceptadores

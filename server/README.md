# io.orbit

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/andrelinos/nwl-18/tree/main/server?color=56BEB8">

  <img alt="Github language count" src="https://img.shields.io/github/languages/count/andrelinos/nwl-18/tree/main/server?color=56BEB8">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/andrelinos/nwl-18/tree/main/server?color=56BEB8">

  <img alt="License" src="https://img.shields.io/github/license/andrelinos/nwl-18/tree/main/server?color=56BEB8">

</p>

## Visão Geral

**io.orbit** é uma aplicação full-stack para gerenciamento de metas, desenvolvida usando **Fastify** como framework de backend, **Drizzle ORM** para interação com o banco de dados, e outras bibliotecas para validação e geração de documentação de API. A aplicação permite criar metas, registrar conclusões e gerar relatórios semanais.

### Ferramentas Utilizadas

- **Node.js**: Ambiente de execução para a aplicação.
- **Fastify**: Framework web rápido e eficiente.
- **TypeScript**: Linguagem de programação usada para adicionar tipagem estática ao projeto.
- **Zod**: Biblioteca para validação de dados.
- **Drizzle ORM**: ORM para interação com banco de dados PostgreSQL.
- **Swagger**: Utilizado para documentação da API REST.
- **Biome**: Ferramenta para verificação e formatação de código.

### Dependências

```json
"dependencies": {
    "@fastify/cors": "^9.0.1",
    "@fastify/swagger": "^8.15.0",
    "@fastify/swagger-ui": "^4.1.0",
    "@paralleldrive/cuid2": "^2.2.2",
    "dayjs": "^1.11.13",
    "drizzle-orm": "^0.33.0",
    "fastify": "^4.28.1",
    "fastify-type-provider-zod": "^2.0.0",
    "postgres": "^3.4.4",
    "zod": "^3.23.8"
},
"devDependencies": {
    "@biomejs/biome": "1.8.3",
    "@types/node": "^22.5.4",
    "drizzle-kit": "^0.24.2",
    "tsx": "^4.19.0",
    "typescript": "^5.6.2"
}
```

## Iniciando o projeto

1. Tenha instalado do docker em seu sistema

2. Execute a inicialização do container

```bash
docker compose up -d
```

3. Execute a criação das tabeles do banco

```bash
npm run generate
npm run migrate

# Mais detalhes no package.json
```

4. Execute a aplicação

```bash
npm run dev
  ```

## API Endpoints

### 1. Criar Meta (`/goals`)

- **Método**: `POST`
- **Descrição**: Cria uma nova meta.
- **Corpo da Requisição**:

  ```json
  {
    "title": "string (obrigatório, min: 1, max: 100)",
    "desiredWeeklyFrequency": "number (obrigatório, min: 1, max: 52)"
  }
  ```

- **Resposta**:
  - Código 200: Meta criada com sucesso.

### 2. Registrar Conclusão de Meta (`/completions`)

- **Método**: `POST`
- **Descrição**: Registra a conclusão de uma meta.
- **Corpo da Requisição**:

  ```json
  {
    "goalId": "string (obrigatório)"
  }
  ```

- **Resposta**:
  - Código 200: Conclusão registrada.

### 3. Remover Conclusão de Meta (`/completions`)

- **Método**: `DELETE`
- **Descrição**: Remove uma conclusão de meta.
- **Corpo da Requisição**:

  ```json
  {
    "goalId": "string (obrigatório)"
  }
  ```

- **Resposta**:
  - Código 200: Conclusão removida.

### 4. Obter Resumo Semanal (`/summary`)

- **Método**: `GET`
- **Descrição**: Recupera o resumo semanal das metas e suas conclusões.
- **Resposta**:
  - Código 200: Resumo retornado com sucesso.

### 5. Obter Metas Pendentes da Semana (`/pending`)

- **Método**: `GET`
- **Descrição**: Recupera as metas que ainda não foram concluídas na semana.
- **Resposta**:
  - Código 200: Metas pendentes retornadas.

## Configuração e Execução

### Instalação

1. Clone o repositório:

   ```bash
   git clone <URL-do-repositório>
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

### Executando o Projeto

1. Compile o TypeScript:

   ```bash
   npm run build
   ```

2. Execute a aplicação:

   ```bash
   npm start
   ```

### Scripts Disponíveis

- **`npm run build`**: Compila o código TypeScript.
- **`npm run dev`**: Executa o servidor em modo de desenvolvimento.
- **`npm run lint`**: Verifica o código utilizando o Biome para padrões de formatação.

## Estrutura de Pastas

```
/src
  /controllers
  /routes
  /schemas
  /services
  server.ts
```

- **controllers**: Contém os controladores das rotas.
- **routes**: Define as rotas da API.
- **schemas**: Contém as validações de dados usando Zod.
- **services**: Lógica de negócio da aplicação.
- **server.ts**: Arquivo principal de inicialização do servidor.

## Considerações Finais

A aplicação **io.orbit** permite uma gestão simples e eficaz de metas com foco na frequência semanal de conclusão. Para mais informações ou contribuições, consulte o código-fonte no repositório.

---

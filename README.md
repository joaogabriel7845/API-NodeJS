# API de Posts — Node.js sem Framework

API REST simples para gerenciar posts, construída **sem nenhum framework** (sem Express, sem Fastify), utilizando apenas os módulos nativos `node:http` e `node:crypto` do Node.js.

## Objetivo do projeto

Esse projeto foi criado com fins de aprendizado, para entender o que acontece "por trás" de frameworks como Express e Fastify:

- Como o servidor HTTP recebe as requisições
- Como o corpo (`body`) de uma requisição chega em **chunks** e precisa ser montado manualmente
- Como funciona o roteamento (verificar método HTTP e URL na mão)
- Como gerar respostas HTTP com status code e headers corretos

## Tecnologias utilizadas

- [Node.js](https://nodejs.org/)
- Módulo nativo `node:http`
- Módulo nativo `node:crypto` (geração de IDs únicos com `randomUUID`)

## Como rodar o projeto

Pré-requisito: ter o [Node.js](https://nodejs.org/) instalado (versão 18 ou superior).

```bash
node server.js
```

O servidor vai subir na porta `3333`.

## Rotas disponíveis

### Listar posts

```
GET /posts
```

Retorna a lista de posts em formato JSON.

**Resposta:** `200 OK`

```json
[
  {
    "id": "uuid-gerado",
    "title": "Aprendendo Node",
    "author": "Joao"
  }
]
```

### Criar post

```
POST /posts
```

Envie no corpo da requisição um JSON com os dados do post.

**Corpo da requisição (exemplo):**

```json
{
  "title": "Meu novo post",
  "author": "Joao"
}
```

**Resposta:** `201 Created`

```
Post criado com sucesso
```

### Remover post

```
DELETE /posts/:id
```

Substitua `:id` pelo ID do post que deseja remover.

**Resposta:** `204 No Content`

### Rota inexistente

Qualquer outra combinação de método/URL retorna:

**Resposta:** `404 Not Found`

```
Essa rota não existe !
```

## Testando a API

Você pode testar as rotas com `curl`, [Insomnia](https://insomnia.rest/) ou [Postman](https://www.postman.com/):

```bash
# Listar posts
curl http://localhost:3333/posts

# Criar post
curl -X POST http://localhost:3333/posts \
  -H "Content-Type: application/json" \
  -d '{"title": "Novo post", "author": "Joao"}'

# Remover post (substitua <id> pelo ID real)
curl -X DELETE http://localhost:3333/posts/<id>
```

## Observações

- Os posts são armazenados apenas em memória (um array). Isso significa que, ao reiniciar o servidor, todos os dados são perdidos — não há banco de dados neste projeto.
- Este projeto tem propósito didático: o objetivo não é ser uma API pronta para produção, e sim entender os fundamentos do protocolo HTTP no Node.js antes de utilizar frameworks.

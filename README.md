# Orders API – Node.js e Postgre

## Descrição

Esta aplicação consiste em uma API REST para gerenciamento de pedidos. Permite criar, listar, consultar, atualizar e deletar pedidos, com armazenamento em banco PostgreSQL e documentação via Swagger.

---

## Tecnologias Utilizadas

* Node.js
* PostgreSQL
* Docker
* Swagger
* Git

---

## Recursos da API

### POST /order

Cria um novo pedido.

### GET /order/{orderId}

Busca um pedido específico.

### GET /order/list/all

Lista todos os pedidos cadastrados.

### PUT /order/{orderId}

Atualiza um pedido existente.

### DELETE /order/{orderId}

Remove um pedido pelo ID.

---

## Transformação de Dados (Mapping)

### Entrada da API:

```json
{
  "numeroPedido": "v10000001",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}
```

### Formato salvo no banco:

```json
{
  "orderId": "v10000001",
  "value": 10000,
  "creationDate": "2023-07-19T12:24:11.529Z",
  "items": [
    {
      "productId": 2434,
      "quantity": 1,
      "price": 1000
    }
  ]
}
```

---

## Documentação

A documentação está disponível em:

```
/docs
```

Gerada automaticamente via Swagger UI.

---

## Como Executar com Docker

### 1. Copie o arquivo `.env.example` para `.env`

Configure os valores:

```
DB_HOST=orders_db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_DATABASE=orders
PORT=3000
```

### 2. Suba os containers

```
docker compose up --build
```

### 3. Acesse a API

```
http://localhost:3000
```

### 4. Acesse a documentação Swagger

```
http://localhost:3000/docs
```

---

## Estrutura do Projeto

```
src/
 ├─ controllers/
 ├─ services/
 ├─ models/
 ├─ routes/
 ├─ database/
 ├─ utils/
 └─ config/
```

---

## Banco de Dados

### Tabela: orders

* orderId
* value
* creationDate

### Tabela: items

* id (auto incremental)
* orderId
* productId
* quantity
* price

As tabelas são criadas automaticamente no primeiro acesso se não existirem.

---

## Executando sem Docker

### Instale dependências

```
npm install
```

### Suba o servidor

```
npm start
```

A aplicação executa por padrão na porta 3000.

---

## Testes Rápidos via curl

### Criar pedido

```
curl -X POST "http://localhost:3000/order" -H "Content-Type: application/json" -d "{\"numeroPedido\":\"v1\",\"valorTotal\":100,\"dataCriacao\":\"2023-07-19T12:24:11.529Z\",\"items\":[{\"idItem\":\"1\",\"quantidadeItem\":1,\"valorItem\":100}]}"
```

### Buscar pedido

```
curl http://localhost:3000/order/v1
```

### Listar pedidos

```
curl http://localhost:3000/order/list/all
```

---

## Licença

Projeto desenvolvido para fins de avaliação técnica.

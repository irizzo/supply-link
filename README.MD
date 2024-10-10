# MVP

## Frontend

Rodar com `npm run dev`

Páginas:
  
- Criar um processo
- Visualizar histórico de um produto

## Backend

Rodar com `npm run dev`

Iremos utilizar apenas uma carteira

### Rotas (gateways)

- Registrar um processo
- Buscar histórico de um produto com base em seu id

### Gerenciamento de Erros

Para facilitar, criei um ErrorHandler, pq aí a gente n precisa ficar lidando com erros em todas as funções, só no handler.
  
### Serviços (internos à api)

### Estruturas de dados

```js
// token processo 
  {
    owner: string,
    data: {
      id: number, // gerado pela blockchain
      date: date // data que o processo aconteceu/foi finalizado,
      entries: [] // tokenId[] dos produtos,
      outs: [] // tokenId[] dos produtos, ()
      name: string // (título do proceso - exemplo: venda de queijo),
      description: string,
      [...otherData] // outros dados especificos de cada empresa etc
    }
  }
```

```js
// token produto 
  {
    owner: string,
    data: {
      id: number, // gerado pela blockchain
      date: date // data que foi criado,
      name: string // título do produto - exemplo: queijo,
      description: string,
      identificador: string // identificador do lote ou identificador da unidade
      [...otherData] // outros dados especificos de cada empresa etc
    }
  }
```

## Ideias da reunião

### Front

- Página de criar um produto
  - Formulário para cadastrar um novo produto
  - Opção de linkar o novo produto com um token existente. Essa parte teremos que pegar todos os tokens gerados pelo dono da carteira e mostar as informações daquele token.

- Visualização da cadeia do produto. A partir de um token podemos ver todos os tokens referenciados pelos tokens anteriores

- Página de alterar status de venda ou de transporte de um produto. Vamos gerar um novo token referenciado o ID token do produto que irá mudar o status e copiaremos os dados do token referenciado.

### Back

Iremos utilizar apenas uma carteira

- Rotas
  - Criar um produto
  - Pegar todos os tokens de um owner
  - Pegar todos os tokens da cadeia com base na id de um token
  - Atualizar um produto (editar status de um produto criando um novo)

## Rodar a aplicação

`npm run dev`

## Arquitetura

Pastas:
  /routes - gateways da api
  /controllers - lidam com as requisições, trata/valida os dados etc
  /services - faz as interações com a blockchain, tem a lógica do que precisa ser feito

  A parte da interação com a blockchain pode ficar separada, numa pasta de "modelos" ou algo assim, se for necessário (ou seja, se vermos que vai ter muito código repetido por exemplo)

Fluxo que eu pensei:
  Rota - aponta para -> Controlador - chama o -> Serviço

## Routes

Rotas que criei:

```
  Criar um produto: POST /product/
    - controlador: /src/controllers/product.controller.js => registerProduct

  Atualizar um produto: POST /product/update
    - controlador: /src/controllers/product.controller.js => updateProduct

  Pegar todos os tokens de um owner: GET /chain/owner-chain
    - controlador: /src/controllers/chain.controller.js => getTokensByOwner

  Pegar todos os tokens da cadeia com base na id de um token: GET /chain/:tokenId
    - controlador: /src/controllers/chain.controller.js => getTokenChain

  Registrar um processo: POST /process/
    - controlador: /src/controllers/process.controller.js => registerProcess
```

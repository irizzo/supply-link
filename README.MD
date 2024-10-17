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

- Chamadas a API da Abakhus

### Estruturas de dados

```js
// token processo 
  {
   walletAddress: string,
    dadosDoProcesso: {
        date: data que o processo aconteceu/foi finalizado,
        nome: string (exemplo: venda de queijo),
        descriçao: string, (opicional)
        ...outros dados especificos de cada empresa etc
    },
    tipoDoProcesso: "create" | "update",
    tipoDeToken: 'product' | 'process'
    insumos: tokenId[] | [] ,
    produtosParaCriar: produtos[] | [],
    produtosParaAtualizar: tokenId[] | []
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
      tipoDeToken: 'product' | 'process'
      [...otherData] // outros dados especificos de cada empresa etc
    }
  }
```

## Arquitetura

Pastas:
  /routes - gateways da api
  /controllers - lidam com as requisições, trata/valida os dados etc
  /services - faz as interações com a blockchain, tem a lógica do que precisa ser feito

  A parte da interação com a blockchain pode ficar separada, numa pasta de "modelos" ou algo assim, se for necessário (ou seja, se vermos que vai ter muito código repetido por exemplo)

Fluxo:
  Rota - aponta para -> Controlador - chama o -> Serviço

## Routes

```
  Criar/Alterar um processo e criar um produto: POST /process/
    - controlador: /src/controllers/process.controller.js => registerProcess

  Resgatar todos os tokens de um owner: GET /chain/owner-chain
    - controlador: /src/controllers/chain.controller.js => getOwnerTokens

  Resgatar todos os tokens de processos relacionados a um token de produto (Cadeia de processos de um produto): GET /chain/:tokenId
    - controlador: /src/controllers/chain.controller.js => getProductHistory

```

## Modelagem 

Frontend 

![Modelo frontend]("modelo_front.png" "Modelo frontend") 

Registar processo

![Modelo Registar processo]("modelo_registar_processo.png" "Registar processo") 

Fluxo de buscar cadeia de processos de um produto

![Modelo Buscar cadeia de processos de um produto]("modelo_busca_cadeia_produto.png" "Buscar cadeia de processos de um produto") 

Função Buscar cadeia de processos de um produto

![Modelo Função Buscar cadeia de processos de um produto]("modelo_funcao_busca.png" "Função Buscar cadeia de processos de um produto") 
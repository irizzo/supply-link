const { getTokensByOwner, getTokenMetadata } = require("../services")
const { CustomError } = require('../resources/error')

exports.getOwnerTokens = async (req, res, next) => {
  console.log('[getOwnerTokens]')

  try {
    const { walletAddress, signature } = req.body;
    const tokensRes = await getTokensByOwner(walletAddress, signature)

    if (!tokensRes.ok) {
      throw CustomError('INTERNAL_ERROR', 500)
    }

    const data = await tokensRes.json();
    console.debug("[tokenResponse]", data)

    const tokensMetadata = [];
    data.ret.forEach(async (tokenId) => {
      let data = await getTokenMetadata(walletAddress, tokenId)
      console.debug(`[tokenData: ${tokenId}]`, data)
      tokensMetadata.push(data)
    })

    console.debug("[tokensMetadata}] ", tokensMetadata)

    res.status(200).send({
      code: 'OK',
      result: { tokens: tokensMetadata }
    })
  } catch (error) {
    next(error)
  }
}

exports.getProductHistory = async (req, res, next) => {

  try {
    const productHistory = [
      // 1 processo - produzir leite
      {
        "walletAddress": process.env.WALLET_ADDRESS,
        "processData": {
          "date": "2024-10-10T10:00",
          "name": "Produção de leite",
          "description": "Retirada do leite da vaca"
        },
        "processType": "create",
        "processEntries": [],
        "processOuts": [
          {
            "date": "2024-10-10T10:00",
            "name": "Leite integral",
            "description": "Leite integral",
            "uniqueId": "LT202410_CCC",
            "tokenType": "product"
          },
        ]
      },
      // 2 processo transporte do leite
      {
        "walletAddress": process.env.WALLET_ADDRESS,
        "processData": {
          "date": "2024-10-10T11:00",
          "name": "Transporte de leite",
          "description": "Transporte de leite da fazenda Max para produtor de laticinios Thalles"
        },
        "processType": "update",
        "processEntries": [],
        "processOuts": ["LT202410_CCC"]
      },
      // 3 processo extração de sal
      {
        "walletAddress": process.env.WALLET_ADDRESS,
        "processData": {
          "date": "2024-10-10T12:00",
          "name": "Extração de sal",
          "description": "Produção de sal marinho"
        },
        "processType": "create",
        "processEntries": [],
        "processOuts": [
          {
            "date": "2024-10-10T12:00",
            "name": "Sal Marinho",
            "description": "Sal Marinho",
            "uniqueId": "LT202410_SSS",
            "tokenType": "product"
          },
        ]
      },
      // 4 processo transporte do sal
      {
        "walletAddress": process.env.WALLET_ADDRESS,
        "processData": {
          "date": "2024-10-10T12:30",
          "name": "Transporte de sal",
          "description": "Transporte de sal da fabrica Rizzo para produtor de laticinios Thalles"
        },
        "processType": "update",
        "processEntries": [],
        "processOuts": ["LT202410_SSS"]
      },
      // 5 processo fabricação de queijo
      {
        "walletAddress": process.env.WALLET_ADDRESS,
        "processData": {
          "date": "2024-10-10T15:00",
          "name": "Produção de queijo",
          "description": "Produção de queijo minas frescal"
        },
        "processType": "create",
        "processEntries": ["LT202410_SSS", "LT202410_CCC"],
        "processOuts": [
          {
            "date": "2024-10-10T15:00",
            "name": "Queijo minas frescal",
            "description": "Queijo minas frescal",
            "uniqueId": "LT202410_QQQ",
            "tokenType": "product"
          },
        ]
      },
      // 6 processo transporte do queijo
      {
        "walletAddress": process.env.WALLET_ADDRESS,
        "processData": {
          "date": "2024-10-10T17:00",
          "name": "Transporte de queijo",
          "description": "Transporte de queijo do produtor de laticinios Thalles para o mercado Bezerra"
        },
        "processType": "update",
        "processEntries": [],
        "processOuts": ["LT202410_QQQ"]
      },
    ]

    res.status(200).send({
      code: 'OK',
      result: productHistory
    })
  } catch (error) {
    next(error)
  }
}

const { getTokensByOwner, getTokenMetadata } = require("../services")
const { CustomError } = require('../resources/error')

// Pegar todos os tokens da cadeia com base na id de um token
exports.getTokenChain = async (req, res, next) => {
  console.log('[getTokenChain]')

  try {
    // 	CÓDIGO DO CONTROLADOR



    res.status(200).send({
      code: 'OK',
      result: {}
    })
  } catch (error) {
    next(error)
  }
}

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

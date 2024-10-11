const { getTokensByOwner } = require("../services")

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

exports.getOwnerTokensIds = async (req, res, next) => {
	console.log('[getOwnerTokensIds]')

	try {
		const { walletAddress, signature } = req.body;
		console.log('[getOwnerTokensIds] req.body: ', req.body)

		const tokensRes = await getTokensByOwner(walletAddress, signature)

		if (!tokensRes.ok) { 
			throw CustomError('INTERNAL_ERROR', 500)
		}

		res.status(200).send({
			code: 'OK',
			result: { tokens: tokensRes.data.ret }
		})
	} catch (error) {
		next(error)
	}
}
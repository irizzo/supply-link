// Pegar todos os tokens de um owner
exports.getTokensByOwner = async (req, res, next) => {
	console.log('[getTokensByOwner]')

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

// Pegar todos os tokens da cadeia com base na id de um token
exports.getTokenChain = async (req, res, next) => {
	console.log('[registerProcess]')

	try {
		// 	CÓDIGO DO CONTROLADOR

		// CRIAR UMA FUNÇÃO RECURSIVA QUE VAI PEGAR O TOKEN ANTERIOR

		res.status(200).send({
			code: 'OK',
			result: {}
		})
	} catch (error) {
		next(error)
	}
}

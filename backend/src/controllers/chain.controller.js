// Pegar todos os tokens da cadeia com base na id de um token
exports.getTokenChain = async (req, res, next) => {
	console.log('[registerProcess]')

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

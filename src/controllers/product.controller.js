exports.registerProduct = async (req, res, next) => {
	console.log('[registerProduct]')

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

exports.updateProduct = async (req, res, next) => {
	console.log('[updateProduct]')

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
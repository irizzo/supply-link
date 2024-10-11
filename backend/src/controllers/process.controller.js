const { CustomError } = require('../resources/error')
const { isDateValid } = require('../utils/validations')
const { mintToken } = require('../services')

exports.registerProcess = async (req, res, next) => {
	console.log('[registerProcess]')
	try {
		const { walletAddress, processData, processType, entries, productsToCreate, productsToUpdate } = req.body

		// TODO validar dados
		if (!isDateValid(processData.date)) {
			throw CustomError('INVALID_DATE', 400)
		}

		if (processType !== 'create' && processType !== 'update') {
			throw CustomError('INVALID_PROCESS_TYPE', 400)
		}

		// JSON inicial do processo
		const processMintData = {
			...processData,
			entries: [],  
			outs: [] // TODO: PENSAR NUM NOME MELHOR PRA SAÍDAS KKKK
		}

		if (processType === 'create') {
			console.log('processType === create')

			const newProductsIds = []

			// mintar os novos produtos 
			productsToCreate.forEach(async (product) => {
				// TODO: validar dados do product
				const mintRes = await mintToken(walletAddress, product)

				// TODO: ver como a resposta do mint vem, pra salvar os ids num array. exemplo:
				/*
					productsToCreate.forEach((product) => {
						const mintRes = funcaoDeMintar(produto)
						newProductsIds.push(mintRes.id)
					})
				*/
			})

			// setar os insumos e saídas
			processMintData.entries = [...entries]
			processMintData.outs = [...newProductsIds]

		} else {
			console.log('processType === update')

			// setar insumos e saídas
			processMintData.outs = [...productsToUpdate]
		}

		console.log('processMintData: ', processMintData)

		// mintar o processo
		const processMintRes = await mintToken(walletAddress, processMintData)

		if (!processMintRes.ok) {
			throw CustomError(processMintRes, 500)
		}

		res.status(200).send({
			code: 'OK',
			result: {}
		})

	} catch (error) {
		next(error)
	}
}

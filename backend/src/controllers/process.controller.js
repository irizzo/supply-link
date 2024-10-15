const { CustomError } = require('../resources/error')
const { isDateValid } = require('../utils/validations')
const { mintToken, getTokenMetadata } = require('../services')

//// const walletAddress = process.env.WALLET_ADDRESS
//const productMock = {
//	"date": "2024-10-10T10:00",
//	"name": "Nome do Produto",
//	"description": "Descrição do Produto",
//	"uniqueId": "LT202410"
//}
//
//const processUpdateMock = {
//	"walletAddress": process.env.WALLET_ADDRESS,
//	"processData": {
//		"date": "2024-10-10T10:00",
//		"name": "Nome do Processo",
//		"description": "Descrição do Processo"
//	},
//	"processType": "update",
//	"processEntries": [],
//	"processOuts": ["LT202410_AAA", "LT202410_BBB"]
//}
//
//const processCreateMock = {
//	"walletAddress": process.env.WALLET_ADDRESS,
//	"processData": {
//		"date": "2024-10-10T10:00",
//		"name": "Nome do Processo",
//		"description": "Descrição do Processo"
//	},
//	"processType": "create",
//	"processEntries": [],
//	"processOuts": [
//		{
//			"date": "2024-10-10T10:00",
//			"name": "Nome do Produto",
//			"description": "Descrição do Produto",
//			"uniqueId": "LT202410_CCC",
//			"tokenType": "product"
//		},
//		{
//			"date": "2024-10-10T10:00",
//			"name": "Nome do Produto",
//			"description": "Descrição do Produto",
//			"uniqueId": "LT202410_DDD",
//			"tokenType": "product"
//		}
//	]
//}
//
exports.registerProcess = async (req, res, next) => {
	console.log('[registerProcess]')
	try {
		//const { walletAddress, processData, processType, processEntries, processOuts } = req.body
		const { walletAddress, data } = req.body

    console.debug("[frontend data] ", data);

    // TODO: validate
    const processData = data.processData;
    const processType = data.processType;
    const processEntries = data.processEntries;
    const processOuts = data.processOuts;

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
			tokenType: 'process',
			entries: [],
			outs: []
		}

		if (processType === 'create') {
			console.log('processType === create')

			const newProductsIds = []

			// mintar os novos produtos 
			processOuts.forEach(async (product) => {
				// TODO: validar dados do product
				//const mintRes = await mintToken(walletAddress, { ...product, tokenType: 'product' })
				//if (!mintRes.ok) throw new CustomError('ABAKHUS_API_ERROR', 500)
				//newProductsIds.push(product.uniqueId)
        console.debug("[Minting product...] ", product)
			})

			// setar os insumos e saídas
			processMintData.entries = [...processEntries]
			processMintData.outs = [...newProductsIds]

		} else {
			console.log('processType === update')

			// setar insumos e saídas
			processMintData.outs = [...processOuts]
		}

		console.log('processMintData: ', processMintData)

		// mintar o processo
		//const processMintRes = await mintToken(walletAddress, processMintData)
		//
		//if (!processMintRes.ok) {
		//	throw CustomError('ABAKHUS_API_ERROR', 500)
		//}
    console.debug("[Minting process...] ", processMintData)

		res.status(200).send({
			code: 'OK',
			result: {}
		})

	} catch (error) {
		next(error)
	}
}

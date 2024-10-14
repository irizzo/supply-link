const { CustomError } = require("../resources/error")

const BASEURL = process.env.ABAKUS_API_URL

const customHeaders = new Headers({
	'Content-type': 'application/json; charset=UTF-8',
	'x-api-key': process.env.API_KEY
})

exports.mintToken = async (walletAddress, mintData) => {
	console.log('[mintToken]')

	try {
		const response = await fetch(`${BASEURL}/mint`, {
			method: 'POST',
			body: JSON.stringify({ owner: walletAddress, data: JSON.stringify(mintData) }),
			headers: customHeaders
		})

		console.log('response: ', response)
		return response

	} catch (error) {
		console.log('error: ', error)
		throw error
	}
}

exports.getTokensByOwner = async (walletAddress, signature) => {
	console.log('[getTokensByOwner]')

	console.log('walletAddress: ', walletAddress)
	console.log('signature: ', signature)

	const response = await fetch(`${BASEURL}/getTokensByOwner?owner=${walletAddress}&signature=${signature}`, {
		method: 'GET',
		headers: customHeaders
	})

	console.log('response: ', response)
	return response
}

exports.getTokenMetadata = async (walletAddress, tokenId) => {
	console.log('[getTokenMetadata]')

	const response = await fetch(`${BASEURL}/getMetadataByTokenId?owner=${walletAddress}&tokenId=${tokenId}`, {
		method: 'GET',
		headers: customHeaders
	})

	if (!response.ok) throw CustomError('ABAKHUS_API_ERROR', 500)

	const data = await response.json()
	return data
}

exports.verifyConnection = async () => {
	console.log('[verifyConnection]')

	const response = await fetch(`${BASEURL}/verify`, {
		method: 'GET',
		headers: customHeaders
	}).then((res) => {
		return res.json()
	})

	console.log('response: ', response)
	return response
}

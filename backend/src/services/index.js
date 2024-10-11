const BASEURL = process.env.ABAKUS_API_URL

const customHeaders = new Headers({
	// 'Content-type': 'application/json; charset=UTF-8',
	'x-api-key': process.env.API_KEY
})

exports.mintToken = async (walletAddress, tokenData) => {
	console.log('[mintToken]')

	const response = await fetch(`${BASEURL}/mint`, {
		method: 'POST',
		body: JSON.stringify({ owner: walletAddress, data: tokenData}),
		headers: customHeaders
	}).then((res) => {
		return res.json()
	})

	console.log('response: ', response)
	return response
}

exports.getTokensByOwner = async (walletAddress, signature) => {
	console.log('[getTokensByOwner]')

	console.log('walletAddress: ', walletAddress)
	console.log('signature: ', signature)

	const response = await fetch(`${BASEURL}/getTokensByOwner` + new URLSearchParams({ owner: walletAddress, signature: signature }).toString(), {
		method: 'GET',
		headers: customHeaders
	}).then((res) => {
		return res.json()
	})

	console.log('response: ', response)
	return response
}

exports.getTokenMetadata = async (walletAddress, tokenId) => {
	console.log('[getTokenMetadata]')

	const response = await fetch(`${BASEURL}/getMetadataByTokenId` + new URLSearchParams({ owner: walletAddress, tokenId: tokenId }).toString(), {
		method: 'GET',
		headers: customHeaders
	}).then((res) => {
		return res.json()
	})

	console.log('response: ', response)
	return response
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
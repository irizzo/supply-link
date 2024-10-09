const express = require('express')
const router = express.Router()

const chainController = require('../controllers/chain.controller')

router
	.route('/owner-chain') // route: /chain/owner-chain
	.get(chainController.getTokensByOwner)

router
	.route('/:tokenId') // route: /chain/:tokenId
	.get(chainController.getTokenChain)

module.exports = router
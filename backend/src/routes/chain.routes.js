const express = require('express')
const router = express.Router()

const chainController = require('../controllers/chain.controller')

router
	.route('/:tokenId') // route: /chain/:tokenId
	.get(chainController.getTokenChain)

module.exports = router
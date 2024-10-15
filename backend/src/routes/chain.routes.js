const express = require('express')
const router = express.Router()

const chainController = require('../controllers/chain.controller')

router
	.route('/getOwnerTokens') // route: /chain/getOwnerTokensIds
	.post(chainController.getOwnerTokens)

router
	.route('/getProductHistory') // route: /chain/getOwnerTokensIds
	.get(chainController.getProductHistory)

module.exports = router
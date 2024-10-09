const express = require('express')
const router = express.Router()

const productController = require('../controllers/product.controller')

router
	.route('/') // route: /product
	.post(productController.registerProduct)

router
	.route('/update') // route: /product/update
	.post(productController.updateProduct)

module.exports = router
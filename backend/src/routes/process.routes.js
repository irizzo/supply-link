const express = require('express')
const router = express.Router()

const processController = require('../controllers/process.controller')

router
	.route('/') // route: /process/
	.post(processController.registerProcess)

router
	.route('/test')
	.post(processController.test)

module.exports = router
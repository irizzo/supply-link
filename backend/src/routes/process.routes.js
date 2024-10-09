const express = require('express')
const router = express.Router()

const processController = require('../controllers/process.controller')

router
	.route('/') // route: /process/
	.post(processController.registerProcess)

module.exports = router
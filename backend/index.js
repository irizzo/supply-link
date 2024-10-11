require('dotenv/config')

const { getTokenMetadata } = require('./src/services')
const _API_KEY = process.env.API_KEY
const _WALLET_ADDRESS = process.env.WALLET_ADDRESS

// console.log('_API_KEY: ', _API_KEY)
// console.log('_WALLET_ADDRESS: ', _WALLET_ADDRESS)

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const ErrorHandler = require('./src/middleware/errorHandler')

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(bodyParser.json())

require('./src/routes')(app)

app.use(ErrorHandler)

app.listen(8080, () => {
	console.log(`listening on port ${8080}`)
})
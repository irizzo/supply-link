module.exports = (app) => {
	app.use('/chain', require('./chain.routes'))
	app.use('/process', require('./process.routes'));
}
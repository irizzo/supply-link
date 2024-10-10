exports.isDateValid = (date) => {
	console.log('[isDateValid]')

	const today = new Date()

	if (date > today) {
		return false
	}
	
	return true
}

exports.isTitleValid = (title) => {
	console.log('[isTitleValid]')
}
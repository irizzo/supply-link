/**
 * 
 * @param {string} errorCode 
 * @param {number} statusCode 
 * @returns 
 */
exports.CustomError = (errorCode, statusCode) => {
	const e = new Error()
	e.errorCode = errorCode
	e.statusCode = statusCode
	return e
}
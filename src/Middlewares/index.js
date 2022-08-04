const logError = (e, req, res, next) => {
  console.log( `Error ${e}`) 
  console.log(e.stack)
  next(e)
}

const sendError = (e, req, res, next) => {
  res.header("Content-Type", 'application/json')
  const status = e.httpCode || 500
  delete e.httpCode
  res.status(status).json(e)
}

const notFound = (req, res, next) => {
  res.status(404)
  res.json({message: 'Route not Found gateway'})
}


module.exports = {logError,sendError, notFound}
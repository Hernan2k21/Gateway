
const config = require('../../config/app.config')['jwt']

function createJwtToken (payload) {
   
    const options ={
        expiresIn: '1h'
    }
    const token = jwt.sign({...options,...payload}, config.jwtSecretOrKey)
    return token
}

module.exports = {createJwtToken}
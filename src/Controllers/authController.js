const {createUser, findUserByEmail} = require('../Actions/users')
const userSchema = require('../Validations/Schemas/user')
const {validateSchema} = require('../Validations')
const { ClientError } = require('../Helpers/error')
const errorResponses = require('../Responses/error')
const {validatePassword} = require('../Helpers/password')
const { createJwtToken } = require('../Helpers/jwt')
const emailLoginSchema = require('../Validations/Schemas/login')

module.exports = {
	async register(req, res, next) {
        try { 
            const userData = await validateSchema(req.body, userSchema)
            
            const user = await createUser(userData)

			res.status(200).json(user)
            
        }catch(e){

            next(e)
        }
	},

	async login(req, res, next) {
		try {
		const loginData = await validateSchema(req.body, emailLoginSchema)
		const {email, password} = loginData
		const user = await findUserByEmail(email)
		if(!user){
			throw new ClientError(errorResponses.user_not_found)
		}
		await validatePassword(password, user.password)
		let jwtPayload = {id: user.id, name: user.name}
		const jwtToken = createJwtToken (jwtPayload)
		res.status(200).json({token: jwtToken})
		} catch (e) {
			next(e)
		}
	}
		
}

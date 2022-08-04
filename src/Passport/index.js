
const  jwtStrategy = require('./jwt-strategy')
const {findUserById} = require('../Actions/users')

module.exports= function passportConfig (passport) { 

        
    /*-------JWT STRATEGY-------- */ 

    passport.use('jwt', jwtStrategy);

    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });
    
    /*-------DESERIALIZE USER -------- */ 
    
    passport.deserializeUser(async (id, cb) => {
            const user = await findUserById(id)
            if(!user){
                cb(err, null);
            }
            const userInformation = {
                email: user.email,
                name: user.name,
                id: user.id
                };
                req.user = userInformation
            cb(null, userInformation);
    });
};
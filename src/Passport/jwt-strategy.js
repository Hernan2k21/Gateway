const passportJwt = require('passport-jwt')
const config = require('../../config/app.config')['jwt']
const JwtStrategy = passportJwt.Strategy;
const  ExtractJwt =  passportJwt.ExtractJwt;
const {findUserById} = require('../Actions/users')
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwtSecretOrKey;
opts.passReqToCallback= true

const jwtStrategy = new JwtStrategy(opts, async function(req, jwt_payload, done) {
  
   findUserById( jwt_payload.id).then((user)=>{
    if(!user){
      return done(null, false);
     }
     
    const userInformation = {
      email: user.email,
      name: user.name,
      id: user.id
      };
      
    return done(null, userInformation);
   }).catch((e)=>{
    return done(e, false);
   })
  
   
    

    
 
})
 
module.exports = jwtStrategy
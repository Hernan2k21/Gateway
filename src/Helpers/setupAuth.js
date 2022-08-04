const passport = require('passport')
const setupAuth = (app, services) => {
    services.forEach(service => {
        if (service.auth) {
            app.use(service.url, passport.authenticate('jwt', {session: false}), function (req, res, next) {
                req.body.user = req.user
                next();
            });
        }
    });
}

module.exports = setupAuth
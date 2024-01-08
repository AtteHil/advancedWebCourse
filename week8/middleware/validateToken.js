const jwt = require("jsonwebtoken");
const passport = require('./passport_config');
require('dotenv').config();
module.exports = function(req, res, next) {
    passport.authenticate('jwt', {session: false}, (err, verified)=>{
        if(err || !verified){
            return res.status(401).send();
        }
        req.user = verified;
        next();
    })(req, res,next);

};

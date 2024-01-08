// got help for this task from Aleksi Haapalainen on how to do the validation and passport_config
const jwt = require("jsonwebtoken");
const passport = require('passport');
const {Strategy, ExtractJwt} = require("passport-jwt")
const User = require("../models/Users");
require('dotenv').config();
passport.initialize()

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET, 
  };

const jwtStrategy= new Strategy(jwtOptions, async (payload, done) => {
    try {
        const data =await User.findById(payload.id)
        if(data){return done(null, data);}
        return done(null, false);
    } catch (error){
        return done(error, false);
    }
    
  })

module.exports = passport.use(jwtStrategy);
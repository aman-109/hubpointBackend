//write utils here
require("dotenv").config()
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport=require("passport");
const { v4: uuidv4 } = require('uuid');
const User = require("../model/user.model");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SCERET,
    callbackURL: "https://hubpointserver.onrender.com/user/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {

    //creating new user
    let email=profile._json.email
    let name=profile._json.name
    const user= new User({
      name,
        email,
        password:uuidv4()
    })
    await user.save()
    let payload={
        email,
        
    }
      return cb(null, payload);
    // console.log(payload)
    
    // console.log(profile);
  }
));

module.exports=passport
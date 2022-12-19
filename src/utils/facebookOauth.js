require("dotenv").config()
const passport=require("passport")
const FacebookStrategy=require("passport-facebook");
const User = require("../model/user.model");
const { v4: uuidv4 } = require('uuid');

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "https://hubpointserver.onrender.com/user/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'email','picture']
  },
  async function(accessToken, refreshToken, profile, cb) {
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
   
    // console.log(profile._json.picture.data)
  }
));

module.exports=passport
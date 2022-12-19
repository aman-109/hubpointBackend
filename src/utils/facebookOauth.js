require("dotenv").config()
const passport=require("passport")
const FacebookStrategy=require("passport-facebook")

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "https://hubpointserver.onrender.com/user/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'email','picture']
  },
  function(accessToken, refreshToken, profile, cb) {
    
    return cb(null, profile);
    // console.log(profile._json.picture.data)
  }
));

module.exports=passport
// sets up Passport with a local authentication strategy, using a person model for username and password
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const person = require('./models/person')

passport.use(new localStrategy(// verification function
    async (USERNAME, PASSWORD, done) => {
        // authentication logic here
        try {
            // console.log("Received credentials: ", USERNAME, PASSWORD)
            const user = await person.findOne({username: USERNAME})
            if(!user)
                // done -> (error, user, info)
                return done(null, false, {message: 'Incorrect username'})

            // const isPasswordMatch = user.password === PASSWORD ? true : false;
            const isPasswordMatch = await user.comparePassword(PASSWORD)

            // create comparePassword in personSchema

            if(isPasswordMatch) {
                return done(null, user)
            }else {
                return done(null, false, {message: 'Incorrect password'})
            }
        }catch(err) {
            return done(err)
        }
    }
))

module.exports = passport // export configured passport
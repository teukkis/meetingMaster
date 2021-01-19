const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const User = require('./db/models/user')

// Local strategy for registration
passport.use('register', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, async (username, password, done) => {
  try {
    const user = new User({ username, password })

    // Return created user if validation is successful
    // UniqueValidator ( in db/models/user.js ) is applied for handling conflicts
    await user.save(conflict => {
      if (conflict) {
        return done(null, conflict)
      } else {
        return done(null, user)
      }
    })
  } catch (error) {
    done(error)
  }
}))

// Local strategy for authorizing a user
passport.use('login', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, async (username, password, done) => {
  try {
    const user = await User.findOne({ username })
    if (!user) {
      return done(null, false, { message: 'User not found' })
    }

    const validate = await user.isValidPassword(password)
    if (!validate) {
      return done(null, false, { message: 'Wrong password' })
    }

    return done(null, user, { message: 'logged in successfully' })
  } catch (error) {
    return done(error)
  }
}))

const options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'privatekey'
}

// Local strategy for authorizing a user when requesting private information
passport.use('jwt', new JWTstrategy(options, (jwt_payload, done) => {
  // Use the token in validation
  // If token includes a valid id -> success
  
  User.findOne({ id: jwt_payload.sub })
    .then((user) => {
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    })
    .catch(err => done(err, null))
}))

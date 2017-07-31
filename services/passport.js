const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users')

// Turns user into Mongo ID
passport.serializeUser((user, done) => {
	done(null, user.id)
})

// Pull Mongo ID into user
passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user)
	})
})

// Assign which strategy Passport will use for auth with configs
passport.use(
	new GoogleStrategy(
		// These are the parameters required for OAuth
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true
		},
		// This is what is called when the callback is authenticated
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ googleID: profile.id })

			if (existingUser) {
				// We already have a record of the user
				return done(null, existingUser)
			}

			// We don't have a record and need to creat one
			const user = await new User({ googleID: profile.id }).save()
			done(null, user)
		}
	)
)

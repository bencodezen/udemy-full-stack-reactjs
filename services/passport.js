const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users')

// Assign which strategy Passport will use for auth with configs
passport.use(
	new GoogleStrategy(
		// These are the parameters required for OAuth
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback'
		},
		// This is what is called when the callback is authenticated
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleID: profile.id }).then(existingUser => {
				if (existingUser) {
					// We already have a record of the user
				} else {
					// We don't have a record and need to creat one
					new User({ googleID: profile.id }).save()
				}
			})
		}
	)
)

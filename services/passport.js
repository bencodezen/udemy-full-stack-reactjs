const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('../config/keys')

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
			console.log('Access token', accessToken)
			console.log('Refresh token', refreshToken)
			console.log('profile', profile)
		}
	)
)

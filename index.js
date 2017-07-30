const express = require('express')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('./config/keys')

const app = express()

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

// The initial request to authenticates
app.get(
	'/auth/google',
	passport.authenticate('google', {
		scope: ['profile', 'email']
	})
)

// This is the redirect-uri where Google returns to when it is successful
// at authenticated
app.get('/auth/google/callback', passport.authenticate('google'))

// Configure the port that Express will be listening for
const PORT = process.env.PORT || 5000
app.listen(PORT)

const passport = require('passport')

module.exports = app => {
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

	// Allows user to logout
	app.get('/api/logout', (req, res) => {
		req.logout()
		res.send(req.user)
	})

	// Gets the current user
	app.get('/api/current_user', (req, res) => {
		res.send(req.user)
	})
}

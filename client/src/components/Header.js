import React, { Component } from 'react'
import { connect } from 'react-redux'

class Header extends Component {
	render() {
		console.log(this.props)
		return (
			<nav>
				<h2>Header</h2>
			</nav>
		)
	}
}

const mapStateToProps = state => {
	return {
		auth: state.auth
	}
}

export default connect(mapStateToProps)(Header)

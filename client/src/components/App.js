import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions'

const Dashboard = () => <h2>Dashboard</h2>
const Survey = () => <h2>Survey</h2>
const Landing = () => <h2>Landing</h2>

class App extends Component {
	componentDidMount() {
		this.props.fetchUser()
	}

	render() {
		return (
			<div>
				<BrowserRouter>
					<div>
						<Route path="/" component={Landing} exact={true} />
						<Route path="/dashboard" component={Dashboard} />
						<Route path="/survey" component={Survey} />
					</div>
				</BrowserRouter>
			</div>
		)
	}
}

export default connect(null, actions)(App)

import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { actionCreators } from '../actions';

import Header from './header';
import DateChart from './dateChart';

class App extends Component {

	componentWillMount() {
		this.props.actions.fetchData()
	}

	render() {
		if (!this.props.currency) return <div>Loading...</div>
		return(
			<div className="container-fluid">
				<Header />
		    <DateChart
					actions={this.props.actions}
					currency={this.props.currency}
				/>
			</div>
		);
	}
}

function mapStateToProps({ currency }) {
	return { currency }
}

function mapDispatchToProps(dispatch) {
	return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

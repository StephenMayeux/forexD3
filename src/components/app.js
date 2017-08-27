import React, { Component } from 'react';
import Select from 'react-select';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { actionCreators } from '../actions';

import Header from './header';
import DateChart from './dateChart';

class App extends Component {

	render() {
		return(
			<div className="container-fluid">
				<Header />
		    <DateChart
					actions={this.props.actions}
					currency={this.props.currency}
					base={'USD'}
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

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'

//Navigation
import { StackActions, NavigationActions } from 'react-navigation';

//Actions
import { searchPlanet } from '../../redux/landing-page/actions';

//Presentational View
import LandingPageView from './LandingPageView.js';

class LandingPageContainer extends Component {

	static navigationOptions = ({navigation}) => ({
		title: 'Search Planets',
		headerRight: (
			<Button
				onPress={() => navigation.dispatch(StackActions.reset({
					index: 0,
					actions: [NavigationActions.navigate({ routeName: 'LoginContainer' })],
				}))
				}
				title="Logout"
				color="#1669a4"
				transparent
			/>
		),
	});

	constructor(props) {
		super(props);
		this.state = {
			searchedCity: null
		}
	}

	setSearchTerm = async (searchTerm) => {
		if (searchTerm != '') {
			await this.props.searchPlanet(searchTerm);
			this.setState({
				searchedCity: this.props.searchedPlanet && this.props.searchedPlanet.results
			})
		} else {
			this.setState({
				searchedCity: null
			})
		}
	}
	render() {
		return (
			<LandingPageView
				setSearchTerm={this.setSearchTerm.bind(this)}
				searchedCity={this.state.searchedCity}
				isFetching={this.props.isFetching} />
		)
	}
}

function mapStateToProps(state) {
	return {
		searchedPlanet: state.landingPage.searchedPlanet,
		isFetching: state.landingPage.isFetching,
		error: state.landingPage.error,
	}
}

function mapDispatchToProps(dispatch) {
	return ({
		searchPlanet: (item) => dispatch(searchPlanet(item)),
	})
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageContainer)
import React, { Component } from 'react';
import { View } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux'
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'

//Actions
import { onLogin } from '../../redux/login/actions';

class LoginContainer extends Component {

    static navigationOptions = {
        title: 'Login',
    };

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            missingUsername: false,
            missingPassword: false,
            invalidCredentials: false,
        }
    }

    onLogin = async () => {
        let { username, password } = this.state;
        let result = null;
        if (!username) {
            this.setState({ missingUsername: 'Username Missing' });
            return true;
        }
        if (!password) {
            this.setState({ missingPassword: 'Password Missing' })
            return true;
        }
        if (username && password) {
            await this.props.onLogin();
            result = this.props.login && this.props.login.results.some(item => {
                return item.name == username && item.birth_year == password;
            })
            if (result) {
                this.usernameText.clearText();
                this.passwordText.clearText();
                this.setState({
                    username: null,
                    password: null,
                    missingUsername: null,
                    missingPassword: null,
                    invalidCredentials: null
                });
                this.props.navigation.dispatch(StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'LandingPageContainer' })],
                }));
            }
            else
                this.setState({ invalidCredentials: 'Invalid Credentials' });
        }
    }
    render() {
        let { missingUsername, missingPassword, invalidCredentials } = this.state
        let { isFetching } = this.props
        return (
            <View>
                <FormLabel>UserName</FormLabel>
                <FormInput
                    ref={usernameText => this.usernameText = usernameText}
                    onChangeText={(username) => { this.setState({ username }) }} />
                {missingUsername &&
                    <FormValidationMessage>{missingUsername}</FormValidationMessage>
                }

                <FormLabel>Password</FormLabel>
                <FormInput
                    ref={passwordText => this.passwordText = passwordText}
                    secureTextEntry
                    onChangeText={(password) => { this.setState({ password }) }} />
                {missingPassword &&
                    <FormValidationMessage>{missingPassword}</FormValidationMessage>
                }

                <Button backgroundColor='#1669a4' loading={isFetching} title='Login' onPress={this.onLogin} />

                {invalidCredentials &&
                    <FormValidationMessage>{invalidCredentials}</FormValidationMessage>
                }
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        login: state.login.peopleList,
        isFetching: state.login.isFetching,
        error: state.login.error,
    }
}

function mapDispatchToProps(dispatch) {
    return ({
        onLogin: (credentials) => dispatch(onLogin(credentials)),
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
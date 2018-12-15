/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

/** @format */
import React, { Component } from 'react';
import {
    AppRegistry,
} from 'react-native';
import { name as appName } from './app.json';

//Redux
import { Provider, connect } from 'react-redux'
import configureStore from './src/redux/configureStore'
import Routes from './src/app'

import {
    reduxifyNavigator,
    createReactNavigationReduxMiddleware,
    createNavigationReducer,
} from 'react-navigation-redux-helpers';

// Note: createReactNavigationReduxMiddleware must be run before reduxifyNavigator
const middleware = createReactNavigationReduxMiddleware(
    "root",
    state => state.nav,
  );
const App = reduxifyNavigator(Routes, "root");

const mapStateToProps = (state) => ({
    state: state.nav,
  });
const AppWithNavigationState = connect(mapStateToProps)(App);

const store = configureStore();

const ReduxApp = () => (
    <Provider store={store}>
        <AppWithNavigationState />
    </Provider>
)

AppRegistry.registerComponent(appName, () => ReduxApp);
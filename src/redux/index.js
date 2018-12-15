/**
 * Root Reducer
 */
import { combineReducers } from 'redux';
import landingPage from './landing-page/reducer';
import login from './login/reducer';
import nav from './router/reducer';

const rootReducer = combineReducers({
    landingPage,
    login,
    nav
})

export default rootReducer
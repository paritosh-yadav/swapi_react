/**
 * Routes
 */
import { createStackNavigator, createAppContainer } from "react-navigation";

import LandingPageContainer from "./views/landing-page/LandingPageContainer";
import LoginContainer from "./views/login/login";

const AppNavigator = createStackNavigator({
  LoginContainer: {screen: LoginContainer},
  LandingPageContainer: {screen: LandingPageContainer},
});

export default createAppContainer(AppNavigator);
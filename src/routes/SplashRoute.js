import React from 'react';
import {DrawerNavigator} from 'react-navigation';
import Login from "../containers/Login";

const RouteConfig = {};
const Splash = DrawerNavigator({
    Login: { screen: Login}
}, RouteConfig);

export default SplashNavigator;

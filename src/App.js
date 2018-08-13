import React, { Component } from 'react';
import allReducers from './reducers/index.js';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import Router from './routers'
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);
// import {SplashNavigator} from './routes/SplashRoute';

const store = createStore(allReducers);
export default class App extends Component{
    render(){
        return(
            <Provider store= {store}>
                <Router />
            </Provider>
        );
    }
}

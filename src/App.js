import React, { Component } from 'react';
import allReducers from './reducers/index.js';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import Router from './routers'
import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);

export default class App extends Component{
    render(){
        const store = createStore(allReducers);
        return(
            <Provider store= {store}>
                <Router />
            </Provider>
        );
    }
}

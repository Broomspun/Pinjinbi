import React, { Component } from 'react';
import allReducers from './reducers/index.js';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import Router from './routers'

import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);

export default class App extends Component{
    render(){
        const store = createStore(allReducers, {}, applyMiddleware(ReduxThunk));//{} ->Initial State
        return(
            <Provider store= {store}>
                <Router />
            </Provider>
        );
    }
}

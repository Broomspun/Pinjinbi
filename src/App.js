import React, { Component } from 'react';
import { Root } from "native-base";
import allReducers from './reducers/index.js';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import Router from './routers'
import {Actions} from "react-native-router-flux/";
import { YellowBox, BackHandler } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);

export default class App extends Component{
    componentDidMount () {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    componentWillUnmount () {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    onBackPress () {
        console.log(Actions.state);
        if (Actions.state.index === 0) {
            BackHandler.exitApp();
            return false;
        }

        Actions.pop();
        return true;
    }
    render(){
        const store = createStore(allReducers, {}, applyMiddleware(ReduxThunk));//{} ->Initial State
        return(
            <Provider store= {store}>
                <Root>
                <Router backAndroidHandler={this.onBackPress} />
                </Root>
            </Provider>
        );
    }
}

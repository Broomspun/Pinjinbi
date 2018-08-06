import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App.js';

export default class ReduxCounter extends Component {
    render() {
        return (
            <App />
        );
    }
}
AppRegistry.registerComponent('pinjinbi', () => ReduxCounter);

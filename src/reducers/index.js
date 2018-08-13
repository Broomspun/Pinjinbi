import {combineReducers} from 'redux';
import splashReducer from './SplashReducer';

const allReducers= combineReducers({
    splash: splashReducer
});


export default allReducers;

import {combineReducers} from 'redux';
import splashReducer from './SplashReducer';
import loginReducer from './LoginFormReducer';

const allReducers= combineReducers({
    splash: splashReducer,
    loginForm: loginReducer
});

export default allReducers;

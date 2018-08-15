import {combineReducers} from 'redux';
import splashReducer from './SplashReducer';
import loginReducer from './LoginFormReducer';
import forgottenVerify from './ForgottenVerifyReducer';
import registerReducer from './RegisterFormReducer';

const allReducers= combineReducers({
    splash: splashReducer,
    loginForm: loginReducer,
    forgottenVerifyForm: forgottenVerify,
    registerForm: registerReducer,
});

export default allReducers;

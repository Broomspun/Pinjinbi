import {combineReducers} from 'redux';
import splashReducer from './SplashReducer';
import loginReducer from './LoginFormReducer';
import forgottenVerify from './ForgottenVerifyReducer';
import registerReducer from './RegisterFormReducer';
import newslistReducer from './NewsListReducer';
import noticeListReducer from './NoticeListReducer';
import bindInfoReducer from './BindinfoReducer';
import userInfoReducer from './UserInfoReducer';

const allReducers= combineReducers({
    splash: splashReducer,
    loginForm: loginReducer,
    forgottenVerifyForm: forgottenVerify,
    registerForm: registerReducer,
    newslistsRaw: newslistReducer,
    noticelistsRaw: noticeListReducer,
    bindInfoData: bindInfoReducer,
    userInfoReducer: userInfoReducer,
});

export default allReducers;

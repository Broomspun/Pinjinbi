import {combineReducers} from 'redux';
import splashReducer from './SplashReducer';
import loginReducer from './LoginFormReducer';
import forgottenVerify from './ForgottenVerifyReducer';
import registerReducer from './RegisterFormReducer';
import MessagesReducer from './MessagesReducer';
import noticeListReducer from './NoticeListReducer';
import bindInfoReducer from './BindinfoReducer';
import userInfoReducer from './UserInfoReducer';
import lotoReducer from './LotoRuducer';
import memberReducer from './MemberReducer';
import taskReducer from './TaskReducers';

const allReducers= combineReducers({
    splash: splashReducer,
    loginForm: loginReducer,
    forgottenVerifyForm: forgottenVerify,
    registerForm: registerReducer,
    MessagesReducer: MessagesReducer,
    noticelistsRaw: noticeListReducer,
    bindInfoData: bindInfoReducer,
    userInfoReducer: userInfoReducer,
    lotoReducer: lotoReducer,
    memberReducer: memberReducer,
    taskReducer: taskReducer,
});

export default allReducers;

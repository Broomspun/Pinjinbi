import {AsyncStorage} from 'react-native'
import {submitAvatar_API, getVerifySMSCode_API, VerifyMC_API, ChangeMP_API,ChangePassword_API} from './../Services'
import {Constants} from "@common";
import {
    AVATAR_SUBMIT, AVATAR_SUCCESS, AVATAR_CHANGED,
    MOBILE_CHANGE_REGENERATE_CAPTCHACODE, OLD_PHONE_VERIFY_SMS_SUCCESS,NEW_PHONE_VERIFY_SMS_SUCCESS,
    OLD_PHONE_VERIFY_SUCCESS, NEW_PHONE_VERIFY_SUCCESS,
    MOBILE_CHANGE_SUCCESS,CHANGE_LOGIN_PASSWORD_SUCCESS
} from "./types";

import {Actions} from 'react-native-router-flux';
import {generatorCaptchaCode} from "../Helper";

export const changedAvatar = (avatar) => {
    return (dispatch) => {
        dispatch({
            type: AVATAR_CHANGED,
            payload: avatar
        })
    }
};

export const submitAvatar = (userid, token, avatar) => {

    return (dispatch) => {
        dispatch({
            type: AVATAR_SUBMIT,
        });
        (async () => {
            let res = await submitAvatar_API(userid, token, avatar);

            if(res.status===200) {
                Avatar_SubmitSuccess(dispatch, res.data);
            }
        })()

    }
};

const Avatar_SubmitSuccess = (dispatch, data) => {
    dispatch({
        type: AVATAR_SUCCESS,
        payload: data
    });

    Actions.usercentermain();
};


export const generateCaptchaCode_mc = () => {
    return {
        type: MOBILE_CHANGE_REGENERATE_CAPTCHACODE,
        payload: {value: generatorCaptchaCode(4)}
    }
};

export const getVerifySMSCode_mc = (phone, verifyType, captcha) => {
    let type;
    switch(verifyType) {
        case 6:
            type = OLD_PHONE_VERIFY_SMS_SUCCESS;
            break;
        case 7:
            type = NEW_PHONE_VERIFY_SMS_SUCCESS;
            break;
    }
    return (dispatch) => {
        (async ()=>{
            let res = await getVerifySMSCode_API(phone, verifyType, captcha);
            console.log('verify code',res);
            if(res.status===200) {
                dispatch({
                    type: type,
                    payload: res.data.msg
                });
            }
        })();
    };
};

export const getVerifyPhone = (Mobile, VerifyType, VerifyCode, UserId, Token)=>{
    let type;
    switch(VerifyType) {
        case 6:
            type = OLD_PHONE_VERIFY_SUCCESS;
            break;
        case 7:
            type = NEW_PHONE_VERIFY_SUCCESS;
            break;
    }
    return (dispatch) => {
        (async ()=>{
            let res = await VerifyMC_API(Mobile, VerifyType, VerifyCode, UserId, Token);

            if(res.status===200) {
                dispatch({
                    type: type,
                    payload: res.data.msg
                });

                if(VerifyType===6)  //in case of success of verification for changing mobile number
                     Actions.changeoldtonewphone();
            }
        })();
    };
};

export const changeMobileNumber = (NewMobile, VerifyCode, UserId, Token)=> {
    return (dispatch) => {
        (async ()=>{
            let res = await ChangeMP_API(NewMobile,VerifyCode, UserId, Token);

            if(res.status===200) {
                dispatch({
                    type: MOBILE_CHANGE_SUCCESS,
                });

            }
        })();
    };
};

export const resetRequestStatus = ()=>{
    return (dispatch) => {
        dispatch({
            type: AVATAR_SUBMIT,
        });
    }
};

export const changePassword = (UserId, Token, OldLoginPwd, NewLoginPwd)=> {
    return (dispatch) => {
        (async ()=>{
            let res = await ChangePassword_API(UserId, Token, OldLoginPwd, NewLoginPwd);

            if(res.status===200) {
                dispatch({
                    type: CHANGE_LOGIN_PASSWORD_SUCCESS,
                });
             }
        })();
    };
};
